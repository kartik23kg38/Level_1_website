const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// function firstPageAnim() {
//     var tl = gsap.timeline();

//     tl.from("#nav", {
//         y: '-20',
//         opacity: 0,
//         duration: 1,
//         ease: Expo.easeInOut
//     })
//         .to(".bounding .boundingele", {
//             y: '0',
//             ease: Expo.easeInOut,
//             duration: 2,
//             delay: -1,
//             stagger: 0.1
//         })

//         .to(".boundingele_h6", {
//             y: 0,
//             ease: Expo.easeInOut,
//             duration: 1.5,
//         }, "-=1.3")

//         .to(".bounding_h4 .avail_1_1", {
//             y: 0,
//             ease: Expo.easeInOut,
//             duration: 1.5,
//             stagger: {
//                 each: 0.01,
//                 from: "end"
//             },
//         }, "-=.8")

//         .from("#avail_2", {
//             y: -10,
//             opacity: 0,
//             duration: 1,
//             ease: Expo.easeInOut
//         }, "-=1");
// }
// firstPageAnim();

const cursor = document.querySelector('#minicircle');
function mouseFollowerCircle(xscale, yscale, x, y) {
    cursor.style.transform = `translate(${x}px , ${y}px) scale(${xscale} , ${yscale})`;
}
mouseFollowerCircle();

function cursorChapta() {
    var xprev = 0, yprev = 0;
    var xscale = 1, yscale = 1;

    window.addEventListener("mousemove", function (ele) {
        var x = ele.clientX;
        var y = ele.clientY;

        var xdiff = x - xprev;
        var ydiff = y - yprev;
        xprev = x;
        yprev = y;
        xscale = gsap.utils.clamp(0.7, 1.4, xdiff);
        yscale = gsap.utils.clamp(0.7, 1.4, ydiff);

        mouseFollowerCircle(xscale, yscale, x, y);

        setTimeout(function () {
            cursor.style.transform = `translate(${x}px , ${y}px) scale(1, 1)`;  // Use x and y, not xscale/yscale
        }, 100);
    });
}
cursorChapta();


var ele_divs = document.querySelectorAll(".ele");
var diff_rot = 0;
var rotate = 0;
ele_divs.forEach(function (elem1) {
    elem1.addEventListener("mousemove", (elem2) => {
        var rect = elem1.getBoundingClientRect();
        // var topDiff = elem2.clientY - rect.top;

        diff_rot = elem2.clientX - rotate;
        rotate = elem2.clientX;
        var leftDiff = elem2.clientX - rect.left;
        gsap.to(elem1.querySelector("img"), {
            opacity: 1,
            ease: Power1.easeOut,
            duration: 0.5,
            // top:  topDiff,
            left:  leftDiff,
            rotate: gsap.utils.clamp(-20, 20, diff_rot*.4),
            onStart: function () {
                elem1.querySelector("img").style.display = "block";}
        });
    });

    elem1.addEventListener("mouseleave", () => {
        gsap.to(elem1.querySelector("img"), {
            opacity: 0,
            ease: Power1.easeOut,
            duration: 0.5,
            onComplete: function () {
                elem1.querySelector("img").style.display = "none";  // Hide image when mouse leaves
            }
        });
    });
});


