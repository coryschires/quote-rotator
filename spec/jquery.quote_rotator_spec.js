// Things that should be tested better...
//
//  * How to test pause on hover?
//  * How to test that active class is in fact visible (toBeVisible not really working)
//
describe("quote rotator plugin", function() {
  
  var fixture = '<ul><li>Quote 1</li><li>Quote 2</li><li>Quote 3</li></ul>'
  var quotes;
  
  describe("DOM setup on page load", function() {

    describe("when using default config options", function() {
      beforeEach(function() {
        quotes = $(fixture);
        quotes.quote_rotator();
      });
      
      it("should add a class of 'active' to the first list item", function() {
        expect(quotes.find('li:first')).toHaveClass('active');
      });
      
      it("should add not add an active class to any list item if one is already specified in the markup", function() {
        quotes = $('<ul><li>Quote 1</li><li class="active">Quote 2</li><li>Quote 3</li></ul>');
        expect(quotes.find('li:nth-child(1)')).not.toHaveClass('active');
        expect(quotes.find('li:nth-child(2)')).toHaveClass('active');
        expect(quotes.find('li:nth-child(3)')).not.toHaveClass('active');
      });
      
      it("should hide all non-active list items", function() {
        expect(quotes.find('li:not(".active")')).not.toBeVisible();
      });
      
    });
    
    describe("when randomize_first_quote config option is set to true", function() {
      beforeEach(function() {
        quotes = $(fixture);
        quotes.quote_rotator({ randomize_first_quote: true });
      });

      it("should add a class of 'active' to one of the line items", function() {
        expect( quotes.find('li.active').length ).toEqual(1);
      });

      it("should not add a class of 'active' to any of the other line items", function() {
        expect( quotes.find('li:not(".active")').length ).toEqual(2);
      });
    });
  
  });

  xdescribe("Pause on hover", function() {
    
    it("should not rotate if when being hovered on", function() {
      runs(function () {
        quotes = $(fixture);
        quotes.quote_rotator({ pause_on_hover: true });
        quotes.hover();
      });
      
      waits(6000);
      
      runs(function () {
        expect(quotes.find('li:nth-child(1)')).toHaveClass('active');
      });
    });
  });
  
  describe("Rotation speed", function() {
    
    describe("when using default speed of 5000", function() {
  
      it("should rotate quotes every 5000 milliseconds", function() {
        runs(function () {
          quotes = $(fixture);
          quotes.quote_rotator();
        });

        waits(4000);

        runs(function () {
          expect(quotes.find('li:nth-child(1)')).toHaveClass('active');
          expect(quotes.find('li:nth-child(2)')).not.toHaveClass('active');
          expect(quotes.find('li:nth-child(3)')).not.toHaveClass('active');
        });

        waits(4000);

        runs(function () {
          expect(quotes.find('li:nth-child(1)')).not.toHaveClass('active');
          expect(quotes.find('li:nth-child(2)')).toHaveClass('active');
          expect(quotes.find('li:nth-child(3)')).not.toHaveClass('active');
        });
        
        waits(4000);
        
        runs(function () {
          expect(quotes.find('li:nth-child(1)')).not.toHaveClass('active');
          expect(quotes.find('li:nth-child(2)')).not.toHaveClass('active');
          expect(quotes.find('li:nth-child(3)')).toHaveClass('active');
        });

        waits(4000);
        
        runs(function () {
          expect(quotes.find('li:nth-child(1)')).toHaveClass('active');
          expect(quotes.find('li:nth-child(2)')).not.toHaveClass('active');
          expect(quotes.find('li:nth-child(3)')).not.toHaveClass('active');
        });

      });

    });

    describe("when specifing rotation speed config option", function() {
      it("should rotate quotes every 3000 milliseconds", function() {
        runs(function () {
          quotes = $(fixture);
          quotes.quote_rotator({ rotation_speed: 3000 });
        });

        waits(2500);

        runs(function () {
          expect(quotes.find('li:nth-child(1)')).toHaveClass('active');
          expect(quotes.find('li:nth-child(2)')).not.toHaveClass('active');
          expect(quotes.find('li:nth-child(3)')).not.toHaveClass('active');
        });

        waits(2500);

        runs(function () {
          expect(quotes.find('li:nth-child(1)')).not.toHaveClass('active');
          expect(quotes.find('li:nth-child(2)')).toHaveClass('active');
          expect(quotes.find('li:nth-child(3)')).not.toHaveClass('active');
        });
        
        waits(2500);
        
        runs(function () {
          expect(quotes.find('li:nth-child(1)')).not.toHaveClass('active');
          expect(quotes.find('li:nth-child(2)')).not.toHaveClass('active');
          expect(quotes.find('li:nth-child(3)')).toHaveClass('active');
        });
      });
    });
    
    describe("when setting rotation speed less than 2000", function() {
      it("should force set the rotation speed to a minimum of 2000", function() {
        runs(function () {
          quotes = $(fixture);
          quotes.quote_rotator({ rotation_speed: 1000 });
        });
        
        waits(800);
        
        runs(function () {
          expect(quotes.find('li:nth-child(1)')).toHaveClass('active');
          expect(quotes.find('li:nth-child(2)')).not.toHaveClass('active');
          expect(quotes.find('li:nth-child(3)')).not.toHaveClass('active');
        });
        
        waits(800);
        
        runs(function () {
          expect(quotes.find('li:nth-child(1)')).toHaveClass('active');
          expect(quotes.find('li:nth-child(2)')).not.toHaveClass('active');
          expect(quotes.find('li:nth-child(3)')).not.toHaveClass('active');
        });
        
        waits(800);
        
        runs(function () {
          expect(quotes.find('li:nth-child(1)')).not.toHaveClass('active');
          expect(quotes.find('li:nth-child(2)')).toHaveClass('active');
          expect(quotes.find('li:nth-child(3)')).not.toHaveClass('active');
        });
      });
    });
    
  });
  
  describe("Next/Previous buttons", function() {
    beforeEach(function() {
      quotes = $(fixture);
      quotes.quote_rotator({ buttons: { next: ">>", previous: "<<" } });
    });

    describe("setup", function() {
      it("should wrap both buttons in a .qr_buttons div", function() {
        expect(quotes.find('.qr_buttons button').length).toEqual(2);
      });
      it("should create a next button", function() {
        expect(quotes.find('.qr_buttons .qr_next')).toExist();
      });
      it("should create a next button", function() {
        expect(quotes.find('.qr_buttons .qr_next')).toExist();
      });
      it("should have button text equal to the value of buttons.next", function() {
        expect(quotes.find('.qr_buttons .qr_next')).toHaveText('>>');
      });
      it("should create a previous button", function() {
        expect(quotes.find('.qr_buttons .qr_previous')).toExist();
      });
      it("should have button text equal to the value of buttons.previous", function() {
        expect(quotes.find('.qr_buttons .qr_previous')).toHaveText('<<');
      });
    });
    
    describe("behavior", function() {
      it("when clicking next should show the next quote", function() {
        quotes.find('.qr_next').click();
        expect(quotes.find('li:nth-child(1)')).not.toHaveClass('active');
        expect(quotes.find('li:nth-child(2)')).toHaveClass('active');
        expect(quotes.find('li:nth-child(3)')).not.toHaveClass('active');
      });
      it("when clicking previous should show the previous quote", function() {
        quotes.find('.qr_previous').click();
        expect(quotes.find('li:nth-child(1)')).not.toHaveClass('active');
        expect(quotes.find('li:nth-child(2)')).not.toHaveClass('active');
        expect(quotes.find('li:nth-child(3)')).toHaveClass('active');
      });
    });
  });
});
