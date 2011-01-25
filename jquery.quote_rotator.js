/**
 * Quote Rotator - Simple jQuery plugin which cause a set of list
 * items to fade-in and fade-out. 
 * 
 * Homepage: http://coryschires.com/jquery-quote-rotator-plugin/
 * Source Code: https://github.com/coryschires/quote-rotator
 * 
 * Copyright (c) 2011 Cory Schires (coryschires.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 0.1.0
 */

(function($) {

  $.quote_rotator = {
    defaults: {
      rotation_speed: 5000,
      pause_on_hover: true,
      randomize_first_quote: false
    }
  }

    $.fn.extend({
        quote_rotator: function(config) {

            var config = $.extend({}, $.quote_rotator.defaults, config);

            return this.each(function() {
                
                // cache for selector performance
                var quote_list = $(this);
                var list_items = quote_list.find('li');
                
                // prevent dummies from setting the rotation speed too fast
                var rotation_speed = config.rotation_speed < 2000 ? 2000 : config.rotation_speed;                   

                // hide all the quotes
                list_items.hide();

                // apply active to random quote if specified
                if (config.randomize_first_quote) {
                  var random = Math.floor( Math.random() * (list_items.length) );
                  $(list_items[random]).addClass('active');

                // otherwise apply active to first quote unless already applied in the html
                } else if (! (quote_list.find('li.active')).length ) {
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