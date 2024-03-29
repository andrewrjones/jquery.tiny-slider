/*
 * jquery.tiny-slider
 * https://github.com/andrewrjones/jquery.tiny-slider
 *
 * Copyright (c) 2012 Andrew Jones
 * Licensed under the MIT license.
 */

(function($) {
  $.widget( "aj.tinyslider" , {

    options: {
      sliderClass: 'tiny-slider',
      frameClass: 'frame',
      frameCenterClass: 'frame-center',
      frameContainerClass: 'frames',
      duration: 1200
    },

    _create: function () {
      var self = this;
      
      // set up container
      self.elSlider = self.element;
      self.elSlider.addClass(self.options.sliderClass);
      
      // store the width, which we will need when we do animations
      self.sliderWidth = self.element.width();
      
      // container element
      self.elFrames = self.element.find(
        '.' + self.options.frameContainerClass)
        .first();
      
      // internal store of frames
      self.frames = new DoublyLinkedList();
      
      // loop over children to get initial content
      self.elFrames.find('.' + self.options.frameClass).each(function (index, element) {
        var el = $(element);
        var node = self.frames.append(el);
        
        // the first frame is the current frame
        if(index === 0){
          self.centerFrame = node;
          el.addClass(self.options.frameCenterClass);
          el.css('visibility', '');
        } else {
          el.css('visibility', 'hidden');
        }
      });
      
      // ensure we have a center frame if we have some frames
      if(self.frames.size() > 0){
        if(! self.centerFrame){
          self.centerFrame = self.frames.head();
          self.centerFrame.data.addClass(self.options.frameCenterClass);
          self.centerFrame.data.css('visibility', '');
        }
      }
    },

    _destroy: function () {
      var self = this;

    },
    
    /*
     * Appends a new frame to the slider.
     */
    append: function(element) {
      var self = this;
      
      // create our frame element
      var elFrame = $('<div>')
                    .addClass(self.options.frameClass)
                    .css('visibility', 'hidden')
                    .append(element);

      // append to DOM and internal store
      this.elFrames.append(elFrame);
      this.frames.append(elFrame);
    },
    
    /*
     * Prepends a new frame to the slider.
     */
    prepend: function(element) {
      var self = this;
      
      // work out the margin we need for our new element
      var elHead = self.frames.head().data;
      var margin = parseInt(elHead.css('margin-left'), 10) - self.sliderWidth;
      
      // create our frame element
      var elFrame = $('<div>')
                    .addClass(self.options.frameClass)
                    .css('visibility', 'hidden')
                    .css('margin-left', margin)
                    .append(element);
      
      // prepend to DOM and internal store
      self.elFrames.prepend(elFrame);
      self.frames.prepend(elFrame);
    },
    
    /*
     * Move to the next frame.
     */
    next: function() {
      var self = this;
      
      // fire beforenext event
      self._trigger('beforenext');

      // get the current and previous nodes
      var current = self.centerFrame;
      var next = self.centerFrame.next;
      
      // do we have a next frame?
      if(! next){
        return;
      }
      
      // animate
      var elCurrent = current.data;
      var elNext = next.data;
      
      elNext.css('visibility', '');
      
      // calculate the margin for animation
      // When moving to the next frame, we move the current frame
      // to the left by the sliders width, hiding it.
      var animateTo = parseInt(elCurrent.css('margin-left'), 10) - self.sliderWidth;
      
      // do animation
      elCurrent.animate({
        'margin-left': animateTo
      }, self.options.duration, function(){
        
        // after animation, update classes and visiblity
        elCurrent.removeClass(self.options.frameCenterClass);
        elCurrent.css('visibility', 'hidden');
        
        elNext.addClass(self.options.frameCenterClass);
      });
      
      // update the center frame node
      self.centerFrame = next;
      
      // fire next event
      self._trigger('next');
    },
    
    /*
     * Move to the previous frame.
     */
    previous: function() {
      var self = this;
      
      // fire beforeprev event
      self._trigger('beforeprev');

      // get the current and previous nodes
      var current = self.centerFrame;
      var prev = self.centerFrame.prev;
      
      // do we have a previous frame?
      if(! prev){
        return;
      }
      
      // animate
      var elCurrent = current.data;
      var elPrev = prev.data;
      
      elPrev.css('visibility', '');
      
      // calculate the margin
      // When moving to the previous frame, we move the previous frame
      // to the right by the sliders width, bringing it back in to the
      // center and pushing the current frame to the right.
      var animateTo = parseInt(elPrev.css('margin-left'), 10) + self.sliderWidth;
      
      // do animation
      elPrev.animate({
        'margin-left': animateTo
      }, self.options.duration, function(){
        
        // after animation, update classes and visiblity
        elCurrent.removeClass(self.options.frameCenterClass);
        elCurrent.css('visibility', 'hidden');
        
        elPrev.addClass(self.options.frameCenterClass);
      });
      
      // update the center frame node
      self.centerFrame = prev;
      
      // fire prev event
      self._trigger('prev');
    },
    
    /*
     * Return the current frame node.
     */
    center: function() {
      return this.centerFrame;
    },
    
    /*
     * Returns the size of the slider.
     */
    size: function() {
      return this.frames.size();
    }
  });

}(jQuery));
