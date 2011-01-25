// Simple quote rotation plugin written for in3media/radio-info.com
// Cory Schires - Feb 3, 2010
// 
// Instructions:
// Simply apply this function to any list element. It will rotate through each list items 
// with a nice fade effect. You may nest any type of element you like inside a given list item.
//
//     $('ul#quotes').quote_rotator();
//
// Configuration:
// You can set the rotation_speed in milliseconds. Minimum rotation speed is 2000.  
//
//     $('ul#quotes').quote_rotator({ 
//          rotation_speed: 7000    // defaults to 5000
//          pause_on_hover: false   // defauts to true
//      });
//

(function($) {

	$.quote_rotator = {
		defaults: {
			rotation_speed: 5000,
			pause_on_hover: true
		}		
	}

    $.fn.extend({
        quote_rotator: function(config) {
			
			var config = $.extend({}, $.quote_rotator.defaults, config);
			
            return this.each(function() {
                
                // cache for selector performance
                var quote_list = $(this);
                
                // prevent dummies from setting the rotation speed too fast
				var rotation_speed = config.rotation_speed < 2000 ? 2000 : config.rotation_speed;                   

                // hide all the quotes
                quote_list.find('li').hide();

                // apply active class to first quote unless already applied elsewhere
                if (! (quote_list.find('li.active')).length ) {
                    $('li:first', quote_list).addClass('active');
                };
                
                // show the active quote 
                quote_list.find('li.active').show();
                
                // activate quote rotation
                var rotation_active = true;

                // stop quote rotation on hover
                quote_list.hover(function() {
                    if (config.pause_on_hover) {rotation_active = false};
                }, function() {
                    rotation_active = true
                });
                
                // rotate quotes
                setInterval(function(){
                    if (rotation_active) {
                                            
                        var active_quote = quote_list.find('li.active');        
                        var next_quote =  active_quote.next().length ? active_quote.next() : quote_list.find('li:first');

                        // rotate quotes with fade effect
                        active_quote.animate({
                            opacity: 0 // fade out active quote
                        }, 1000, function() {                        
                            active_quote.hide().css('opacity', 1); // hide and reset opacity
                            next_quote.fadeIn(1000); // fade in next quote
                        });

                        // swap the class to prepare for the next fade effect interal
                        active_quote.removeClass('active');         
                        next_quote.addClass('active');
                    };

                }, rotation_speed);  
                                
            })
        }
    })

})(jQuery);