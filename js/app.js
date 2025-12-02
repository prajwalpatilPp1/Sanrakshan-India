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
        window.addEventListener('scroll', function () {
            var topbar = document.querySelector('.topbar-black');
            var navbar = document.querySelector('.navbar-main');
            if (!topbar || !navbar) return;
            if (window.scrollY > 45) {
                topbar.classList.add('topbar-hidden');
                navbar.classList.add('fixed-top');
            } else {
                topbar.classList.remove('topbar-hidden');
                navbar.classList.remove('fixed-top');
            }
        });
    }
    
    function initMobileMenu() {
        const navbarCollapse = document.getElementById('navbarCollapse');
        if (!navbarCollapse) return;
        
        // Wait for DOM to be fully ready
        setTimeout(() => {
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
            const dropdownItems = document.querySelectorAll('.navbar-nav .dropdown-item');
            const dropdowns = document.querySelectorAll('.navbar-nav .dropdown');
            
            // Close mobile menu when clicking on a non-dropdown link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth < 992) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    }
                });
            });
            
            // Close mobile menu when clicking on a dropdown item
            dropdownItems.forEach(item => {
                item.addEventListener('click', () => {
                    if (window.innerWidth < 992) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    }
                });
            });
            
            // Handle dropdown toggles on mobile
            dropdowns.forEach(dropdown => {
                const toggle = dropdown.querySelector('.dropdown-toggle');
                if (!toggle) return;
                
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth < 992) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const isOpen = dropdown.classList.contains('show');
                        
                        // Close all dropdowns first
                        dropdowns.forEach(d => {
                            d.classList.remove('show');
                            const menu = d.querySelector('.dropdown-menu');
                            if (menu) menu.classList.remove('show');
                        });
                        
                        // Toggle current dropdown
                        if (!isOpen) {
                            dropdown.classList.add('show');
                            const menu = dropdown.querySelector('.dropdown-menu');
                            if (menu) menu.classList.add('show');
                        }
                    }
                });
            });
        }, 100);
    }

    function initBackToTop() {
        var btn = document.querySelector('.back-to-top');
        if (!btn) return;
        window.addEventListener('scroll', function(){
            if (window.scrollY > 300) btn.style.display = 'block'; else btn.style.display = 'none';
        });
        btn.addEventListener('click', function(e){ e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    function initCounters() {
        // Counter-Up disabled due to compatibility issues
        // Numbers display statically without animation
        console.log('Counter animation disabled - displaying static numbers');
    }

    function initDonorsCarousel() {
        if (window.jQuery && jQuery.fn.owlCarousel) {
            var donorsCarousel = jQuery('.donors-carousel');
            donorsCarousel.owlCarousel({
                autoplay: true,
                autoplayTimeout: 1000,    // Time before the scroll starts
                autoplaySpeed: 1000,      // Duration of the scroll animation
                smartSpeed: 1000,         // Transition speed, matched for smoothness
                autoplayHoverPause: false, // Ensure it doesn't pause on hover
                margin: 25,
                dots: false,
                loop: true,
                nav: false, // Disable default nav
                responsive: { 0:{ items:2 }, 768:{ items:4 }, 992:{ items:6 } }
            });

            // Custom Navigation
            jQuery('.custom-owl-next').click(function() {
                donorsCarousel.trigger('next.owl.carousel');
            });
            jQuery('.custom-owl-prev').click(function() {
                donorsCarousel.trigger('prev.owl.carousel', [300]);
            });
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

    function equalizeProgramItemHeights() {
        // Make all program-item boxes the same height (largest height among them)
        var items = Array.from(document.querySelectorAll('.program-item'));
        if (!items.length) return;
        // reset heights
        items.forEach(function(it){ it.style.height = 'auto'; });
        var max = items.reduce(function(acc, it){
            var h = it.getBoundingClientRect().height;
            return h > acc ? h : acc;
        }, 0);
        items.forEach(function(it){ it.style.height = Math.ceil(max) + 'px'; });
    }

    function debounce(fn, wait) {
        var t;
        return function() { clearTimeout(t); t = setTimeout(fn, wait); };
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

            if (modalTitle) modalTitle.textContent = `${member.name} - ${member.title}`;
            if (modalBody) {
                modalBody.innerHTML = `
                    <div class="text-center mb-4">
                        <img src="${member.image}" class="img-fluid rounded-circle" alt="Photo of ${member.name}" style="width: 150px; height: 150px; object-fit: cover;">
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
                    <span class="name" style="white-space: nowrap; font-size: 0.9rem;">${member.name}</span>
                    <p class="job" style="font-size: 0.7rem; min-height: 2.1em;">${member.title}</p>
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
            (card, members) => members.find(m => String(m.id) === card.getAttribute('data-member-id'))
        );
    }

    function renderBoardMembers() { // Renders board members for about.html
        const boardContainer = document.getElementById('board-members-container');
        if (!boardContainer || !Array.isArray(siteData.boardMembers)) return; // This function is also used for boardmembers.html

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
                    <span class="name" style="white-space: nowrap; font-size: 0.9rem;">${member.name}</span>
                    <p class="job" style="white-space: nowrap; font-size: 0.75rem; overflow: hidden; text-overflow: ellipsis;">${member.title}</p>
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
            (card, members) => members.find(m => String(m.id) === card.getAttribute('data-member-id'))
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
                    <span class="name" style="white-space: nowrap; font-size: 0.9rem;">${patron.name}</span>
                    <p class="job" style="white-space: nowrap; font-size: 0.75rem; overflow: hidden; text-overflow: ellipsis;">${patron.title}</p>
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

    function loadCarousel() {
        const container = document.getElementById('carousel-inner-container');
        if (!container) return;

        siteData.carousel.forEach((slide, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = `carousel-item ${index === 0 ? 'active' : ''} slide-${index + 1}`;
            
            slideDiv.innerHTML = `
                <div class="carousel-split-row">
                    <div class="carousel-description-col" style="--b: ${slide.descriptionBg};">
                        <div class="carousel-content-wrapper text-white">
                            <h2 class="carousel-tagline fw-bold text-white">${slide.title}</h2>
                        </div>
                    </div>
                    <div class="carousel-image-col">
                        <div class="carousel-background-image" 
                             style="background-image: url('${slide.image}'); background-position: ${slide.imagePosition || 'center'}; background-size: ${slide.imageSize || 'cover'};"
                             role="img"
                             aria-label="${slide.alt || slide.title}"></div>
                    </div>
                </div>`;

            container.appendChild(slideDiv);
        });
    }

    function renderFocusAreas() {
        const container = document.getElementById('focus-areas-container');
        if (!container || !siteData.focusAreas) return;

        // Duplicate the array 4 times to create a truly seamless infinite loop
        const focusAreas = [...siteData.focusAreas, ...siteData.focusAreas, ...siteData.focusAreas, ...siteData.focusAreas];

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

        // Enable true infinite scroll loop
        const marquee = document.querySelector('.focus-cards-marquee');
        if (marquee) {
            const singleSetWidth = container.scrollWidth / 4;
            
            // Set initial scroll position to second set
            marquee.scrollLeft = singleSetWidth;
            
            marquee.addEventListener('scroll', function() {
                // When reaching near the end, jump back to equivalent position
                if (marquee.scrollLeft >= singleSetWidth * 3) {
                    marquee.scrollLeft = singleSetWidth + (marquee.scrollLeft - singleSetWidth * 3);
                }
                // When reaching near the start, jump forward to equivalent position
                else if (marquee.scrollLeft <= singleSetWidth * 0.5) {
                    marquee.scrollLeft = singleSetWidth * 2 + marquee.scrollLeft;
                }
            });
        }
        

    }

    function renderDonors() {
        const container = document.getElementById('donors-container');
        if (!container || !siteData.donors) return;

        siteData.donors.forEach(donor => {
            const donorDiv = document.createElement('div');
            donorDiv.className = 'item';
            donorDiv.innerHTML = `
                <div class="d-flex justify-content-center align-items-center p-3">
                    <img src="${donor.logo}" alt="${donor.name}" class="img-fluid" style="max-height: 70px; object-fit: contain;">
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
        initCounters();
        initTimelineAnimation();

        // Load shared HTML components and then initialize page-specific content
        const headerPromise = includeHTML('header-placeholder', '_header.html').then(() => {
            initStickyNavbar(); // Initialize sticky nav after header is loaded
            initMobileMenu(); // Initialize mobile menu enhancements
        });
        const footerPromise = includeHTML('footer-placeholder', '_footer.html', true);

        // Wait for header and footer to be loaded before rendering other content
        Promise.all([headerPromise, footerPromise]).then(() => {
            // Page-specific rendering
            if (document.getElementById('carousel-inner-container')) loadCarousel();
            if (document.getElementById('team-container')) renderTeam();
            if (document.getElementById('board-members-container')) renderBoardMembers();
            if (document.getElementById('patrons-container')) renderPatrons();
            if (document.getElementById('focus-areas-container')) renderFocusAreas();
            if (document.getElementById('donors-container')) {
                renderDonors();
                initDonorsCarousel(); // Initialize carousel only after donors are rendered
            }
            if (document.getElementById('testimonials-container')) renderTestimonials();
            // Ensure program boxes have equal height after rendering
            equalizeProgramItemHeights();
            window.addEventListener('resize', debounce(equalizeProgramItemHeights, 150));
        });
    }

    init();
});