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
        // Swipe navigation disabled to prevent accidental slide changes
        // Users can use navigation buttons instead
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
        // Detailed explanations from seminar content - EXACT titles from slides-data.js
        const detailedContent = {
            // ========== SLIDE 1: What is MOBIX? ==========
            'AI Assistant': 'MOBIX uses artificial intelligence to understand your preferences, budget, and travel style through natural conversation. Instead of searching across multiple platforms, you interact with one intelligent AI assistant that learns and improves with every interaction. The AI analyzes your behavior and generates personalized travel recommendations.',
            'Destinations': 'Discover perfect destinations matched to your interests. MOBIX suggests places you\'ll love based on your travel style - whether you prefer beaches, mountains, cities, or cultural experiences. Every destination recommendation includes pricing, best times to visit, and personalized reasons why it fits you.',
            'Travel Cards': 'Every recommendation is presented as a beautiful, organized Travel Card with essential details: price, duration, rating, and AI explanation. Cards contain destination highlights, best time to visit, budget estimates, top experiences, and local tips. Save cards to build your complete itinerary.',
            
            // ========== SLIDE 2: Problems ==========
            'Time-Consuming Planning': 'Travel planning today requires hours of manual research across multiple websites. Users must compare flights, hotels, and activities separately, leading to decision fatigue. What should be exciting becomes stressful and exhausting.',
            'Information Overload': 'There\'s too much information to process - endless reviews, conflicting recommendations, and constantly changing prices. Traditional platforms bombard users with options without helping them decide.',
            'Lack of Personalization': 'Generic travel packages don\'t match individual preferences. Current platforms show the same recommendations to everyone, ignoring your unique travel style, interests, and budget constraints.',
            'Fragmented Experience': 'Booking flights, hotels, and activities happens across different platforms without coordination. Users juggle multiple apps and tabs, with no unified view of their trip.',
            
            // ========== SLIDE 3: Solutions ==========
            'Conversational AI': 'MOBIX replaces fragmented search with natural conversation. Tell the AI about your dream trip in your own words - it understands context, preferences, and constraints. One conversation leads to a complete travel plan.',
            'Smart Recommendations': 'The AI doesn\'t just search - it thinks. It understands your preferences and explains why each recommendation matches you. Recommendations improve over time as MOBIX learns your travel patterns.',
            'All-in-One Platform': 'Everything from inspiration to booking in one place. No switching between apps or websites. MOBIX handles transport, accommodation, attractions, and restaurants in a unified experience.',
            
            // ========== SLIDE 4: How It Works ==========
            'Chat': 'Start by telling MOBIX about your dream trip in natural language. Describe where you want to go, your budget, interests, and travel dates. The AI understands context and asks clarifying questions.',
            'AI Process': 'The AI analyzes your input against your profile, past behavior, and real-time data. It considers budget constraints, preferred activities, and travel patterns to find the best matches.',
            'Get Cards': 'Receive organized Travel Cards with complete trip details. Each card shows price, duration, rating, and a personalized explanation of why it fits your preferences.',
            'Travel': 'Book directly through partner integrations. Your complete itinerary is ready - flights, accommodation, activities, and local recommendations all in one place.',
            
            // ========== SLIDE 5: AI Modes ==========
            'Inspire Mode': 'Not sure where to go? Inspire Mode suggests destinations based on your interests, budget, and travel style. Perfect for dreamers who want the AI to surprise them with possibilities they hadn\'t considered.',
            'Plan Mode': 'Have a destination in mind? Plan Mode creates detailed day-by-day itineraries with activities, restaurants, and hidden gems. Get a complete trip structure tailored to your preferences.',
            'Book Mode': 'Ready to travel? Book Mode connects you directly to booking partners for flights, hotels, and experiences. One-click booking from your finalized itinerary.',
            
            // ========== SLIDE 6: Cards & Notes ==========
            'Travel Notes': 'Saved cards form Travel Notes - your personal trip journal. Notes are fully customizable: reorder activities, remove items, or add new cards. Notes include day-by-day itinerary, personal recommendations, photo memories, expense tracking, and shareable format.',
            
            // ========== SLIDE 7: Social Discovery ==========
            'Community Feed': 'The app opens with a scrollable feed of published trips from travelers with similar interests. Browse journeys like social content - swipe, like, save. Travel discovery becomes as intuitive as Instagram.',
            'Creator Profiles': 'Follow travel experts and influencers who share their journeys. See their trip history, specialties, and ratings. Discover trusted voices for destination recommendations.',
            'Share & Inspire': 'Post your Travel Cards for others to use. Transform your travel experiences into content others can book. Build a following around your travel expertise.',
            'Travel Chat': 'Connect with fellow travelers heading to the same destinations. Get real-time tips, find travel buddies, or ask questions to locals and experts.',
            
            // ========== SLIDE 8: Personalization ==========
            'Preference Learning': 'Every interaction teaches the AI your travel style. Swipes, likes, saves, and bookings all contribute to understanding your preferences. MOBIX learns what you love without explicit configuration.',
            'Interest Tags': 'Adventure, culture, food, relaxation - the AI remembers your interests. Tags are automatically generated from your behavior and can be manually adjusted. They power increasingly accurate recommendations.',
            'Budget Awareness': 'MOBIX remembers your spending comfort zone. It won\'t suggest luxury resorts to budget travelers or hostels to luxury seekers. Budget learning happens automatically through your booking patterns.',
            
            // ========== SLIDE 9: User Levels ==========
            'Explorer': 'Entry level (0-500 XP) for new users. Includes basic AI features and 5 Travel Cards per month. Start earning XP through trips, shares, and reviews.',
            'Adventurer': 'Level 2 (500-2000 XP) with priority support and 15 Travel Cards per month. Unlock early access to new features and better deal visibility.',
            'Voyager': 'Level 3 (2000-5000 XP) with exclusive deals and unlimited Cards. Gain access to creator tools and start monetizing your travel expertise.',
            'Legend': 'Top tier (5000+ XP) with VIP experiences and revenue sharing. Get beta access to new features, maximum discounts, and premium support.',
            
            // ========== SLIDE 10: Business Model ==========
            'Subscriptions': 'Premium tiers for power travelers generate 40% of revenue. Users pay monthly for unlimited AI usage, creator tools, and exclusive features.',
            'Creator Marketplace': 'Commission on Travel Card sales generates 25% of revenue. When travelers book creator itineraries, MOBIX takes a platform fee while creators earn majority commission.',
            'B2B Partnerships': 'API and white-label solutions for enterprises generate 20% of revenue. Hotels, airlines, and travel agencies integrate MOBIX AI into their platforms.',
            'Affiliate Revenue': 'Booking partner commissions generate 15% of revenue. Every flight, hotel, and activity booked through MOBIX earns a percentage.',
            
            // ========== SLIDE 11: Subscription Tiers ==========
            'Free': 'Perfect for trying MOBIX. Includes 5 AI conversations per month, 3 Travel Cards, basic recommendations, and community access. No credit card required.',
            'Pro': '€19.99/month for power users and creators. Everything in Explorer plus unlimited Travel Cards, creator marketplace access, revenue sharing, API access, and white-label options.',
            
            // ========== SLIDE 12: Creator Marketplace ==========
            'For Creators': 'Publish your travel itineraries for others to discover and book. Earn 70% commission on every sale. Build your following with exclusive creator tools and analytics. Turn travel expertise into passive income.',
            'For Travelers': 'Access expert-curated itineraries from experienced travelers. One-click trip adoption saves hours of planning. Every recommendation is verified and reviewed. Authentic journeys from real trips.',
            
            // ========== SLIDE 13: B2B Solutions ==========
            'Hotels & Resorts': 'Integrate AI concierge into guest apps. Provide personalized local recommendations to guests. Promote on-site services through conversational AI. Increase guest satisfaction and ancillary revenue.',
            'Airlines': 'In-flight destination planning experience. Passengers can plan activities before landing. Promote airline partners and loyalty programs. Capture high-intent travel moments.',
            'Banks & Cards': 'Travel perks for premium cardholders. White-label MOBIX as a cardholder benefit. Track travel spending with AI insights. Increase card usage for travel purchases.',
            'OTAs': 'AI-powered travel recommendation API. Enhance existing platforms with MOBIX intelligence. Personalization layer for booking engines. Increase conversion and customer satisfaction.',
            
            // ========== SLIDE 14: Revenue Potential ==========
            'B2B Solutions': 'Enterprise solutions projected at €3.2M annually in Year 3. 50 enterprise clients averaging €64K/year for API access, white-label solutions, and custom integrations.',
            
            // ========== SLIDE 15: Competitive Advantages ==========
            'True AI Understanding': 'MOBIX doesn\'t just search keywords - it actually understands travel desires. Contextual comprehension of preferences, constraints, and intent. Competitors rely on keyword matching; MOBIX uses true AI understanding.',
            'Hyper-Personalization': 'Learning system that improves with every interaction. Your experience becomes uniquely yours over time. Competitors offer static recommendations; MOBIX adapts continuously.',
            'Social Layer': 'Community-driven discovery and sharing sets MOBIX apart. Travel meets social media in a unique feed experience. Competitors offer isolated, transactional experiences.',
            
            // ========== SLIDE 16: Vision Timeline ==========
            'The Idea': '2024 - Concept born from personal travel frustrations. Recognizing the gap between complex travel planning and modern AI capabilities.',
            'First Demo': '2025 - Working prototype developed independently. Core AI features proven with initial user testing and iteration.',
            'Full Version': '2026 - Complete platform with all features launched. Full social discovery, creator marketplace, and booking integrations.',
            'Expand': '2027 - Global reach and market leadership. Multi-language support, worldwide partnerships, and category leadership.'
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
