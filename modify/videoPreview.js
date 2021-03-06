//<![CDATA[
(function($) {
    $.fn.videoPreview = function(options) {
        return this.each(function() {
            var elm = $(this);
            //var frames = parseFloat(elm.data('frames'));

            var img = $('<img/>', { 'id':elm.data('id'), 'src':'' }).hide().css({
                'position': 'absolute', 'cursor': 'pointer', 'left': '0px'
            }).appendTo(elm);
            var slider = $('<div/>').hide().css({
                'pointer-events': 'none', 'width': '2px', 'height': '100%', 'background': '#ddd', 'position': 'absolute', 'z-index': '1', 'top': '0', 'opacity': 0.6, 'cursor': 'pointer'
            }).appendTo(elm);

            var fullwidth;
            var fullheight;
            var width;
            var height;
            var columns;
            var horizontals;
            var frames;

            elm.mousemove(function(e) {
            img.on('load', function() { // we need to know video's full width
                columns = 4; //4x4 screenshots
                horizontals = 4; //4x4 screenshots
                $(this).show();
                fullwidth = this.width; 
                fullheight = this.height;
                width = fullwidth/columns;
                height = fullheight/horizontals;
                frames = columns * horizontals;
                elm.css('width', width);
            });				
				var elmOffsetLeft = elm.offset().left;
				//var elmPositionLeft = elm.position().left;				
				//var sliderOffsetLeft = slider.offset().left;
				//var sliderPositionLeft = slider.position().left;								
				//var offset = elmOffsetLeft - sliderOffsetLeft;				
                //var left = e.clientX - elm.position().left - (elmOffsetLeft - elmPositionLeft); // position inside the wrapper (px unit)
                var left = e.clientX - elmOffsetLeft; // position inside the wrapper (px unit)				
				//console.log('elmOffsetLeft: '+elmOffsetLeft);
				//console.log('elmPositionLeft: '+elmPositionLeft);	
				//console.log('sliderOffsetLeft: '+sliderOffsetLeft);
				//console.log('sliderPositionLeft: '+sliderPositionLeft);												
				//console.log('offset: '+offset);				
				//slider.css('margin-left', -(elmOffsetLeft - elmPositionLeft));
                slider.show().css('left', left); // +4 because < 4, it's not smooth in chrome firefox
                var cssleft = Math.floor((left / width) * (frames)) * width;
                img.css('left', -cssleft);
                img.css('top', 0); //horizontal 1st
                var i;
                for (i = 1; i < horizontals; i = i+1) {
                   if (cssleft >= i*fullwidth && cssleft < (i+1)*fullwidth) { 
                   img.css('left', -cssleft+i*fullwidth); 
                   img.css('top', -i*height);
                   }
                }
            }).mouseout(function(e) {
                slider.hide();
            });

        });
    };
})(jQuery);
$('.videoPreview').videoPreview();
//]]>