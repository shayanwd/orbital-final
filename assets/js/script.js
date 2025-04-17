function homeAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    let homeLoadTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".home-sec",
            start: "top 80%", 
            end: "top 20%", 
            markers: false,
        }
    });

    homeLoadTl.from(".heading, .sub-heading", {
        yPercent: 100,
        scale: 0.8,
        opacity: 0,
        stagger: 0.2
    }, "s");

    homeLoadTl.from(".home-cntnt-holder :is(.heading, .sub-heading) path", {
        yPercent: 400,
        stagger: 0.07,
        opacity: 0,
    }, "s");
} 

function sliderrr() {
    var swiper = new Swiper(".recs-swiper", {
        slidesPerView: 4,
        spaceBetween: 24,
        loop: false,
        pagination: {
            el: ".recs-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".recs-button-next",
            prevEl: ".recs-button-prev",
        },
        on: {
            init: function() {
                const paginationEl = this.pagination.el;
                const width = window.innerWidth;
                let currentNum = '4';
                
                if (width <= 700) {
                    currentNum = '2';
                } else if (width <= 990) {
                    currentNum = '3';
                }
                
                paginationEl.innerHTML = `<span class="swiper-pagination-current">${currentNum}</span> / <span class="swiper-pagination-total">5</span>`;
            },
            slideChange: function() {
                const paginationEl = this.pagination.el;
                const width = window.innerWidth;
                const currentIndex = this.activeIndex;
                let currentNum;
                
                if (width <= 700) {
                    // For mobile view (2 slides per view)
                    currentNum = Math.min(currentIndex + 2, 5);
                } else if (width <= 990) {
                    // For tablet view (2.3 slides per view)
                    currentNum = Math.min(currentIndex + 3, 5);
                } else {
                    // For desktop view (4 slides per view)
                    currentNum = this.isEnd ? '5' : '4';
                }
                
                paginationEl.innerHTML = `<span class="swiper-pagination-current">${currentNum}</span> / <span class="swiper-pagination-total">5</span>`;
            },
            resize: function() {
                // Update pagination on screen resize
                this.emit('slideChange');
            }
        },
        breakpoints: {
            990: {
                slidesPerView: 4,
                spaceBetween: 24,
            },
            700: {
                slidesPerView: 2.3,
                spaceBetween: 24,
            },
            320: {
                slidesPerView: 2,
                spaceBetween: 12,
            },
            20: {
                slidesPerView: 1,
                spaceBetween: 12,
            } 
        },
    });



    var swiper = new Swiper(".fade-swiper", {
        effect: "fade", 
        speed: 600,
        fadeEffect: {
        //   crossFade: true, 
        },
        autoHeight: true,
        loop: true,
        spaceBetween: 20,
        autoplay: {
          delay: 6000, 
        //   disableOnInteraction: false,
        }, 
      });
      
}


function skyCanvas() {
    
    if (sky) {
        function generateKeyframes() {
            const styleSheet = document.createElement('style');
            let keyframes = '';

            for (let i = 1; i <= 360; i++) {
                let angle = (i - (i % 4)) * (Math.PI / 180);
                let x = 80 * Math.cos(angle);
                let y = 80 * Math.sin(angle);
                let duration = Math.random() * 40000 + 5000;
                let fadeStart = Math.random() * 20;
                let fadeEnd = fadeStart + 10;

                keyframes += `
                    @keyframes anim-${i} {
                        100% { transform: translate(${x}vw, ${y}vh); }
                    }
                    @keyframes fade-${i} {
                        ${fadeStart}% { opacity: 0; }
                        ${fadeEnd}% { opacity: 1; }
                        100% { opacity: 1; }
                    }
                `;
            }

            styleSheet.innerHTML = keyframes;
            document.head.appendChild(styleSheet);
        }

        function dot(i, center) {
            const size = Math.random() > 0.5 ? 'size-1' : 'size-2';
            const star = document.createElement('span');
            star.style.top = `${center.y}px`;
            star.style.left = `${center.x}px`;
            star.classList.add('star', size);
            star.style.animation = `anim-${i} ${Math.random() * 40000 + 5000}ms linear infinite, fade-${i} ${Math.random() * 40000 + 5000}ms linear infinite`;
            return star;
        }

        function initSky(skyElement) {
            const center = { x: skyElement.clientWidth / 2, y: skyElement.clientHeight / 2 };
            skyElement.innerHTML = '';
            for (let i = 1; i <= 360; i++) {
                skyElement.appendChild(dot(i, center));
            }
        }

        document.addEventListener("DOMContentLoaded", () => {
            generateKeyframes();
            document.querySelectorAll('.sky').forEach(initSky);
        });
    }
}


