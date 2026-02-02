document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        once: true, // Animation happens only once - while scrolling down
        offset: 100, // Offset (in px) from the original trigger point
        duration: 800, // Duration of animation
        easing: 'ease-out-cubic',
    });

    // 2. Sticky Navbar Logic
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // 4. Gamification Logic (The 7 Stones Console)
    const stones = document.querySelectorAll('.stone-item');
    const consoleTitle = document.getElementById('console-title');
    const consoleDesc = document.getElementById('console-desc');
    const consoleBox = document.getElementById('stone-console');

    stones.forEach(stone => {
        stone.addEventListener('mouseenter', () => {
            const name = stone.getAttribute('data-name');
            const desc = stone.getAttribute('data-desc');
            const color = stone.getAttribute('data-color');

            // Update Text
            consoleTitle.textContent = name;
            consoleDesc.textContent = desc;

            // Update Styles (Cyberpunk Glow)
            consoleTitle.style.color = color;
            consoleBox.style.borderColor = color;
            consoleBox.style.boxShadow = `0 0 20px ${color}40`; // 40 is alpha opacity
        });

        // Optional: Reset on mouseleave or keep last selected
        // stone.addEventListener('mouseleave', () => { ... });
    });

    // 5. FAQ Accordion Logic
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            // Toggle active class on button
            toggle.classList.toggle('active');
            
            // Get the content div
            const content = toggle.nextElementSibling;
            
            if (toggle.classList.contains('active')) {
                // Expand
                content.style.height = content.scrollHeight + 'px';
            } else {
                // Collapse
                content.style.height = '0px';
            }

            // Optional: Close other items (Accordion behavior)
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== toggle && otherToggle.classList.contains('active')) {
                    otherToggle.classList.remove('active');
                    otherToggle.nextElementSibling.style.height = '0px';
                }
            });
        });
    });

    // 6. Event Tracking Logic
    const trackEvent = (category, action, label) => {
        if (typeof gtag === 'function') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
            });
        }
        if (typeof fbq === 'function') {
            fbq('trackCustom', action, {
                category: category,
                label: label,
            });
        }
    };

    // Update event tracking logic for specific buttons
    const trackSpecificEvent = (action, label) => {
        if (typeof gtag === 'function') {
            gtag('event', action, {
                event_category: 'Button Click',
                event_label: label,
            });
        }
        if (typeof fbq === 'function') {
            fbq('trackCustom', action, {
                category: 'Button Click',
                label: label,
            });
        }
    };

    // Track "Lead" events
    document.querySelectorAll('a[href="#products"], button').forEach(button => {
        const text = button.textContent.trim();
        if (text === "Start Now" || text === "เริ่มต้นภารกิจฟรี" || text === "เริ่มภารกิจ!") {
            button.addEventListener('click', () => {
                trackSpecificEvent('Lead', text);
            });
        }
    });

    // Track "Contact" events
    document.querySelectorAll('a[href*="lin.ee"], button').forEach(button => {
        const text = button.textContent.trim();
        if (text === "เพิ่มเพื่อนในไลน์ OA เพื่อรับเครื่องมือฟรี!" || text === "ขอรายละเอียด") {
            button.addEventListener('click', () => {
                trackSpecificEvent('Contact', text);
            });
        }
    });

});