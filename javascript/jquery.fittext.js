/*global jQuery */
/*!	
* FitText.js 1.0
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function($,sr){
 
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;
 
      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null; 
          };
 
          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);
 
          timeout = setTimeout(delayed, threshold || 100); 
      };
  }
	// smartresize 
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
 
})(jQuery,'smartresize');

(function( $ ){

	$.fn.fitText = function( kompressor ) {

			return this.each(function(){
				var $this = $(this);                                      // store the object
				var fontResize = origFontSize = $this.css('font-size');   // init the font sizes
				var compressor = kompressor || 1;                         // set the compressor

        // Resizer() resizes items based on the object width divided by the compressor * 10
				var resizer = function ( obj ) {
					fontResize =  obj.width() / (compressor*10);
					fontResize = (fontResize >= origFontSize)?  origFontSize : fontResize; 
					obj.css('font-size',fontResize);
				}

				// Call once to set.
				resizer($this);

				// Call on resize. Opera debounces their resize by default. 
      	$(window).smartresize(function() {
					resizer($this);
      	});
      	
			});

	};

})( jQuery );

(function( $ ){
	var string = $("#fittext1").html();
	if(document.getElementById("fittext1")){
		var span = $("#fittext1").find("span");
		$("#fittext1").fitText(1);
		var maxWidth = $("#fittext1").width() - 25;
		var currentWidth = span.width();
		var direction = "UP";
		var start = 1;
		var count = 0;
		
		
		if(currentWidth > maxWidth){
			while(currentWidth >= maxWidth){
				count++;
				start+= 0.02;
				$("#fittext1").fitText(start);
				currentWidth = span.width();
			}
		}else{
			while(currentWidth <= maxWidth){
				count++;
				start-= 0.02;
				$("#fittext1").fitText(start);
				currentWidth = span.width();
			}
		}
		
	}
	
	
	
	$("#fittext2").fitText(1.2);
	$("#fittext3").fitText(1.1, { minFontSize: 50, maxFontSize: '75px' });
})( jQuery );
