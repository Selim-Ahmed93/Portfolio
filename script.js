//  Dark mode toggle
        const toggle = document.getElementById('toggle');
        const html = document.documentElement;
        
        // Check for saved user preference or use system preference
        if (localStorage.getItem('darkMode') === 'true' || 
            (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            html.classList.add('dark');
            toggle.checked = true;
        }
        
        toggle.addEventListener('change', function() {
            if (this.checked) {
                html.classList.add('dark');
                localStorage.setItem('darkMode', true);
            } else {
                html.classList.remove('dark');
                localStorage.setItem('darkMode', false);
            }
        });
        
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Project filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-primary-light', 'dark:bg-primary-dark', 'text-white');
                    btn.classList.add('border', 'border-gray-300', 'dark:border-gray-600', 'hover:bg-gray-100', 'dark:hover:bg-gray-800');
                });
                
                this.classList.add('bg-primary-light', 'dark:bg-primary-dark', 'text-white');
                this.classList.remove('border', 'border-gray-300', 'dark:border-gray-600', 'hover:bg-gray-100', 'dark:hover:bg-gray-800');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-tech').includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // Intersection Observer for animations
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.animate-slide-up, .animate-fade-in');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-slide-up', 'animate-fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            elements.forEach(element => {
                observer.observe(element);
            });
        };
        
        // Initialize animations when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            animateOnScroll();
        });

