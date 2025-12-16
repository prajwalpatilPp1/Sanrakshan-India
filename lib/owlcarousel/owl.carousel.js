/* Minimal Owl Carousel shim (full library removed)
 * Provides $(element).owlCarousel(options) with basic autoplay rotation.
 */
;(function($){
    if (typeof $ === 'undefined') return;

    var defaults = {
        items: 1,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        fadeDuration: 300
    };

    function SimpleOwl($el, opts){
        this.$el = $el;
        this.settings = $.extend({}, defaults, opts || {});
        this.$items = this.$el.children();
        this.current = 0;
        this._timer = null;
        this._init();
    }

    SimpleOwl.prototype._init = function(){
        var self = this;
        this.$el.addClass('simple-owl');
        this.$items.hide().eq(this.current).show();

        if (this.settings.autoplay && this.$items.length > 1) {
            this._timer = setInterval(function(){ self.next(); }, this.settings.autoplayTimeout);

            if (this.settings.autoplayHoverPause) {
                this.$el.on('mouseenter.simpleOwl', function(){ if (self._timer) { clearInterval(self._timer); self._timer = null; } });
                this.$el.on('mouseleave.simpleOwl', function(){ if (!self._timer) { self._timer = setInterval(function(){ self.next(); }, self.settings.autoplayTimeout); } });
            }
        }
    };

    SimpleOwl.prototype.next = function(){
        if (!this.$items.length) return;
        var next = (this.current + 1) % this.$items.length;
        this.$items.eq(this.current).fadeOut(this.settings.fadeDuration);
        this.$items.eq(next).fadeIn(this.settings.fadeDuration);
        this.current = next;
    };

    SimpleOwl.prototype.destroy = function(){
        clearInterval(this._timer);
        this._timer = null;
        this.$el.off('.simpleOwl');
        this.$el.removeClass('simple-owl');
        this.$items.show();
        this.$el.removeData('simpleOwl');
    };

    // jQuery plugin
    $.fn.owlCarousel = function(options){
        return this.each(function(){
            var $this = $(this);
            var inst = $this.data('simpleOwl');
            if (!inst) {
                inst = new SimpleOwl($this, options);
                $this.data('simpleOwl', inst);
            }
        });
    };

    // minimal compatibility surface
    $.fn.owlCarousel.defaults = defaults;
    $.fn.owlCarousel.Constructor = { Plugins: {} };

})(window.jQuery || window.Zepto || {});
