/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('jQuery#tinyslider');

  test('simple', 15, function() {
    var el,
        center,
        newEl;
    
    el = $('#qunit-fixture').tinyslider();
    strictEqual(el.tinyslider("size"), 2, 'initial 2 slides');
    
    center = el.find('.frame-center');
    strictEqual(center.size(), 1, 'only one center');
    strictEqual(center.html(), el.tinyslider("center").data.html(), 'correct center');
    
    // append
    el.tinyslider("append", $("<div>Frame Three</div>"));
    strictEqual(el.tinyslider("size"), 3, 'now three slides');
    strictEqual(el.children().first().children().size(), 3, 'now three slides');
    newEl = el.children().first().children().last();
    ok(newEl.hasClass('frame'), 'new el has class of frame');
    strictEqual(newEl.children().first().html(), 'Frame Three', 'now three slides');
    
    // prepend
    el.tinyslider("prepend", $("<div>Frame Four</div>"));
    strictEqual(el.tinyslider("size"), 4, 'now four slides');
    strictEqual(el.children().first().children().size(), 4, 'now four slides');
    newEl = el.children().first().children().first();
    ok(newEl.hasClass('frame'), 'new el has class of frame');
    strictEqual(newEl.children().first().html(), 'Frame Four', 'now three slides');
    
    // move to next
    center = el.tinyslider("center");
    el.tinyslider("next");
    notStrictEqual(center.data.html(), el.tinyslider("center").data.html(), 'new center');
    strictEqual(el.find('.frame-center').size(), 1, 'only one center');
    // and back again
    el.tinyslider("previous");
    strictEqual(center.data.html(), el.tinyslider("center").data.html(), 'prev center');
    strictEqual(el.find('.frame-center').size(), 1, 'only one center');
  });

}(jQuery));
