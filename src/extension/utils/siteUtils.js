import $ from 'jquery'
// import chrome from "chrome-api";


export function checkVisible( elm ) {
    return true
    var vpH = $(window).height(), // Viewport Height
        st = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();

    return ((y < (vpH + st)) && (y > (st - elementHeight)));
}

export function getDomPath(el) {
  console.log('el')
  console.log(el);
  var stack = [];
  while ( el.parentNode != null ) {
    console.log(el.nodeName);
    var sibCount = 0;
    var sibIndex = 0;
    for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
      var sib = el.parentNode.childNodes[i];
      if ( sib.nodeName == el.nodeName ) {
        if ( sib === el ) {
          sibIndex = sibCount;
        }
        sibCount++;
      }
    }
    if ( el.hasAttribute('id') && el.id != '' ) {
      stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
    } else if ( sibCount > 1 ) {
      stack.unshift(el.nodeName.toLowerCase() + ':nth-child(' + sibIndex + ')');
      // stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
    } else {
      stack.unshift(el.nodeName.toLowerCase());
    }
    el = el.parentNode;
  }

  return stack.slice(1); // removes the html element
}

export function focusElement(el){
  const path = getDomPath(el)
  if (path)   { 
    console.log('path')
    console.log(path)
      document.querySelector(path).scrollIntoView({behavior: 'smooth'});
  }
}

export function toggleVideo(){
  const video = document.querySelector('video');

  if (!video.paused){
    video.pause()
    return "paused"
  }
  else if (!video.ended){
    video.play();
    return "playing"
  }
}

export function pressKey(key) {
  const keyCode = key.toUpperCase().charCodeAt(0);
  console.log('keycode: ' + keyCode)
  const event = new KeyboardEvent('keydown',{'keyCode':keyCode})
  document.dispatchEvent(event)
}

export function toggleFullscreen(){
  const video = document.querySelector('video');

  const isFullscreen = video.fullscreenElement;
  console.log('is fullscreen?')
  console.log(isFullscreen)
  console.log('chromechromechrome')
  video.requestFullscreen();
}

export function scrollToTop(){
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}