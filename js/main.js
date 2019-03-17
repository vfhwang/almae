document.addEventListener("DOMContentLoaded", function(e) {
  Barba.Pjax.start();
});

// WE WANT TO SCROLL MAINCONTAINER TO 200PX, WHILE FADE OUT CONTENT AND FADE IN NEW CONTENT WHENEVER A NEW PAGE IS LOADED.

var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    console.log("runming scorlly!");

    // document.body.scrollTop = document.documentElement.scrollTop = 0;
    $("html, body").animate({ scrollTop: 0 }, 200);

    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */

    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise.all([this.newContainerLoading, this.fadeOut()]).then(
      this.fadeIn.bind(this)
    );
  },

  fadeOut: function() {
    /**
     * this.oldContainer is the HTMLElement of the old Container
     */

    return $(this.oldContainer)
      .animate({ opacity: "1", top: "0px" })
      .promise();
  },

  fadeIn: function() {
    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */

    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility: "visible",
      opacity: 0
    });

    $el.animate({ opacity: 1 }, 400, function() {
      /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */

      _this.done();
    });
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
  /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */

  return FadeTransition;
};

let i = 1;

function placeImage(x, y) {
  const nextSrc = "/uploads/stamps/stamp-" + [getRandomInt(1, 66)] + ".png";
  console.log(nextSrc);

  var scrollTop = window.pageYOffset;
  const img = document.createElement("img");
  img.setAttribute("src", nextSrc);
  img.setAttribute("draggable", "false");
  img.classList.add("stamp");

  console.log(scrollTop);

  img.style.left = x + "px";
  img.style.top = y - scrollTop + "px";
  img.style.transform =
    "translate(-50%, -50%) scale(0.5) rotate(" +
    (Math.random() * 20 - 10) +
    "deg)";

  document.body.appendChild(img);

  // console.log(getRandomInt(1, 66));

  // i = i + 1;
  // if (i >= 65) {
  //   i = 1;
  // }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function fadeHelper() {
  var fadeTarget = document.getElementById("helpericon");
  var fadeEffect = setInterval(function() {
    if (!fadeTarget.style.opacity) {
      fadeTarget.style.opacity = 1;
    }
    if (fadeTarget.style.opacity > 0) {
      fadeTarget.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
    }
  }, 50);
}

document.addEventListener("click", function(event) {
  // event.preventDefault()
  placeImage(event.pageX, event.pageY);
  fadeHelper();
});

document.addEventListener("touchstart", function(event) {
  // event.preventDefault()
  placeImage(event.pageX, event.pageY);
  fadeHelper();
});

document.addEventListener("scroll", function(event) {
  console.log("scroll!");
});

$(".worklink").click(function(e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 400 }, 400);
  return false;
});
