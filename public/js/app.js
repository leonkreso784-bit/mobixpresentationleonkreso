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
            'AI Assistant': 'The idea for MOBIX emerged from personal travel frustrations - realizing how complex, time-consuming, and exhausting travel planning can be. MOBIX is an AI-powered chatbot that creates fully personalized travel plans based on your preferences, budget, and interests. You only need to specify your destination and budget, while the platform handles transportation, accommodation, attractions, and recommendations - suggesting options you would never have considered on your own.',
            
            'Destinations': 'MOBIX suggests destinations based on your profile data including budget range, travel style, and personal interests. The AI analyzes thousands of options to find places that match YOUR preferences - not generic recommendations. Whether you prefer tropical beaches like the Maldives, cultural cities like Vienna, or adventure destinations - MOBIX finds your perfect match and explains WHY it suits you.',
            
            'Travel Cards': 'Travel Cards are the core output of MOBIX. Each card contains structured travel information: destination highlights, transportation options, accommodation suggestions, restaurants, and attractions. Before each group of cards, the AI explains why these options are suitable and which ones best match your preferences. Cards can be saved to Travel Notes to build complete, bookable itineraries.',
            
            // ========== SLIDE 2: Problems ==========
            'Time-Consuming Planning': 'Finding the cheapest and most efficient travel option is nearly impossible for individual travelers. Prices change daily, sometimes within hours. A real example: round-trip train tickets from Trieste to Lausanne were priced at 400 euros on one platform, while the same service on another offered tickets for almost half the price. This creates confusion and makes rational decision-making extremely difficult.',
            
            'Information Overload': 'Hotel prices vary significantly depending on demand, seasonality, and local events - factors impossible to fully understand without local knowledge. Travelers spend hours comparing prices and searching for information, often without confidence they made the best choice. Prices on different platforms for the same service can differ by 50% or more.',
            
            'Lack of Personalization': 'Current travel platforms show the same results to everyone. They don\'t understand that you prefer cultural experiences over nightlife, or that you\'re a budget traveler who values authenticity over luxury. Generic packages ignore individual preferences, travel styles, and budget constraints - treating all travelers the same.',
            
            'Fragmented Experience': 'Travel planning is scattered across many platforms - Google for information, Booking for hotels, Skyscanner for flights, TripAdvisor for reviews. Users must manually combine information across multiple systems, book separately on each platform, and keep track of everything themselves. There\'s no unified view of the complete trip.',
            
            // ========== SLIDE 3: Solutions ==========
            'Conversational AI': 'MOBIX centralizes the entire travel process. Instead of searching across multiple platforms, you interact with ONE intelligent AI assistant. Simply tell MOBIX: "Plan a trip from Rijeka to London" - and it generates structured travel cards containing transportation options (outbound and return), accommodation suggestions, restaurants, and attractions.',
            
            'Smart Recommendations': 'The AI doesn\'t just search - it THINKS and EXPLAINS. Before each recommendation, MOBIX tells you WHY this option is good and HOW it matches your preferences. This reduces user anxiety and increases trust. The system continuously learns from your interactions to improve future suggestions.',
            
            'All-in-One Platform': 'MOBIX integrates the entire travel lifecycle: discovery and inspiration → planning and itinerary creation → bookings and payments → travel-time guidance and reminders → post-trip sharing and monetization. Everything in one ecosystem - no switching between apps or losing track of details.',
            
            // ========== SLIDE 4: How It Works ==========
            'Chat': 'Input: You submit a question or request in natural language. Example: "I want a beach vacation under €1000" or "Plan 5 days in Barcelona". The AI understands context - your budget constraints, preferred activities, travel dates, and personal interests from your profile.',
            
            'AI Process': 'Processing: Your request is sent to the AI model which analyzes it against your profile data, past behavior, and real-time availability. The system considers budget range, travel style, interests, and preferences to find the best possible matches from thousands of options.',
            
            'Get Cards': 'Output: The AI returns organized Travel Cards with structured information. Each card shows price, duration, rating, and a personalized explanation. Cards cover: transportation (flights, trains, buses), accommodation (hotels, apartments), restaurants, and attractions. Save any card to your Travel Notes.',
            
            'Travel': 'Once Travel Notes are finalized, you can book all services directly within MOBIX. The long-term vision: pay once for everything and receive a confirmation email with booking details and check-in links for flights, trains, or buses. Complete trip coordination in one platform.',
            
            // ========== SLIDE 5: AI Modes ==========
            'Inspire Mode': 'RECOMMENDATION MODE: The chatbot acts as a personalized travel advisor. Based on your profile data - budget range, travel style, interests, preferences - it suggests destinations and attractions you might love. Every recommendation includes an explanation of WHY it matches you. Perfect when you\'re not sure where to go.',
            
            'Plan Mode': 'TRIP PLANNING MODE: The most advanced mode. Request complete travel plans like "Plan a trip from Rijeka to London" and receive structured cards containing: transportation (outbound + return), accommodation, restaurants, and attractions. The AI provides explanations before each group showing which options best match your preferences.',
            
            'Book Mode': 'CONVERSATIONAL MODE + BOOKING: Handles both casual questions ("Who are you?", "How does this work?") and booking requests. When ready to travel, connect directly to booking partners for flights, hotels, and experiences. One-click booking from your finalized Travel Notes.',
            
            // ========== SLIDE 6: Cards & Notes ==========
            'Travel Notes': 'Saved cards form Travel Notes - your personal itinerary collection. Notes are fully customizable: reorder items, remove what you don\'t want, add new cards. Once finalized, Travel Notes become complete, bookable itineraries. MOBIX enables end-to-end booking where you pay once and receive all confirmations. Travel Notes can also be PUBLISHED for others to book - turning your travel expertise into income.',
            
            // ========== SLIDE 7: Social Discovery ==========
            'Community Feed': 'Upon opening MOBIX, users see a dynamic discovery feed - published travel itineraries from other users, verified creators, and partners. A vertical, scroll-based experience like modern social platforms. Each itinerary appears as a rich card with destination highlights, budget, duration, and travel style. Discovery becomes inspirational, not task-driven.',
            
            'Creator Profiles': 'Users can follow travel experts and influencers who share their journeys. See their trip history, specialties, and ratings. This creates TRUST - you\'re not following anonymous reviews, but real travelers whose taste you understand. Creators build audiences around their travel expertise.',
            
            'Share & Inspire': 'Users can PUBLISH their Travel Cards for others to use. Transform travel experiences into monetizable content. A key innovation: treating a travel plan as a digital product. MOBIX enables a "travel creator economy" where users earn money from their published itineraries.',
            
            'Travel Chat': 'Connect with fellow travelers. Get real-time tips from people heading to the same destinations. Find travel buddies for group trips. Ask questions to locals and experts. This social layer creates engagement and community - something competitors completely lack.',
            
            // ========== SLIDE 8: Personalization ==========
            'Preference Learning': 'Every interaction is a data signal. When you like itineraries, remove content, save trips, or open detailed views - MOBIX analyzes these actions to refine your profile. The platform evolves from reactive recommendations to anticipatory intelligence, where content feels increasingly personal. The more you use it, the smarter it becomes.',
            
            'Smart Recommendations': 'MOBIX collects structured preference and intent data through: onboarding surveys, profile settings, saved cards, Travel Notes customization, and behavioral signals. This improves personalization quality over time. The result: a self-reinforcing loop where the platform adapts uniquely to each user.',
            
            'Interest Tags': 'The AI categorizes your preferences: Adventure, Culture, Food, Relaxation, Luxury, Budget, Family, Solo, etc. Tags are automatically generated from behavior but can be manually adjusted. They power recommendation matching - ensuring you see content aligned with YOUR travel personality.',
            
            'Budget Awareness': 'MOBIX learns your spending comfort zone from booking patterns and interactions. It won\'t suggest €500/night hotels to budget travelers, or hostels to luxury seekers. Budget matching is automatic and continuous - your price range becomes part of every recommendation.',
            
            // ========== SLIDE 9: User Levels ==========
            'Explorer': 'Level 1 (0-500 XP): Entry level for new users. Basic AI features, 5 Travel Cards/month. Earn XP through: completing trips, sharing cards, writing reviews, referring friends. Start your MOBIX journey and unlock increasingly valuable benefits.',
            
            'Adventurer': 'Level 2 (500-2000 XP): Priority support and 15 Travel Cards/month. Unlock early access to new features and better deal visibility. Earned through consistent platform engagement - rewarding active travelers.',
            
            'Voyager': 'Level 3 (2000-5000 XP): Exclusive deals and unlimited Cards. Gain access to creator tools - start publishing your own itineraries and monetizing your travel expertise. This is where users become creators.',
            
            'Legend': 'Level 4 (5000+ XP): Top tier with VIP experiences and revenue sharing. Get beta access to new features, maximum discounts, premium support, and invitations to curated group trips. Loyalty has direct economic and experiential value.',
            
            // ========== SLIDE 10: Business Model ==========
            'Subscriptions': 'Subscriptions generate 40% of revenue. Tiered pricing: Free (€0), Traveler Plus (€9.99/month), Traveler Premium (€17.99/month). Higher tiers unlock unlimited AI usage, creator marketplace access, and monetization tools. Subscriptions stabilize cash flow and fund AI infrastructure.',
            
            'Creator Marketplace': 'Marketplace fees generate 25% of revenue. Creators publish itineraries, travelers book them. MOBIX takes a platform fee (15-30%) while creators earn the remainder. Itineraries priced €2.99-€19.99 each. This turns users into distribution channels - powerful network effects.',
            
            'B2B Partnerships': 'B2B solutions generate 20% of revenue. Travel agencies upload offers into MOBIX\'s database - the AI recommends them when relevant. This replaces generic advertising with intent-based matching. Pricing: base subscription €499-€2,999/month plus performance fees per booking.',
            
            'Affiliate Revenue': 'Booking commissions generate 15% of revenue. Hotels earn 12-18% commission, flights 3-6%, experiences 10-20%. Unlike standard booking sites, MOBIX\'s conversion funnel is superior: personalized filtering + AI explanations + saved plans = higher conversion rates than search-only platforms.',
            
            // ========== SLIDE 11: Subscription Tiers ==========
            'Free': 'MOBIX Explorer (€0): 20 AI messages/month, 1 itinerary/day, 30 travel cards/day, limited Travel Notes storage. Provides real value but pushes heavy users to upgrade. Goal: mass acquisition and habit formation with low friction.',
            
            'Explorer': 'MOBIX Traveler Plus (€9.99/month or €99/year): Unlimited AI messages, unlimited itineraries, unlimited cards, full Travel Notes sync, faster responses, advanced personalization. Engineered as the "default paid plan" - affordable for students and frequent travelers.',
            
            'Pro': 'MOBIX Traveler Premium (€17.99/month or €179/year): Everything in Plus + ability to EARN MONEY from published itineraries + group trip creation + analytics dashboard + promotion tools + verification badge. Transforms users into marketplace participants.',
            
            // ========== SLIDE 12: Creator Marketplace ==========
            'For Creators': 'Publish your travel itineraries as digital products. Earn 70% commission on every sale (MOBIX takes 30%). Build your following with exclusive creator tools and analytics dashboard showing views, saves, and conversion estimates. Effectively become a travel micro-agent - turning expertise into passive income.',
            
            'For Travelers': 'Access expert-curated itineraries from experienced travelers. One-click trip adoption: see an itinerary you love → adopt it → customize it → book it. Save hours of planning with verified, reviewed recommendations. Authentic journeys from real trips - not generic package deals.',
            
            // ========== SLIDE 13: B2B Solutions ==========
            'Hotels & Resorts': 'Integrate MOBIX AI concierge into guest apps. Provide personalized local recommendations. "Conversational advertising" - promote on-site services naturally through AI recommendations. Pricing: API Access €500/month, White Label €2,000/month, Enterprise custom.',
            
            'Airlines': 'In-flight destination planning experience. Passengers plan activities while flying. Promote airline partners and loyalty programs. Capture HIGH-INTENT travel moments when users are actively thinking about their trip. New revenue channel through contextual recommendations.',
            
            'Banks & Cards': 'Travel perks for premium cardholders. White-label MOBIX as a cardholder benefit - exclusive AI travel planning for your customers. Track travel spending with AI insights. Increase card usage for travel purchases through integrated booking.',
            
            'OTAs': 'AI-powered recommendation API for existing platforms. Add MOBIX\'s personalization layer to your booking engine. Increase conversion rates through intelligent matching. Replace static search with dynamic, explained recommendations.',
            
            // ========== SLIDE 14: Revenue Potential ==========
            'Subscriptions': 'At 100K monthly active users: 30% on Plus (30,000 × €9.99 = €299,700/month) + 12% on Premium (12,000 × €17.99 = €215,880/month) = €515,580/month subscription revenue.',
            
            'Creator Marketplace': 'Platform facilitation fee (15-30%) on creator sales. As creators publish and travelers book, marketplace GMV grows. Strong network effects: creators bring users, users become creators, content increases platform value without MOBIX producing it.',
            
            'B2B Solutions': '80 agencies/hotels on average plans (80 × €1,500/month = €120,000) + sponsored campaigns (€60,000/month) = €180,000/month B2B revenue. High-margin growth from enterprise clients.',
            
            'Affiliate Revenue': 'At 100K users: 42,000 paid users, 28% booking rate = 11,760 bookings/month. Average booking €520 × 10.5% commission = €642,096/month. Total monthly revenue potential: €1,337,676 (~€16M annually).',
            
            // ========== SLIDE 15: Competitive Advantages ==========
            'True AI Understanding': 'Most platforms do keyword matching. MOBIX does COMPREHENSION. It understands travel desires, constraints, context, and explains decisions. Google = information, Booking = accommodation, Skyscanner = flights. MOBIX integrates everything into one intelligent workflow: intent → cards → Travel Notes → booking → reminders → sharing.',
            
            'Hyper-Personalization': 'Competitors offer static recommendations - same results for everyone. MOBIX builds a learning system that improves with EVERY interaction. First-party intent data from profiles, saved cards, and Travel Notes customization creates a data advantage that competitors can\'t match.',
            
            'All-in-One Platform': 'Competitors: fragmented tools. MOBIX: complete journey orchestration. Unlike standard booking sites where users are overloaded with options, MOBIX filters choices, explains why they\'re good, transforms results into saved plans, and keeps users in a single flow with less drop-off.',
            
            'Social Layer': 'Competitors don\'t financially incentivize users to produce and distribute itineraries. MOBIX turns users into CREATORS, and creators into distribution channels. Community-driven discovery + monetization + social sharing = network effects no competitor has.',
            
            // ========== SLIDE 16: Vision Timeline ==========
            'The Idea': '2024: Concept born from personal travel frustrations. Constantly searching for affordable routes, comparing platforms with 50%+ price differences, missing attractions I didn\'t know existed. The core question: What if an AI-powered platform could plan trips FOR me?',
            
            'First Demo': '2025: Working prototype developed independently during night shifts as a hotel receptionist. Evolved from 2 files to 125+ files and 40,000+ lines of code. Backend: Python, FastAPI, PostgreSQL. Frontend: HTML5, CSS3, JavaScript. AI: OpenAI GPT-4. Infobip requested a meeting after seeing the demo.',
            
            'Full Version': '2026: Complete platform with all features. Full social discovery feed, creator marketplace with monetization, end-to-end booking integration. Travel agency licensing and legal compliance complete. Ready for scaling.',
            
            'Expand': '2027: Global reach and market leadership. Multi-language support, worldwide booking partnerships, enterprise B2B clients. Vision: MOBIX as the "operating system of modern travel" - not just a tool, but a living digital ecosystem.'
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
