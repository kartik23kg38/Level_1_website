const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

const cursor = document.querySelector('#minicircle');
function cursorFunc() {
    window.addEventListener("mousemove", (ele) => {
        // console.log(ele.clientX, ele.clientY);
        const x = ele.clientX;
        const y = ele.clientY;
        cursor.style.transform = `translate(${x}px , ${y}px)`;
    })
}
cursorFunc();

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
