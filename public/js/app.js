/* =============================================
   MOBIX Presentation - Simple Presentation App
   ============================================= */

class MobixPresentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = slidesData.length;
        this.isTransitioning = false;
        
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.renderSlide(this.currentSlide);
        this.updateUI();
    }

    cacheElements() {
        this.presentationContainer = document.getElementById('presentationContainer');
        this.slidesContainer = document.getElementById('slidesContainer');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.slideNumber = document.getElementById('slideNumber');
        this.progressFill = document.getElementById('progressFill');
        
        // Modal elements
        this.modalOverlay = document.getElementById('modalOverlay');
        this.modalIcon = document.getElementById('modalIcon');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalBody = document.getElementById('modalBody');
        this.modalClose = document.getElementById('modalClose');
    }

    bindEvents() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Touch/Swipe support
        this.setupTouchNavigation();
        
        // Modal events
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) this.closeModal();
        });
        
        // Delegate click events for modal cards
        this.slidesContainer.addEventListener('click', (e) => this.handleCardClick(e));
    }

    // ==========================================
    // Navigation
    // ==========================================

    prevSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    goToSlide(slideNumber) {
        if (this.isTransitioning) return;
        if (slideNumber < 1 || slideNumber > this.totalSlides) return;
        if (slideNumber === this.currentSlide) return;
        
        this.isTransitioning = true;
        this.currentSlide = slideNumber;
        
        // Render and animate
        this.renderSlide(this.currentSlide);
        this.updateUI();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 300);
    }

    handleKeyboard(e) {
        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                this.prevSlide();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides);
                break;
        }
    }

    setupTouchNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.slidesContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.slidesContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide(); // Swipe left = next
            } else {
                this.prevSlide(); // Swipe right = prev
            }
        }
    }

    // ==========================================
    // Rendering
    // ==========================================

    renderSlide(slideNumber) {
        const slide = slidesData[slideNumber - 1];
        if (!slide) return;
        
        const html = SlidesRenderer.render(slide);
        
        // Create new slide element
        const slideElement = document.createElement('div');
        slideElement.className = 'slide slide-enter';
        slideElement.innerHTML = html;
        
        // Clear and add new slide
        this.slidesContainer.innerHTML = '';
        this.slidesContainer.appendChild(slideElement);
        
        // Trigger animations
        setTimeout(() => {
            slideElement.querySelectorAll('.stagger-animation').forEach(el => {
                el.classList.add('animate');
            });
        }, 100);
    }

    updateUI() {
        // Update slide counter
        this.slideNumber.textContent = `${this.currentSlide} / ${this.totalSlides}`;
        
        // Update progress bar
        const progress = (this.currentSlide / this.totalSlides) * 100;
        this.progressFill.style.width = `${progress}%`;
        
        // Update button states
        this.prevBtn.disabled = this.currentSlide === 1;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;
        
        this.prevBtn.style.opacity = this.currentSlide === 1 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentSlide === this.totalSlides ? '0.5' : '1';
    }

    // ==========================================
    // Modal Functions
    // ==========================================

    handleCardClick(e) {
        const card = e.target.closest('[data-modal]');
        if (!card) return;
        
        const modalType = card.getAttribute('data-modal');
        const modalData = this.getModalContent(modalType, card);
        
        if (modalData) {
            this.openModal(modalData);
        }
    }

    getModalContent(type, card) {
        // Get icon and title from the card
        const iconEl = card.querySelector('.feature-icon, .problem-icon, .solution-icon, .tech-icon, .benefit-icon, .metric-icon, .step-icon, .detail-icon, .item-icon, .spec-icon');
        const titleEl = card.querySelector('.feature-title, .problem-title, .solution-title, .tech-title, .benefit-title, .metric-title, .step-title, .detail-title, .item-title, .spec-title, h3, h4');
        const descEl = card.querySelector('.feature-desc, .problem-desc, .solution-desc, .tech-desc, .benefit-desc, .metric-desc, .step-desc, .detail-desc, .item-desc, .spec-desc, p');
        
        const icon = iconEl ? iconEl.textContent : '📌';
        const title = titleEl ? titleEl.textContent : 'Details';
        const desc = descEl ? descEl.textContent : '';
        
        // Get extended content from data attributes or generate based on type
        const extendedContent = card.getAttribute('data-content') || this.generateExtendedContent(type, title, desc);
        
        return {
            icon,
            title,
            content: extendedContent
        };
    }

    generateExtendedContent(type, title, desc) {
        // Detailed explanations from seminar content
        const detailedContent = {
            // Features (Slide 1)
            'AI Planning': 'MOBIX uses artificial intelligence to understand your preferences, budget, and travel style. The AI analyzes your behavior and generates personalized recommendations that improve over time. Instead of searching across multiple platforms, you interact with one intelligent assistant.',
            'Social Discovery': 'The app opens with a scrollable feed of published trips from other travelers. You can like, save, or remove trips - and MOBIX learns from every interaction. Travel discovery becomes as intuitive as social media.',
            'Smart Booking': 'Every recommendation is presented as a card with price, duration, rating, and AI explanation. You can save cards to build Travel Notes - fully customizable itineraries that become complete, bookable trips.',
            'Earn & Share': 'Users can publish their travel itineraries for others to book. Creators earn money from bookings, turning travelers into travel micro-agents. MOBIX enables a creator economy within travel.',
            
            // Problems (Slide 2)
            'Fragmented Planning': 'Travel planning today is scattered across many platforms. Users must manually compare flights, hotels, attractions, and transport separately. This leads to inefficiency and missed opportunities.',
            'Information Overload': 'Prices change constantly and are difficult to optimize. There\'s too much information to process, making decisions overwhelming and time-consuming.',
            'Missed Experiences': 'Travelers often miss experiences they didn\'t know existed. Traditional search only shows what you ask for, not what you might love.',
            'Time Consuming': 'Planning requires too many tools and too many decisions. What should be exciting becomes stressful and exhausting.',
            
            // Solutions (Slide 3)
            'Centralized Platform': 'MOBIX centralizes the entire travel process. Users interact with one AI assistant instead of multiple platforms. Everything happens inside one ecosystem.',
            'AI Understanding': 'The AI understands user preferences and explains its recommendations. It doesn\'t just search - it thinks. MOBIX reduces complexity by replacing search with intelligence.',
            'Complete Planning': 'MOBIX builds complete travel plans including transport, accommodation, attractions, and restaurants. Saved content becomes a complete, bookable itinerary.',
            
            // Flow Steps (Slide 4)
            'Create Profile': 'Users create a profile and set their preferences including budget, interests, and travel style. This forms the foundation for all AI recommendations.',
            'AI Analysis': 'The AI analyzes your profile data to understand your ideal travel experience. It considers budget constraints, preferred activities, and travel patterns.',
            'Interact': 'Users interact with the AI chatbot or discovery feed to explore options. The AI adapts to your intent and provides relevant suggestions.',
            'Save & Book': 'Save travel cards into Travel Notes. Your notes become a complete, customizable itinerary ready for booking.',
            
            // AI Modes (Slide 5)
            'Recommendation': 'Suggests destinations, hotels, restaurants, and attractions based on your profile and behavior. Every recommendation includes an explanation of why it matches you.',
            'Conversational': 'Natural conversation mode for questions like "who are you?" or "how does this work?". The AI responds naturally and helpfully.',
            'Trip Planning': 'Full itinerary mode with detailed cards and explanations. Covers transport, accommodation, activities, and return options in one comprehensive plan.',
            
            // Cards (Slide 6)
            'Travel Cards': 'Every recommendation is a visual card with essential details: price, duration, rating, and AI explanation. Cards are designed for quick scanning and easy decisions.',
            'Travel Notes': 'Saved cards form Travel Notes - your personal trip collection. Notes are fully customizable: reorder, remove, or add cards to build your perfect itinerary.',
            
            // Social Features (Slide 7)
            'Discovery Feed': 'A scrollable feed of published trips from other travelers. Browse journeys like social content - swipe, like, save. Perfect for inspiration.',
            'Social Learning': 'MOBIX learns from every interaction. Likes, saves, and scrolling patterns help the AI understand your preferences better over time.',
            
            // Personalization (Slide 8)
            'Learning System': 'MOBIX continuously learns from likes, saves, bookings, and travel behavior. The more you use it, the smarter it becomes.',
            'Refined Recommendations': 'AI refines destinations, budget ranges, and travel styles over time. Your feed becomes uniquely yours.',
            
            // Levels (Slide 9)
            'Bronze': 'Entry level for new users. Start your MOBIX journey and begin earning points through activity.',
            'Silver': 'Unlock better deals and priority recommendations. Earned through consistent platform engagement.',
            'Gold': 'Premium status with exclusive trips and special offers. Loyalty is rewarded with real value.',
            'Platinum': 'Top tier with maximum benefits. Best deals, first access to new features, and VIP support.',
            
            // Business (Slide 10)
            'Commissions': 'MOBIX earns commission on every booking made through the platform. A percentage of travel transactions flows to MOBIX.',
            'Subscriptions': 'Users pay for premium features through monthly subscriptions. Higher tiers unlock more AI power and creator tools.',
            'Marketplace': 'Creator marketplace fees from published itineraries. When travelers book creator trips, MOBIX takes a platform fee.',
            'B2B Services': 'Travel agencies, hotels, and restaurants pay for priority placement and conversational advertising inside AI recommendations.',
            
            // Pricing Tiers (Slide 11)
            'Free': 'Limited messages and itineraries. Perfect for trying MOBIX before committing.',
            'Traveler Plus': '€9.99/month - Unlimited AI usage and travel planning. For serious travelers who plan frequently.',
            'Traveler Premium': '€17.99/month - Monetize trips, create group travel, promotion tools. For travel creators and power users.',
            
            // Marketplace (Slide 12)
            'Creators': 'Publish your travel itineraries for others to discover and book. Earn money from every booking. Become a travel micro-agent.',
            'Travelers': 'Book curated trips from experienced travelers. Authentic itineraries from real journeys. Skip the planning, enjoy the travel.',
            
            // B2B (Slide 13)
            'Agency Promotion': 'Travel agencies promote offers directly through AI recommendations. Intent-based visibility reaches users when they\'re planning.',
            'Priority Placement': 'Hotels and restaurants pay for priority in recommendations. Conversational advertising feels natural, not intrusive.',
            
            // Revenue (Slide 14)
            'Subscription Revenue': 'At 100,000 users: approximately €515,000/month from premium subscriptions.',
            'Commission Revenue': 'At 100,000 users: approximately €640,000/month from booking commissions.',
            'B2B Revenue': 'At 100,000 users: approximately €180,000/month from business partnerships.',
            
            // Advantages (Slide 15)
            'Full Lifecycle': 'Complete travel lifecycle in one platform - from inspiration to booking to memory. No switching between apps.',
            'AI Transparency': 'AI explains every decision. You understand why something is recommended, not just what.',
            'Creator Economy': 'Unique social + marketplace model. Users become creators. Travel content has real value.',
            'Personalization': 'High personalization and retention. The platform adapts to you, not the other way around.',
            
            // Vision (Slide 16)
            'Travel Intelligence': 'From travel planning to travel intelligence. Not just organizing - understanding and anticipating.',
            'Discovery First': 'From searching to discovering. Let opportunities find you instead of hunting for them.',
            'User Creators': 'From users to creators. Everyone can share their travel expertise and earn from it.',
            'Ecosystem': 'From tool to ecosystem. MOBIX aims to become the operating system of modern travel.'
        };
        
        // Try to find matching detailed content
        const matchedContent = detailedContent[title] || detailedContent[title.trim()];
        
        if (matchedContent) {
            return `<p class="modal-detailed">${matchedContent}</p>`;
        }
        
        // Fallback to basic description
        return `<p>${desc}</p>`;
    }

    openModal(data) {
        this.modalIcon.textContent = data.icon;
        this.modalTitle.textContent = data.title;
        this.modalBody.innerHTML = data.content;
        this.modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.mobixApp = new MobixPresentation();
});