function artistsSec() {
    const tabsNav = document.querySelectorAll('.arts-nav ul li');
    const tabsContent = document.querySelectorAll('.arts-tabs-content .arts-tabs-cell');

    tabsNav.forEach((items, ind) => {
        items.addEventListener('click', () => {
            tabsNav.forEach((remove) => {
                remove.classList.remove('active')
            })

            items.classList.add('active')

            tabsContent.forEach((content) => {
                content.classList.remove('active')
            })

            tabsContent[ind].classList.add('active')
        })
    })



    // RESP  
    if (window.innerWidth <= 500) {
        tabsContent.forEach((content) => {
            content.classList.remove('active');
            content.addEventListener("click", (e)=>{ 
                if (e.target.classList.contains('cell-back')) {
                    content.classList.remove('active');
                }
            })
        });
    } 
}

function navLinks() {
    // var navLinks = document.querySelectorAll(".header-nav ul li a");

    // navLinks.forEach((link) => {
    //   if (link.href === window.location.href) {
    //     link.classList.add("active");
    //   }
    // });

    var navLinks = document.querySelectorAll(".header-nav ul li a");

    navLinks.forEach((link) => {
      // Ignore external links
      if (link.hostname !== window.location.hostname) return;
    
      let linkPath = new URL(link.href).pathname;
      let currentPath = window.location.pathname;
    
      // Normalize paths to handle root URLs
      if (linkPath === "/") linkPath = "/index.html";
      if (currentPath === "/") currentPath = "/index.html";
    
      if (linkPath === currentPath) {
        link.classList.add("active");
      }
    });
    
    





    const navToggle = document.querySelector('.nv-toggle')
    const navClose = document.querySelector('.nv-close')
    const navOverlay = document.querySelector('.nv-overlay')
    const navMain = document.querySelector('.header-nav')

    navToggle.addEventListener('click', () => {
        navMain.classList.add('active') 
    })

    navClose.addEventListener('click', () => {
        navMain.classList.remove('active') 
    })

    navOverlay.addEventListener('click', () => {
        navMain.classList.remove('active') 
    })

}

function cookieBanner() {
    document.addEventListener("DOMContentLoaded", function () {
        const cookieBanner = document.getElementById("cookie-banner");
        if (cookieBanner) {
            const closeBtn = document.getElementById("close-cookie");
            const acceptBtn = document.getElementById("accept-all");
            const rejectBtn = document.getElementById("reject-all");
    
            // Check if user has already made a choice
            if (localStorage.getItem("cookieConsent")) {
                cookieBanner.classList.add("hidden");
            }
    
            // Accept all cookies
            acceptBtn.addEventListener("click", function () {
                localStorage.setItem("cookieConsent", "accepted");
                cookieBanner.classList.add("hidden");
            });
    
            // Reject unnecessary cookies
            rejectBtn.addEventListener("click", function () {
                localStorage.setItem("cookieConsent", "rejected");
                cookieBanner.classList.add("hidden");
            });
    
            // Close banner manually
            closeBtn.addEventListener("click", function () {
                cookieBanner.classList.add("hidden");
            });
        }
    });
}


function playVid() {
    document.addEventListener("DOMContentLoaded", function () {
        const videos = document.querySelectorAll("video");
    
        const tryPlay = (video) => {
          // Try to play the video if it's paused or ended
          if (video.paused || video.ended) {
            video.play().catch(err => {
              console.warn("Autoplay attempt failed:", err);
            });
          }
        };
    
        videos.forEach(video => {
          // Set necessary attributes
          video.setAttribute("autoplay", "");
          video.setAttribute("loop", "");
          video.setAttribute("muted", ""); // Required for autoplay
          video.setAttribute("playsinline", "");
    
          // Initial autoplay attempt
          tryPlay(video);
    
          // Setup observer to check if video is in view
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                tryPlay(video);
              }
            });
          }, { threshold: 0.25 }); // Trigger when 25% visible
    
          observer.observe(video);
        });
      });
}

homeAnimation()
sliderrr()
skyCanvas()
artistsSec()
navLinks()
cookieBanner()
playVid()