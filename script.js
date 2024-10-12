const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-20',
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut
    })
        .to(".bounding .boundingele", {
            y: '0',
            ease: Expo.easeInOut,
            duration: 2,
            delay: -1,
            stagger: 0.1
        })

        .to(".boundingele_h6", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 1.5,
        }, "-=1.3")

        .to(".bounding_h4 .avail_1_1", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 1.5,
            stagger: {
                each: 0.01,
                from: "end"
            },
        }, "-=.8")

        .from("#avail_2", {
            y: -10,
            opacity: 0,
            duration: 1,
            ease: Expo.easeInOut
        }, "-=1");
}
firstPageAnim();

const cursor = document.querySelector('#minicircle');

// Function to handle the cursor following with smooth animation
function mouseFollowerCircle(xscale, yscale, x, y) {
    gsap.to(cursor, {
        x: x,
        y: y,
        scaleX: xscale,
        scaleY: yscale,
        duration: 0.2, 
        ease: "power3.out" 
    });
}

// Function to make the cursor react to fast movements
function cursorChapta() {
    let xprev = 0, yprev = 0;
    let xscale = 1, yscale = 1;

    window.addEventListener("mousemove", function (ele) {
        let x = ele.clientX;
        let y = ele.clientY;

        let xdiff = Math.abs(x - xprev);
        let ydiff = Math.abs(y - yprev);
        xprev = x;
        yprev = y;

        // Scale based on the difference in cursor movement, capped between 0.7 and 1.4
        xscale = gsap.utils.clamp(0.8, 1.4, 1 + xdiff / 200); // Divide by a larger number to smooth out scaling
        yscale = gsap.utils.clamp(0.8, 1.4, 1 + ydiff / 200);

        // Move the cursor smoothly
        mouseFollowerCircle(xscale, yscale, x, y);
        
        // Smoothly reset scale after movement
        gsap.to(cursor, {
            scaleX: 1,
            scaleY: 1, 
            duration: 0.4, 
            ease: "power2.out" 
        });
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


