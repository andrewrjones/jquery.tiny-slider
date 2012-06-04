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
      duration: 1500
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
      element.addClass(this.options.frameClass);
      this.elFrames.append(element);
      this.frames.append(element);
    },
    
    /*
     * Prepends a new frame to the slider.
     */
    prepend: function(element) {
      element.addClass(this.options.frameClass);
      this.elFrames.prepend(element);
      this.frames.prepend(element);
    },
    
    /*
     * Move to the next frame.
     */
    next: function() {
      var self = this;

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
      
      var animateTo = parseInt(elCurrent.css('margin-left'), 10) - self.sliderWidth;
      elCurrent.animate({
        'margin-left': animateTo
      }, self.options.duration, function(){
        elCurrent.removeClass(self.options.frameCenterClass);
        elCurrent.css('visibility', 'hidden');
        
        elNext.addClass(self.options.frameCenterClass);
      });
      
      // update the center frame node
      self.centerFrame = next;
    },
    
    /*
     * Move to the previous frame.
     */
    previous: function() {
      var self = this;

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
      
      var animateTo = parseInt(elPrev.css('margin-left'), 10) + self.sliderWidth;
      elPrev.animate({
        'margin-left': animateTo
      }, self.options.duration, function(){
        elCurrent.removeClass(self.options.frameCenterClass);
        elCurrent.css('visibility', 'hidden');
        
        elPrev.addClass(self.options.frameCenterClass);
      });
      
      // update the center frame node
      self.centerFrame = prev;
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
