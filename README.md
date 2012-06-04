# jQuery Tiny Slider

Minimal implementation of a slider.

## Getting Started

_(Coming soon)_

In your web page:

```html
<!-- dependencies -->
<script src="jquery.js"></script>
<script src="jquery.ui.widget.js"></script>
<script src="doubly-linked-list.js"></script>
<!-- lib -->
<script src="jquery.tiny-slider.min.js"></script>
<link href="jquery.tiny-slider.css" rel="stylesheet"></link>
<script>
jQuery(function($) {
  var tinyslider = $("#tinyslider").tinyslider(){
    duration: 2000, // duration of animations
    
    next: function(){
      console.log("moved to the next frame");
    },
    prev: function(){
      console.log("moved to the previous frame");
    }
  });

  // move slider on clicks
  $('.tinyslider-prev').click(function(){
    tinyslider.tinyslider("previous");
    return false;
  });
  $('.tinyslider-next').click(function(){
    tinyslider.tinyslider("next");
    return false;
  });

  // append/prepend slides
  tinyslider.tinyslider("prepend", $(
    '<div class="hero-unit">' +
    '<h2>Prepended Slide</h2>' +
    '<p>This slide was prepended in JavaScript.' +
    '</div>'
  ));
  tinyslider.tinyslider("append", $(
    '<div class="hero-unit">' +
    '<h2>Appended Slide</h2>' +
    '<p>This slide was appended in JavaScript.' +
    '</div>'
  ));
});
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## TODO

- API Docs
- Homepage
- More tests
- Test on iPhone

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Andrew Jones  
Licensed under the MIT license.
