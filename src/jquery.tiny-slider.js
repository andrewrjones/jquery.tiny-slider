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
      frameClass: 'frame',
      frameCenterClass: 'frame-center',
      frameContainerClass: 'frames'
    },

    _create: function () {
      var self = this;
      
      // container element
      self.elFrames = self.element.find(
        '.' + this.options.frameContainerClass)
        .first();
      
      // internal store of frames
      self.frames = new DoublyLinkedList();
      
      // loop over children to get initial content
      self.elFrames.find('.' + this.options.frameClass).each(function (index, element) {
        var el = $(element);
        var node = self.frames.append(el);
        
        if(el.hasClass('frame-center')){
          self.centerFrame = node;
        }
      });
      
      // ensure we have a center frame if we have some frames
      if(self.frames.size() > 0){
        if(! self.centerFrame){
          self.centerFrame = self.frames.head();
          self.centerFrame.data.addClass(this.options.frameCenterClass);
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
      
      // TODO: fire events
      // TODO: animate

      // get the current and previous nodes
      var current = self.centerFrame;
      var next = self.centerFrame.next;
      
      // do we have a next frame?
      if(! next){
        return;
      }
      
      // update css
      current.data.removeClass(self.options.frameCenterClass);
      next.data.addClass(self.options.frameCenterClass);
      
      // update the center frame node
      self.centerFrame = next;
    },
    
    /*
     * Move to the previous frame.
     */
    previous: function() {
      var self = this;
      
      // TODO: fire events
      // TODO: animate

      // get the current and previous nodes
      var current = self.centerFrame;
      var prev = self.centerFrame.prev;
      
      // do we have a previous frame?
      if(! prev){
        return;
      }
      
      // update css
      current.data.removeClass(self.options.frameCenterClass);
      prev.data.addClass(self.options.frameCenterClass);
      
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
