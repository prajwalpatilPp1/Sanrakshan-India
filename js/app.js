document.addEventListener('DOMContentLoaded', function () {

    // --- Reusable Functions ---

    function includeHTML(elementId, filePath) {
        return fetch(filePath)
            .then(r => { if (!r.ok) throw new Error(filePath); return r.text(); })
            .then(html => { const el = document.getElementById(elementId); if (el) el.innerHTML = html; })
            .catch(err => console.error(`Failed to include HTML from ${filePath}:`, err));
    }

    function initSpinner() {
        setTimeout(function () {
            var spinner = document.getElementById('spinner');
            if (spinner) spinner.classList.remove('show');
        }, 1);
    }

    function initWOW() {
        if (window.WOW) { new WOW().init(); }
    }

    function initStickyNavbar() {
        const navbar = document.querySelector('.navbar-main');
        const topbar = document.querySelector('.topbar-black');
        if (!navbar) return;
        
        let ticking = false;
        
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrolled = window.scrollY > 45;
                    navbar.classList.toggle('fixed-top', scrolled);
                    navbar.classList.toggle('scrolled', scrolled);
                    if (topbar) {
                        topbar.classList.toggle('scrolled', scrolled);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    function initBackToTop() {
        var btn = document.querySelector('.back-to-top');
        if (!btn) return;
        window.addEventListener('scroll', function(){
            if (window.scrollY > 300) btn.style.display = 'block'; else btn.style.display = 'none';
        });
        btn.addEventListener('click', function(e){ e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }



    function initDonorsCarousel() {
        if (window.jQuery && jQuery.fn.owlCarousel) {
            var donorsCarousel = jQuery('.donors-carousel');
            donorsCarousel.owlCarousel({
                loop: true,
                margin: 30,
                autoplay: true,
                autoplayTimeout: 2000,
                autoplaySpeed: 2000,
                autoplayHoverPause: true,
                smartSpeed: 2000,
                fluidSpeed: true,
                slideBy: 1,
                dots: false,
                nav: false,
                navSpeed: 2000,
                dragEndSpeed: 2000,
                mouseDrag: true,
                touchDrag: true,
                pullDrag: true,
                freeDrag: false,
                responsive: { 
                    0: { items: 1, mouseDrag: true, touchDrag: true }, 
                    576: { items: 2, mouseDrag: true, touchDrag: true }, 
                    768: { items: 3, mouseDrag: true, touchDrag: true }, 
                    992: { items: 4, mouseDrag: true, touchDrag: true } 
                }
            });

            // Custom Navigation
            jQuery('.custom-owl-next').click(function() {
                donorsCarousel.trigger('next.owl.carousel', [2000]);
            });
            jQuery('.custom-owl-prev').click(function() {
                donorsCarousel.trigger('prev.owl.carousel', [2000]);
            });
            
            // Add grab cursor for drag indication
            donorsCarousel.on('mousedown.owl.core', function() {
                jQuery(this).css('cursor', 'grabbing');
            });
            donorsCarousel.on('mouseup.owl.core', function() {
                jQuery(this).css('cursor', 'grab');
            });
            donorsCarousel.css('cursor', 'grab');
        }
    }

    function initTimelineAnimation() {
        window.addEventListener('scroll', function () {
            document.querySelectorAll('.timeline-item').forEach(function(item){
                var rect = item.getBoundingClientRect();
                if (rect.top < window.innerHeight - 50) item.classList.add('animate-in');
            });
        });
    }

    function setupMemberModal(containerSelector, membersData, cardSelector, findMemberCallback) {
        const container = document.querySelector(containerSelector);
        const modalEl = document.getElementById('memberModal');
        if (!container || !modalEl || !Array.isArray(membersData)) return;

        const modal = new bootstrap.Modal(modalEl);
        const modalTitle = document.getElementById('memberModalLabel');
        const modalBody = modalEl.querySelector('.modal-body');

        container.addEventListener('click', function (event) {
            const btn = event.target.closest('.read-more-bio');
            if (!btn) return;
            event.preventDefault();
            const card = btn.closest(cardSelector);
            const member = findMemberCallback(card, membersData);
            if (!member) return;

            if (modalTitle) modalTitle.textContent = ``;
            if (modalBody) {
                modalBody.innerHTML = `
                    <div>
                        <img src="${member.image}" class="img-fluid rounded-circle" alt="Photo of ${member.name}" style="width: 150px; height: 150px; object-fit: cover;">
                        <div class="member-modal-info">
                            <h4 class="member-name-modal">${member.name}</h4>
                            <p class="member-title-modal">${member.title}</p>
                        </div>
                    </div>
                    <div class="text-justify">${member.bio}</div>`;
            }
            modal.show();
        });
    }

    // --- Content Rendering ---

    function renderTeam() { // Renders team members for team.html
        const teamContainer = document.getElementById('team-container');
        if (!teamContainer || !Array.isArray(siteData.teamMembers)) return;

        siteData.teamMembers.forEach(function(member, index){
            var col = document.createElement('div');
            col.className = 'col-lg-2 col-md-4 col-sm-6 wow fadeInUp mb-4';
            col.setAttribute('data-wow-delay', ((index * 0.1) + 0.1) + 's');
            col.innerHTML = `
                <div class="new-team-card" data-member-id="${member.id}">
                    <div class="card-border-top"></div>
                    <div class="img-container">
                        <img src="${member.image}" alt="Photo of ${member.name}" loading="lazy" decoding="async"/>
                    </div>
                    <span class="name">${member.name}</span>
                    <p class="job">${member.title}</p>
                    <div class="uiverse-buttons mt-auto mb-3">
                        ${member.linkedin ? `<a href="${member.linkedin}" target="_blank" class="social-icon" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>` : ''}
                        <a href="#" class="social-icon read-more-bio" aria-label="Read More"><i class="fa fa-plus"></i></a>
                    </div>
                </div>`;
            teamContainer.appendChild(col);
            
            // Add animation with delay
            setTimeout(function() {
                col.querySelector('.new-team-card').classList.add('animate');
            }, (index * 100) + 300);
        });

        setupMemberModal('#team-container', siteData.teamMembers, '.new-team-card',
            (card, members) => members.find(m => m.id === card.getAttribute('data-member-id'))
        );
    }

    function renderBoardMembers() { // Renders board members for about.html
        const boardContainer = document.getElementById('board-members-container');
        if (!boardContainer || !Array.isArray(siteData.boardMembers)) return;

        siteData.boardMembers.forEach(function(member, index){
            var col = document.createElement('div');
            col.className = 'col-lg-3 col-md-6 col-sm-6 wow fadeInUp mb-4';
            col.setAttribute('data-wow-delay', ((index * 0.1) + 0.1) + 's');
            col.innerHTML = `
                <div class="new-team-card" data-member-id="${member.id}">
                    <div class="card-border-top"></div>
                    <div class="img-container">
                        <img src="${member.image}" alt="Photo of ${member.name}" loading="lazy" decoding="async"/>
                    </div>
                    <span class="name">${member.name}</span>
                    <p class="job">${member.title}</p>
                    <div class="uiverse-buttons mt-auto mb-3">
                        ${member.linkedin ? `<a href="${member.linkedin}" target="_blank" class="social-icon" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>` : ''}
                        <a href="#" class="social-icon read-more-bio" aria-label="Read More"><i class="fa fa-plus"></i></a>
                    </div>
                </div>`;
            boardContainer.appendChild(col);
            
            // Add animation with delay
            setTimeout(function() {
                col.querySelector('.new-team-card').classList.add('animate');
            }, (index * 100) + 300);
        });

        setupMemberModal('#board-members-container', siteData.boardMembers, '.new-team-card',
            (card, members) => members.find(m => m.id === card.getAttribute('data-member-id'))
        );
    }

    function renderPatrons() { // Renders patrons for about.html
        const patronsContainer = document.getElementById('patrons-container');
        if (!patronsContainer || !Array.isArray(siteData.patrons)) return;

        siteData.patrons.forEach(function(patron, index){
            var col = document.createElement('div');
            col.className = 'col-lg-3 col-md-6 col-sm-6 wow fadeInUp mb-4';
            col.setAttribute('data-wow-delay', ((index * 0.1) + 0.1) + 's');
            col.innerHTML = `
                <div class="patron-card" data-member-id="${patron.id}">
                    <div class="img-container">
                        <img src="${patron.image}" alt="Photo of ${patron.name}" loading="lazy" decoding="async"/>
                    </div>
                    <span class="name">${patron.name}</span>
                    <p class="job">${patron.title}</p>
                    <div class="uiverse-buttons mt-auto mb-3">
                        ${patron.bio ? `<a href="#" class="social-icon read-more-bio" aria-label="Read More"><i class="fa fa-book-open"></i></a>` : ''}
                        <a href="#" class="social-icon" aria-label="Honor"><i class="fa fa-star"></i></a>
                    </div>
                </div>`;
            patronsContainer.appendChild(col);
            
            // Add animation with delay
            setTimeout(function() {
                col.querySelector('.patron-card').classList.add('animate');
            }, (index * 150) + 400);
        });

        setupMemberModal('#patrons-container', siteData.patrons, '.patron-card',
            (card, members) => members.find(m => m.id === card.getAttribute('data-member-id'))
        );
    }

    function preloadCarouselImages() {
        // Preload all carousel images for smooth transitions
        siteData.carousel.forEach(slide => {
            const img = new Image();
            img.src = slide.image;
        });
    }

    function loadCarousel() {
        const container = document.getElementById('carousel-inner-container');
        if (!container) return;

        // Preload images first
        preloadCarouselImages();

        siteData.carousel.forEach((slide, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = `carousel-item ${index === 0 ? 'active' : ''} slide-${index + 1}`;

            slideDiv.innerHTML = `
                <div class="carousel-split-row">
                    <div class="carousel-description-col" style="--b: ${slide.descriptionBg};">
                        <div class="carousel-content-wrapper text-white">
                            <h1 class="display-5 fw-bold text-white">${slide.title}</h1>
                        </div>
                    </div>
                    <div class="carousel-image-col">
                        <div class="carousel-background-image loading" style="background-image: url('${slide.image}'); background-position: ${slide.imagePosition || 'center'}; background-size: ${slide.imageSize || 'cover'};"></div>
                    </div>
                </div>`;

            container.appendChild(slideDiv);
        });

        // Remove loading class after images are loaded
        setTimeout(() => {
            document.querySelectorAll('.carousel-background-image.loading').forEach(el => {
                el.classList.remove('loading');
            });
        }, 100);
    }

    function renderFocusAreas() {
        const container = document.getElementById('focus-areas-container');
        if (!container || !siteData.focusAreas) return;

        // Duplicate the array 2 times for seamless infinite scrolling with CSS animation
        const focusAreas = [...siteData.focusAreas, ...siteData.focusAreas];

        focusAreas.forEach(area => {
            const card = document.createElement('div');
            card.className = 'focus-card';
            card.innerHTML = `
                <img src="${area.image}" alt="${area.title}" loading="lazy" decoding="async">
                <div class="focus-content">
                    <h5>${area.title}</h5>
                    <p>${area.description}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    function initFocusAreasDrag() {
        const marquee = document.querySelector('.focus-cards-marquee');
        const scroll = document.querySelector('.focus-cards-scroll');
        if (!marquee || !scroll) return;

        let isDown = false;
        let startX;
        let scrollLeft;
        let isHovering = false;
        let animationId;

        // Smooth auto-scroll functionality using requestAnimationFrame
        function autoScroll() {
            if (!isDown && !isHovering) {
                marquee.scrollLeft += 2;
                // Seamless infinite loop
                if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
                    marquee.scrollLeft = 0;
                }
            }
            animationId = requestAnimationFrame(autoScroll);
        }

        // Start smooth auto-scroll
        autoScroll();

        // Pause on hover
        marquee.addEventListener('mouseenter', () => {
            isHovering = true;
        });

        marquee.addEventListener('mouseleave', () => {
            isHovering = false;
            isDown = false;
            marquee.classList.remove('dragging');
        });

        // Drag functionality
        marquee.addEventListener('mousedown', (e) => {
            isDown = true;
            marquee.classList.add('dragging');
            startX = e.pageX - marquee.offsetLeft;
            scrollLeft = marquee.scrollLeft;
            e.preventDefault();
        });

        marquee.addEventListener('mouseup', () => {
            isDown = false;
            marquee.classList.remove('dragging');
        });

        marquee.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - marquee.offsetLeft;
            const walk = (x - startX) * 2;
            marquee.scrollLeft = scrollLeft - walk;
        });

        // Touch support for mobile
        marquee.addEventListener('touchstart', (e) => {
            isDown = true;
            marquee.classList.add('dragging');
            startX = e.touches[0].pageX - marquee.offsetLeft;
            scrollLeft = marquee.scrollLeft;
        });

        marquee.addEventListener('touchend', () => {
            isDown = false;
            marquee.classList.remove('dragging');
        });

        marquee.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - marquee.offsetLeft;
            const walk = (x - startX) * 2;
            marquee.scrollLeft = scrollLeft - walk;
        });
    }



    function renderDonors() {
        const container = document.getElementById('donors-container');
        if (!container || !siteData.donors) return;

        siteData.donors.forEach(donor => {
            const donorDiv = document.createElement('div');
            donorDiv.className = 'item';
            donorDiv.innerHTML = `
                <div class="d-flex justify-content-center align-items-center p-3">
                    <img src="${donor.logo}" alt="${donor.name}" class="img-fluid">
                </div>`;
            container.appendChild(donorDiv);
        });
    }

    function renderTestimonials() {
        const container = document.getElementById('testimonials-container');
        if (!container || !siteData.testimonials) return;

        siteData.testimonials.forEach((testimonial, index) => {
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 wow fadeInUp';
            col.setAttribute('data-wow-delay', `${0.1 * (index + 1)}s`);
            col.innerHTML = `
                <div class="card-item-styled">
                    <div class="team-comment-wrapper">
                        <div class="team-comment">
                            <p class="mb-0">${testimonial.quote}</p>
                        </div>
                        <div class="team-comment-arrow"></div>
                    </div>
                    <img class="team-photo" src="${testimonial.image}" alt="Photo of ${testimonial.name}">
                    <h5>${testimonial.name}</h5>
                </div>`;
            container.appendChild(col);
        });
    }
    // --- App Initialization ---

    function init() {
        // Global initializations
        initSpinner();
        initWOW();
        initBackToTop();
        initTimelineAnimation();

        // Load shared HTML components and then initialize page-specific content
        const headerPromise = includeHTML('header-placeholder', '_header.html').then(() => {
            initStickyNavbar(); // Initialize sticky nav after header is loaded
        });
        const footerPromise = includeHTML('footer-placeholder', '_footer.html');

        // Wait for header and footer to be loaded before rendering other content
        Promise.all([headerPromise, footerPromise]).then(() => {
            // Page-specific rendering
            if (document.getElementById('carousel-inner-container')) loadCarousel();
            if (document.getElementById('team-container')) renderTeam();
            if (document.getElementById('board-members-container')) renderBoardMembers();
            if (document.getElementById('patrons-container')) renderPatrons();
            if (document.getElementById('focus-areas-container')) {
                renderFocusAreas();
                initFocusAreasDrag(); // Initialize drag scrolling for focus areas
            }
            if (document.getElementById('donors-container')) {
                renderDonors();
                initDonorsCarousel(); // Initialize carousel only after donors are rendered
            }
            if (document.getElementById('testimonials-container')) renderTestimonials();
        });
    }

    init();
});

// --- Drag/Swipe Functionality for Carousels ---

// Enable drag/swipe for Bootstrap carousel
function initCarouselDrag() {
    const carousel = document.getElementById('sanrakshanCarousel');
    if (!carousel) return;

    let startX = 0;
    let isDragging = false;
    const threshold = 50; // minimum distance for swipe

    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    carousel.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
    }, { passive: true });

    carousel.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            const bsCarousel = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel);
            if (diff > 0) {
                bsCarousel.next();
            } else {
                bsCarousel.prev();
            }
        }
    }, { passive: true });

    // Mouse drag for desktop
    let mouseStartX = 0;
    let isMouseDragging = false;

    carousel.addEventListener('mousedown', function(e) {
        mouseStartX = e.clientX;
        isMouseDragging = true;
        carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mousemove', function(e) {
        if (!isMouseDragging) return;
        e.preventDefault();
    });

    carousel.addEventListener('mouseup', function(e) {
        if (!isMouseDragging) return;
        isMouseDragging = false;
        carousel.style.cursor = 'grab';
        
        const mouseEndX = e.clientX;
        const diff = mouseStartX - mouseEndX;

        if (Math.abs(diff) > threshold) {
            const bsCarousel = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel);
            if (diff > 0) {
                bsCarousel.next();
            } else {
                bsCarousel.prev();
            }
        }
    });

    carousel.addEventListener('mouseleave', function() {
        isMouseDragging = false;
        carousel.style.cursor = 'grab';
    });

    // Set initial cursor
    carousel.style.cursor = 'grab';
}

// Enable drag/swipe for Focus Areas
function initFocusAreasDrag() {
    const scrollContainer = document.querySelector('.focus-cards-marquee');
    if (!scrollContainer) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener('mousedown', function(e) {
        isDown = true;
        scrollContainer.classList.add('dragging');
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
        scrollContainer.style.cursor = 'grabbing';
    });

    scrollContainer.addEventListener('mouseleave', function() {
        isDown = false;
        scrollContainer.classList.remove('dragging');
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mouseup', function() {
        isDown = false;
        scrollContainer.classList.remove('dragging');
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mousemove', function(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;

    scrollContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].pageX - scrollContainer.offsetLeft;
        touchScrollLeft = scrollContainer.scrollLeft;
    }, { passive: true });

    scrollContainer.addEventListener('touchmove', function(e) {
        const x = e.touches[0].pageX - scrollContainer.offsetLeft;
        const walk = (x - touchStartX) * 2;
        scrollContainer.scrollLeft = touchScrollLeft - walk;
    }, { passive: true });

    // Set initial cursor
    scrollContainer.style.cursor = 'grab';
}

// Initialize all drag functionality
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for Bootstrap to initialize
    setTimeout(function() {
        initCarouselDrag();
    }, 500);
});
