/*!
 * heightTruncate jQuery Plugin
 * http://github.com/JLarky/jQuery-heightTruncate-Plugin
 *
 * Copyright 2010, JLarky <jlarky@gmail.com>
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */

(function($){
    $.fn.extend({
	heightTruncate: function(options) {
	    var defaults = {
		after: '...',
		offset: 0,
		throttle: 1000
	    };
	    var options = $.extend(defaults, options);
	    return this.each(function() {
		$this=$(this);
		var init_h = $.data(this, 'init_h');
		if (!init_h)
		    $.data($this, 'init_h', init_h = $this.height());
		var real_h = $this.height("100%").height();
		if (real_h > init_h) {
		    var original_text = $.data($this, 'original_text');
		    if (!original_text)
			$.data($this, 'original_text', original_text = $this.text());
		    var throttle = 0;
		    var i = 0;
		    while ($this.text(original_text.substr(0, ++i)+options.after).height() <= init_h) {
			if (throttle++ > options.throttle) return; // in case of emergency
		    }
		    // because of i isn't fit (actually not fitting was our aim in while loop) 
		    $this.text(original_text.substr(0, (i-1) - options.offset)+options.after);
		}
	    });
	}

    });
})(jQuery);