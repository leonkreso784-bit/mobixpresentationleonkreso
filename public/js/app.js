/* =============================================
   MOBIX Presentation - Main Application
   Socket.io Client & Presentation Logic
   ============================================= */

class MobixPresentation {
    constructor() {
        this.socket = null;
        this.isAdmin = false;
        this.currentSlide = 1;
        this.totalSlides = slidesData.length;
        this.isTransitioning = false;
        this.offlineMode = false;
        
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.updateProgressBar();
        this.checkSavedSession();
    }

    cacheElements() {
        // Login elements
        this.loginScreen = document.getElementById('loginScreen');
        this.codeInputs = document.querySelectorAll('.code-input');
        this.loginBtn = document.getElementById('loginBtn');
        this.loginError = document.getElementById('loginError');
        
        // Presentation elements
        this.presentationContainer = document.getElementById('presentationContainer');
        this.slidesContainer = document.getElementById('slidesContainer');
        this.adminControls = document.getElementById('adminControls');
        this.viewerIndicator = document.getElementById('viewerIndicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.slideNumber = document.getElementById('slideNumber');
        this.progressFill = document.getElementById('progressFill');
        
        // Logout buttons
        this.logoutBtnAdmin = document.getElementById('logoutBtnAdmin');
        this.logoutBtnViewer = document.getElementById('logoutBtnViewer');
        
        // Loading overlay
        this.loadingOverlay = document.getElementById('loadingOverlay');
    }

    bindEvents() {
        // Login button click
        this.loginBtn.addEventListener('click', () => this.handleLogin());
        
        // Code input handling
        this.codeInputs.forEach((input, index) => {
            input.addEventListener('input', (e) => this.handleCodeInput(e, index));
            input.addEventListener('keydown', (e) => this.handleCodeKeydown(e, index));
            input.addEventListener('paste', (e) => this.handleCodePaste(e));
        });
        
        // Navigation buttons (admin only)
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Logout buttons
        this.logoutBtnAdmin?.addEventListener('click', () => this.handleLogout());
        this.logoutBtnViewer?.addEventListener('click', () => this.handleLogout());
        
        // Keyboard navigation (admin only)
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Enter key on login
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !this.presentationContainer.classList.contains('active')) {
                this.handleLogin();
            }
        });
    }

    // ==========================================
    // Session Management
    // ==========================================

    checkSavedSession() {
        const savedCode = localStorage.getItem('mobix_session_code');
        if (savedCode) {
            this.connectSocket(savedCode);
        }
    }

    saveSession(code) {
        localStorage.setItem('mobix_session_code', code);
    }

    clearSession() {
        localStorage.removeItem('mobix_session_code');
    }

    handleLogout() {
        this.clearSession();
        if (this.socket) {
            this.socket.disconnect();
        }
        // Reset UI
        this.presentationContainer.classList.remove('active');
        this.adminControls.classList.remove('active');
        this.viewerIndicator.classList.remove('active');
        this.loginScreen.classList.add('active');
        // Clear code inputs
        this.codeInputs.forEach(input => input.value = '');
        this.codeInputs[0].focus();
    }

    // ==========================================
    // Code Input Handlers
    // ==========================================

    handleCodeInput(e, index) {
        const input = e.target;
        const value = input.value;
        
        // Only allow numbers
        input.value = value.replace(/[^0-9]/g, '');
        
        // Auto-focus next input
        if (input.value.length === 1 && index < this.codeInputs.length - 1) {
            this.codeInputs[index + 1].focus();
        }
        
        // Clear error on input
        this.loginError.textContent = '';
    }

    handleCodeKeydown(e, index) {
        // Handle backspace - go to previous input
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            this.codeInputs[index - 1].focus();
        }
        
        // Handle arrow keys
        if (e.key === 'ArrowLeft' && index > 0) {
            this.codeInputs[index - 1].focus();
        }
        if (e.key === 'ArrowRight' && index < this.codeInputs.length - 1) {
            this.codeInputs[index + 1].focus();
        }
    }

    handleCodePaste(e) {
        e.preventDefault();
        const paste = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
        
        paste.split('').forEach((char, i) => {
            if (this.codeInputs[i]) {
                this.codeInputs[i].value = char;
            }
        });
        
        // Focus last filled input or next empty
        const lastIndex = Math.min(paste.length - 1, this.codeInputs.length - 1);
        this.codeInputs[lastIndex].focus();
    }

    // ==========================================
    // Login & Socket Connection
    // ==========================================

    handleLogin() {
        const code = Array.from(this.codeInputs).map(input => input.value).join('');
        
        if (code.length !== 4) {
            this.showError('Please enter all 4 digits');
            return;
        }
        
        this.connectSocket(code);
    }

    connectSocket(code) {
        // Access codes - validated locally for offline mode
        const ADMIN_CODE = '1543';
        const VIEWER_CODE = '0000';
        
        // First try local validation (works offline/Vercel)
        if (code === ADMIN_CODE) {
            this.isAdmin = true;
            this.offlineMode = true;
            this.currentSlide = parseInt(localStorage.getItem('mobix_current_slide')) || 1;
            this.saveSession(code);
            this.startPresentation();
            console.log('Offline mode: Admin access granted');
            return;
        } else if (code === VIEWER_CODE) {
            this.isAdmin = false;
            this.offlineMode = true;
            this.currentSlide = parseInt(localStorage.getItem('mobix_current_slide')) || 1;
            this.saveSession(code);
            this.startPresentation();
            console.log('Offline mode: Viewer access granted');
            return;
        }
        
        // Invalid code
        this.showError('Invalid access code');
        this.clearSession();
    }

    showError(message) {
        this.loginError.textContent = message;
        this.loginError.classList.add('shake');
        setTimeout(() => this.loginError.classList.remove('shake'), 500);
    }

    // ==========================================
    // Presentation Control
    // ==========================================

    startPresentation() {
        // Hide login, show presentation
        this.loginScreen.classList.remove('active');
        this.presentationContainer.classList.add('active');
        
        // Show appropriate controls
        if (this.isAdmin) {
            this.adminControls.classList.add('active');
        } else {
            this.viewerIndicator.classList.add('active');
        }
        
        // Hide loading overlay
        setTimeout(() => {
            this.loadingOverlay.classList.add('fade-out');
        }, 500);
        
        // Render initial slide
        this.renderSlide(this.currentSlide);
    }

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
        
        // Update UI
        this.updateSlideNumber();
        this.updateProgressBar();
        this.updateNavButtons();
        
        // Trigger stagger animations
        setTimeout(() => {
            slideElement.querySelectorAll('.stagger-animation').forEach(el => {
                el.classList.add('animate');
            });
        }, 100);
    }

    goToSlide(slideNumber, animate = true) {
        if (this.isTransitioning) return;
        if (slideNumber < 1 || slideNumber > this.totalSlides) return;
        
        if (animate && slideNumber !== this.currentSlide) {
            this.isTransitioning = true;
            
            // Show loading animation with logo
            this.showSlideTransition(() => {
                this.currentSlide = slideNumber;
                this.renderSlide(this.currentSlide);
                
                // Save current slide to localStorage
                localStorage.setItem('mobix_current_slide', this.currentSlide);
                
                setTimeout(() => {
                    this.isTransitioning = false;
                }, 300);
            });
        } else {
            this.currentSlide = slideNumber;
            this.renderSlide(this.currentSlide);
            localStorage.setItem('mobix_current_slide', this.currentSlide);
        }
    }

    showSlideTransition(callback) {
        // Quick flash transition with logo
        const transition = document.createElement('div');
        transition.className = 'slide-transition-overlay';
        transition.innerHTML = `
            <div class="transition-content">
                <img src="assets/logo.png" alt="MOBIX" class="transition-logo">
            </div>
        `;
        document.body.appendChild(transition);
        
        // Fade in
        setTimeout(() => transition.classList.add('active'), 10);
        
        // Execute callback
        setTimeout(() => {
            callback();
            
            // Fade out
            setTimeout(() => {
                transition.classList.remove('active');
                setTimeout(() => transition.remove(), 300);
            }, 200);
        }, 300);
    }

    nextSlide() {
        if (!this.isAdmin) return;
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    prevSlide() {
        if (!this.isAdmin) return;
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    handleKeyboard(e) {
        if (!this.isAdmin) return;
        if (!this.presentationContainer.classList.contains('active')) return;
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
            case 'PageDown':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                this.prevSlide();
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

    // ==========================================
    // UI Updates
    // ==========================================

    updateSlideNumber() {
        if (this.slideNumber) {
            this.slideNumber.textContent = `${this.currentSlide} / ${this.totalSlides}`;
        }
    }

    updateProgressBar() {
        if (this.progressFill) {
            const progress = (this.currentSlide / this.totalSlides) * 100;
            this.progressFill.style.width = `${progress}%`;
        }
    }

    updateNavButtons() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide === 1;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide === this.totalSlides;
        }
    }
}

// ==========================================
// Modal Data for Clickable Elements
// ==========================================

const modalData = {
    // ========== SLIDE 1: Title Slide Features ==========
    'AI Assistant': {
        title: '🤖 AI Assistant',
        content: `
            <p><strong>Intelligent Chat-Based Travel Planning</strong></p>
            <p>MOBIX features a sophisticated AI chatbot powered by GPT-4 that operates in three distinct modes:</p>
            <ul>
                <li><strong>Recommendation Mode:</strong> Suggests destinations, restaurants, and hotels based on your profile preferences</li>
                <li><strong>Conversational Mode:</strong> Natural dialogue for questions like "Who are you?" or travel advice</li>
                <li><strong>Trip Planning Mode:</strong> Creates complete itineraries from a single request like "Plan a trip from Rijeka to London"</li>
            </ul>
            <p>The AI explains <em>why</em> each recommendation is suitable for you, building trust and confidence in your choices.</p>
        `
    },
    'Destinations': {
        title: '📍 Destinations',
        content: `
            <p><strong>Discover Your Perfect Destination</strong></p>
            <p>MOBIX integrates with multiple APIs to provide comprehensive destination data:</p>
            <ul>
                <li><strong>Google Places API:</strong> Real-time data on restaurants, attractions, and local businesses</li>
                <li><strong>Amadeus API:</strong> Flight search and hotel pricing from official GDS systems</li>
                <li><strong>Local Insights:</strong> Hidden gems and off-the-beaten-path locations from our creator community</li>
            </ul>
            <p>Unlike generic search results, MOBIX learns your preferences to filter and prioritize destinations that truly match your travel style.</p>
        `
    },
    'Travel Cards': {
        title: '✈️ Travel Cards',
        content: `
            <p><strong>Organized Trip Details at Your Fingertips</strong></p>
            <p>Travel Cards are MOBIX's innovative way to present travel information:</p>
            <ul>
                <li><strong>Transport Cards:</strong> Flights, trains, buses with prices and schedules</li>
                <li><strong>Accommodation Cards:</strong> Hotels and apartments with ratings and amenities</li>
                <li><strong>Experience Cards:</strong> Restaurants, attractions, and activities</li>
                <li><strong>Itinerary Cards:</strong> Complete day-by-day plans</li>
            </ul>
            <p>Each card can be saved to your Travel Notes, shared with friends, or even sold on the Creator Marketplace!</p>
        `
    },
    
    // ========== SLIDE 2: Problem Cards ==========
    'Time-Consuming Planning': {
        title: '⏱️ Time-Consuming Planning',
        content: `
            <p><strong>The Hidden Cost of Travel Research</strong></p>
            <p>Studies show travelers spend an average of <strong>40+ hours</strong> planning a single trip:</p>
            <ul>
                <li>Comparing flight prices across 5-10 different websites</li>
                <li>Reading hundreds of hotel reviews to find the right fit</li>
                <li>Researching "best things to do" in each destination</li>
                <li>Creating spreadsheets to track bookings and reservations</li>
            </ul>
            <p><strong>Real Example:</strong> Finding train tickets from Trieste to Lausanne varied from €400 on Rail Europe to €200 on Trenitalia — same journey, double the price, hours of research to discover.</p>
        `
    },
    'Information Overload': {
        title: '🌐 Information Overload',
        content: `
            <p><strong>Too Many Options, Too Much Noise</strong></p>
            <p>The internet has made travel accessible but also overwhelming:</p>
            <ul>
                <li><strong>Choice Paralysis:</strong> 50+ hotels in any city make decisions harder, not easier</li>
                <li><strong>Conflicting Reviews:</strong> "Best restaurant ever!" vs "Terrible experience" — who to trust?</li>
                <li><strong>Paid Placements:</strong> Top results are often ads, not genuine recommendations</li>
                <li><strong>Outdated Information:</strong> Blog posts from 2019 recommending closed restaurants</li>
            </ul>
            <p>MOBIX cuts through the noise with AI-curated, personalized recommendations you can trust.</p>
        `
    },
    'Lack of Personalization': {
        title: '🎯 Lack of Personalization',
        content: `
            <p><strong>Generic Recommendations for Everyone</strong></p>
            <p>Current travel platforms treat all travelers the same:</p>
            <ul>
                <li>Same "Top 10 Things to Do" lists for adventure seekers and culture lovers alike</li>
                <li>Budget travelers shown luxury hotels because they're "most popular"</li>
                <li>Food enthusiasts recommended tourist trap restaurants</li>
                <li>No understanding of your actual travel style, interests, or constraints</li>
            </ul>
            <p><strong>MOBIX Solution:</strong> Our AI builds a complete profile through onboarding and learns from every interaction, ensuring recommendations are truly personalized.</p>
        `
    },
    'Fragmented Experience': {
        title: '📱 Fragmented Experience',
        content: `
            <p><strong>The App Juggling Problem</strong></p>
            <p>Average travelers use 8+ different platforms for a single trip:</p>
            <ul>
                <li><strong>Research:</strong> Google, TripAdvisor, travel blogs</li>
                <li><strong>Flights:</strong> Skyscanner, Google Flights, airline websites</li>
                <li><strong>Accommodation:</strong> Booking.com, Airbnb, Hotels.com</li>
                <li><strong>Activities:</strong> GetYourGuide, Viator, local websites</li>
                <li><strong>Navigation:</strong> Google Maps, Citymapper</li>
                <li><strong>Organization:</strong> Notes app, spreadsheets, WhatsApp groups</li>
            </ul>
            <p><strong>Result:</strong> Scattered bookings, missed connections, and the constant fear of forgetting something important.</p>
        `
    },
    
    // ========== SLIDE 3: Solution Cards ==========
    'Conversational AI': {
        title: '💬 Conversational AI',
        content: `
            <p><strong>Natural Language Travel Planning</strong></p>
            <p>Simply tell MOBIX what you want in plain English:</p>
            <ul>
                <li>"I want a beach vacation under €1,000"</li>
                <li>"Plan 5 days in Barcelona for a foodie couple"</li>
                <li>"Find me a quiet cabin in the mountains next weekend"</li>
            </ul>
            <p><strong>How It Works:</strong></p>
            <ul>
                <li>GPT-4 powered understanding of complex requests</li>
                <li>Context-aware follow-up questions to refine your needs</li>
                <li>Multi-turn conversations that remember your preferences</li>
            </ul>
        `
    },
    'Smart Recommendations': {
        title: '🧠 Smart Recommendations',
        content: `
            <p><strong>AI That Actually Understands You</strong></p>
            <p>MOBIX collects structured preference data through:</p>
            <ul>
                <li><strong>Onboarding Survey:</strong> Budget range, travel style, interests</li>
                <li><strong>Profile Settings:</strong> Dietary requirements, accessibility needs</li>
                <li><strong>Behavioral Data:</strong> Which cards you save, what you skip</li>
                <li><strong>Travel History:</strong> Past trips to understand your patterns</li>
            </ul>
            <p><strong>The Result:</strong> Recommendations that improve over time, with the AI explaining exactly why each option was chosen for you.</p>
        `
    },
    'All-in-One Platform': {
        title: '🔗 All-in-One Platform',
        content: `
            <p><strong>From Inspiration to Booking in One Place</strong></p>
            <p>MOBIX is designed as a <strong>Travel Operating System</strong>:</p>
            <ul>
                <li><strong>Discovery:</strong> Get inspired by destinations and experiences</li>
                <li><strong>Planning:</strong> Create detailed itineraries with Travel Cards</li>
                <li><strong>Booking:</strong> Reserve everything directly through the platform</li>
                <li><strong>During Travel:</strong> Real-time reminders and guidance</li>
                <li><strong>After Travel:</strong> Share experiences and earn from your content</li>
            </ul>
            <p>One account, one platform, complete travel management.</p>
        `
    },
    
    // ========== SLIDE 4: Flow Steps ==========
    'Chat': {
        title: '💭 Chat',
        content: `
            <p><strong>Start With a Simple Conversation</strong></p>
            <p>No complicated forms or filters — just tell MOBIX about your dream trip:</p>
            <ul>
                <li>Describe your ideal vacation in your own words</li>
                <li>Mention your budget, dates, and must-haves</li>
                <li>Ask questions and get instant answers</li>
            </ul>
            <p>The AI assistant guides you through the process, asking clarifying questions when needed.</p>
        `
    },
    'AI Process': {
        title: '🤖 AI Process',
        content: `
            <p><strong>Intelligent Analysis Behind the Scenes</strong></p>
            <p>When you make a request, MOBIX's AI:</p>
            <ul>
                <li>Parses your natural language input</li>
                <li>Cross-references with your preference profile</li>
                <li>Queries multiple APIs (Google Places, Amadeus)</li>
                <li>Filters and ranks options based on relevance</li>
                <li>Generates personalized explanations for each recommendation</li>
            </ul>
            <p><strong>Technology:</strong> FastAPI backend, GPT-4 reasoning, PostgreSQL database.</p>
        `
    },
    'Get Cards': {
        title: '🗂️ Get Cards',
        content: `
            <p><strong>Receive Organized Travel Cards</strong></p>
            <p>Your AI-generated itinerary is presented as beautiful, actionable cards:</p>
            <ul>
                <li><strong>Outbound Transport:</strong> Best flight/train options with prices</li>
                <li><strong>Accommodation:</strong> Hotels matching your budget and style</li>
                <li><strong>Daily Activities:</strong> Restaurants, attractions, experiences</li>
                <li><strong>Return Transport:</strong> Complete your trip planning</li>
            </ul>
            <p>Each card can be added to your Travel Notes for a complete, customizable itinerary.</p>
        `
    },
    'Travel': {
        title: '✈️ Travel',
        content: `
            <p><strong>Book and Go!</strong></p>
            <p>Once your Travel Notes are finalized:</p>
            <ul>
                <li>Book all services with a single payment</li>
                <li>Receive confirmation emails with check-in links</li>
                <li>Access your itinerary offline during travel</li>
                <li>Get real-time reminders for scheduled activities</li>
            </ul>
            <p><strong>Future Vision:</strong> Full end-to-end booking as a licensed digital travel agency.</p>
        `
    },
    
    // ========== SLIDE 5: AI Modes ==========
    'Inspire Mode': {
        title: '💡 Inspire Mode',
        content: `
            <p><strong>Not Sure Where to Go?</strong></p>
            <p>Let MOBIX inspire you based on your preferences:</p>
            <ul>
                <li>Budget-based destination suggestions</li>
                <li>Seasonal recommendations (best time to visit)</li>
                <li>Interest-matching (adventure, culture, relaxation)</li>
                <li>Hidden gems you've never considered</li>
            </ul>
            <p><strong>Example:</strong> "I have €800 and want a warm beach destination in March" → AI suggests: Tenerife, Marrakech, Algarve with pros and cons for each.</p>
        `
    },
    'Plan Mode': {
        title: '🗺️ Plan Mode',
        content: `
            <p><strong>Have a Destination? Let's Plan It!</strong></p>
            <p>MOBIX creates comprehensive day-by-day itineraries:</p>
            <ul>
                <li>Optimal route planning within the city</li>
                <li>Restaurant recommendations near each attraction</li>
                <li>Hidden gems locals love but tourists miss</li>
                <li>Backup options for bad weather</li>
            </ul>
            <p><strong>Example:</strong> "Plan 5 days in Barcelona" → AI creates: Day 1 Gothic Quarter, Day 2 Gaudí tour, Day 3 Beach & Barceloneta, Day 4 Montjuïc, Day 5 Day trip to Montserrat.</p>
        `
    },
    'Book Mode': {
        title: '🎫 Book Mode',
        content: `
            <p><strong>Ready to Go? Book Everything at Once!</strong></p>
            <p>Connect directly to booking partners:</p>
            <ul>
                <li>Flights through Amadeus GDS integration</li>
                <li>Hotels via Booking.com and Airbnb partnerships</li>
                <li>Experiences through GetYourGuide and local providers</li>
                <li>Transport via official train and bus APIs</li>
            </ul>
            <p><strong>Commission Model:</strong> MOBIX earns 10-18% from accommodations, 3-6% from flights, 10-20% from experiences — all transparent to users.</p>
        `
    },
    
    // ========== SLIDE 6: Cards ==========
    'Travel Cards': {
        title: '🗂️ Travel Cards',
        content: `
            <p><strong>Your Trip, Beautifully Organized</strong></p>
            <p>Travel Cards are the core innovation of MOBIX:</p>
            <ul>
                <li><strong>Visual Format:</strong> Beautiful, scannable summaries of each travel element</li>
                <li><strong>Smart Data:</strong> Real-time prices, availability, and ratings</li>
                <li><strong>Actionable:</strong> Book directly from any card</li>
                <li><strong>Shareable:</strong> Send to friends or publish for the community</li>
                <li><strong>Monetizable:</strong> Sell your cards on the Creator Marketplace</li>
            </ul>
            <p>Think of them as "travel playlists" — curated collections you can save, share, and remix.</p>
        `
    },
    'Travel Notes': {
        title: '📝 Travel Notes',
        content: `
            <p><strong>Your Personal Travel Journal</strong></p>
            <p>Travel Notes combine multiple cards into complete itineraries:</p>
            <ul>
                <li><strong>Day-by-Day View:</strong> See your entire trip at a glance</li>
                <li><strong>Drag & Drop:</strong> Rearrange activities easily</li>
                <li><strong>Budget Tracking:</strong> Running total of all costs</li>
                <li><strong>Sync Across Devices:</strong> Access anywhere, anytime</li>
                <li><strong>Offline Access:</strong> Download for travel without internet</li>
            </ul>
            <p>After your trip, add photos and memories to create shareable travel stories.</p>
        `
    },
    
    // ========== SLIDE 7: Social Features ==========
    'Community Feed': {
        title: '👥 Community Feed',
        content: `
            <p><strong>Discover Trips from Real Travelers</strong></p>
            <p>Unlike review sites with fake reviews, MOBIX's community features:</p>
            <ul>
                <li>See complete itineraries from travelers with similar interests</li>
                <li>Filter by budget, travel style, and destination</li>
                <li>Verified trips with booking proof</li>
                <li>Real photos and honest feedback</li>
            </ul>
            <p>Find your next adventure through the authentic experiences of others.</p>
        `
    },
    'Creator Profiles': {
        title: '⭐ Creator Profiles',
        content: `
            <p><strong>Follow Travel Experts</strong></p>
            <p>Build your network of trusted travel voices:</p>
            <ul>
                <li><strong>Verified Travelers:</strong> Proven track record of quality content</li>
                <li><strong>Niche Experts:</strong> Adventure travel, food tours, budget backpacking</li>
                <li><strong>Local Guides:</strong> People who know destinations inside-out</li>
                <li><strong>Professional Agents:</strong> Licensed travel professionals</li>
            </ul>
            <p>When your favorite creators post new itineraries, you'll be first to know.</p>
        `
    },
    'Share & Inspire': {
        title: '🔄 Share & Inspire',
        content: `
            <p><strong>Your Experience Helps Others</strong></p>
            <p>After every trip, share your Travel Cards:</p>
            <ul>
                <li>Post your complete itinerary with real costs</li>
                <li>Add tips and warnings for future travelers</li>
                <li>Update cards with current prices and availability</li>
                <li>Earn money when others use your recommendations</li>
            </ul>
            <p>Every shared experience makes the MOBIX community smarter and more valuable.</p>
        `
    },
    'Travel Chat': {
        title: '💬 Travel Chat',
        content: `
            <p><strong>Connect With Fellow Travelers</strong></p>
            <p>Real-time communication features:</p>
            <ul>
                <li><strong>Destination Chats:</strong> Ask locals and current visitors</li>
                <li><strong>Trip Groups:</strong> Plan group travel with friends</li>
                <li><strong>Creator DMs:</strong> Ask questions about specific itineraries</li>
                <li><strong>Travel Buddies:</strong> Find companions for solo travelers</li>
            </ul>
            <p>Never travel alone unless you want to — connect with like-minded adventurers.</p>
        `
    },
    
    // ========== SLIDE 10: Business Model ==========
    'Subscriptions': {
        title: '💳 Subscriptions',
        content: `
            <p><strong>Premium Tiers for Power Travelers</strong></p>
            <p>MOBIX offers three subscription levels:</p>
            <ul>
                <li><strong>Free (€0):</strong> 20 AI messages/month, 1 itinerary/day, 30 cards/day</li>
                <li><strong>Traveler Plus (€9.99/mo):</strong> Unlimited AI, priority responses, advanced personalization</li>
                <li><strong>Traveler Premium (€17.99/mo):</strong> Creator tools, marketplace access, revenue sharing</li>
            </ul>
            <p><strong>Strategy:</strong> Free tier builds habits, Plus recovers AI costs, Premium drives marketplace growth.</p>
        `
    },
    'Creator Marketplace': {
        title: '🎨 Creator Marketplace',
        content: `
            <p><strong>Travel Content as a Monetizable Asset</strong></p>
            <p>MOBIX enables a "travel creator economy":</p>
            <ul>
                <li>Publish itineraries priced €2.99 - €19.99</li>
                <li>Earn 70-85% of each sale (MOBIX takes 15-30%)</li>
                <li>Revenue share on bookings made through your cards</li>
                <li>Organize group trips for students, teams, communities</li>
            </ul>
            <p><strong>Vision:</strong> Turn experienced travelers into micro travel agents, scaling quality content without manual production.</p>
        `
    },
    'B2B Partnerships': {
        title: '🏢 B2B Partnerships',
        content: `
            <p><strong>Enterprise Solutions for Travel Industry</strong></p>
            <p>MOBIX monetizes B2B through:</p>
            <ul>
                <li><strong>AI Database Insertion:</strong> Travel agencies upload offers for AI to recommend (€499-€2,999/mo)</li>
                <li><strong>White-Label Solutions:</strong> Hotels and airlines embed MOBIX as their concierge</li>
                <li><strong>Sponsored Recommendations:</strong> Intent-based ads inside AI conversations</li>
                <li><strong>API Access:</strong> Third parties integrate MOBIX's recommendation engine</li>
            </ul>
            <p>This is fundamentally different from banner ads — it's AI-powered distribution.</p>
        `
    },
    'Affiliate Revenue': {
        title: '🔗 Affiliate Revenue',
        content: `
            <p><strong>Commission-Based Booking Orchestration</strong></p>
            <p>MOBIX earns commissions on every booking made through the platform:</p>
            <ul>
                <li><strong>Accommodation:</strong> 12-18% (highest margin)</li>
                <li><strong>Flights:</strong> 3-6% (low margin but high volume)</li>
                <li><strong>Ground Transport:</strong> 8-15% (buses, trains, transfers)</li>
                <li><strong>Experiences:</strong> 10-20% (tours, attractions, activities)</li>
            </ul>
            <p><strong>Key Advantage:</strong> MOBIX's funnel (intent → cards → Travel Notes → booking) achieves higher conversion than search-only platforms.</p>
        `
    },
    
    // ========== SLIDE 15: Competitive Advantages ==========
    'True AI Understanding': {
        title: '🧠 True AI Understanding',
        content: `
            <p><strong>Beyond Simple Keyword Matching</strong></p>
            <p>While competitors match search terms, MOBIX actually <em>understands</em>:</p>
            <ul>
                <li>Complex requests: "romantic weekend with great food and art galleries"</li>
                <li>Implicit preferences: learns from your behavior, not just stated preferences</li>
                <li>Context awareness: remembers entire conversation history</li>
                <li>Explanation engine: tells you <em>why</em> each option was recommended</li>
            </ul>
            <p>This reduces decision anxiety and builds genuine trust in the platform.</p>
        `
    },
    'Hyper-Personalization': {
        title: '🎯 Hyper-Personalization',
        content: `
            <p><strong>A Learning System That Gets Smarter</strong></p>
            <p>MOBIX collects first-party intent data through:</p>
            <ul>
                <li>Onboarding surveys and profile settings</li>
                <li>Card interactions (saves, skips, bookings)</li>
                <li>Travel Notes customization patterns</li>
                <li>Booking history and reviews</li>
            </ul>
            <p><strong>Network Effect:</strong> More users = better data = smarter recommendations = more users. This creates a defensible competitive moat.</p>
        `
    },
    'Social Layer': {
        title: '👥 Social Layer',
        content: `
            <p><strong>Community-Driven Discovery</strong></p>
            <p>Competitors offer isolated experiences. MOBIX creates network effects:</p>
            <ul>
                <li>Travelers discover trips through other travelers</li>
                <li>Creators become distribution channels</li>
                <li>User-generated content scales without production costs</li>
                <li>Social proof increases conversion rates</li>
            </ul>
            <p><strong>The Flywheel:</strong> Creators bring users → Users become creators → Content increases platform value → More creators join.</p>
        `
    },
    
    // ========== SLIDE 8: Personalization ==========
    'Preference Learning': {
        title: '🎯 Preference Learning',
        content: `
            <p><strong>AI That Learns From Every Interaction</strong></p>
            <p>MOBIX builds a comprehensive understanding of your travel preferences:</p>
            <ul>
                <li><strong>Explicit Data:</strong> Budget range, travel dates, dietary requirements</li>
                <li><strong>Implicit Data:</strong> Which cards you save, what you skip, how long you view each option</li>
                <li><strong>Behavioral Patterns:</strong> Do you prefer morning flights? Budget hotels? Local restaurants?</li>
                <li><strong>Feedback Loop:</strong> Post-trip ratings refine future recommendations</li>
            </ul>
            <p>The more you use MOBIX, the better it understands you.</p>
        `
    },
    'Smart Recommendations': {
        title: '📊 Smart Recommendations',
        content: `
            <p><strong>AI-Powered Matching Algorithm</strong></p>
            <p>MOBIX's recommendation engine considers:</p>
            <ul>
                <li><strong>User Profile:</strong> Your stated preferences and behavioral data</li>
                <li><strong>Context:</strong> Season, weather, local events, current prices</li>
                <li><strong>Social Signals:</strong> What similar travelers enjoyed</li>
                <li><strong>Quality Scores:</strong> Verified reviews and ratings</li>
            </ul>
            <p>Each recommendation comes with an explanation of <em>why</em> it was chosen for you.</p>
        `
    },
    'Interest Tags': {
        title: '🏷️ Interest Tags',
        content: `
            <p><strong>Personalized Travel Categories</strong></p>
            <p>MOBIX tracks your interests across categories:</p>
            <ul>
                <li><strong>Adventure:</strong> Hiking, diving, extreme sports</li>
                <li><strong>Culture:</strong> Museums, history, architecture</li>
                <li><strong>Food & Drink:</strong> Local cuisine, wine tours, cooking classes</li>
                <li><strong>Relaxation:</strong> Spas, beaches, wellness retreats</li>
                <li><strong>Nightlife:</strong> Bars, clubs, live music</li>
                <li><strong>Nature:</strong> National parks, wildlife, scenic drives</li>
            </ul>
            <p>Your interest profile evolves as you explore and book.</p>
        `
    },
    'Budget Awareness': {
        title: '💰 Budget Awareness',
        content: `
            <p><strong>Recommendations That Match Your Wallet</strong></p>
            <p>MOBIX understands budget constraints:</p>
            <ul>
                <li>Set your overall trip budget during planning</li>
                <li>Get real-time cost estimates for every itinerary</li>
                <li>Smart substitutions when options exceed budget</li>
                <li>Price alerts for deals on saved destinations</li>
            </ul>
            <p><strong>Example:</strong> "Your Barcelona trip is €50 over budget. Would you like to see a similar hotel that saves €60?"</p>
        `
    },
    
    // ========== SLIDE 9: Levels ==========
    'Explorer': {
        title: '🌱 Explorer (Level 1)',
        content: `
            <p><strong>Starting Your Journey</strong></p>
            <p>Every MOBIX user begins as an Explorer:</p>
            <ul>
                <li><strong>XP Range:</strong> 0 - 500 XP</li>
                <li><strong>Features:</strong> Basic AI features, 5 Travel Cards per month</li>
                <li><strong>Access:</strong> Community feed, basic search</li>
            </ul>
            <p><strong>How to Level Up:</strong> Complete your first trip booking, create Travel Notes, invite friends.</p>
        `
    },
    'Adventurer': {
        title: '🏔️ Adventurer (Level 2)',
        content: `
            <p><strong>Building Experience</strong></p>
            <p>Dedicated travelers reach Adventurer status:</p>
            <ul>
                <li><strong>XP Range:</strong> 500 - 2,000 XP</li>
                <li><strong>Features:</strong> Priority support, 15 Travel Cards per month</li>
                <li><strong>Perks:</strong> Early access to new features, exclusive deals</li>
            </ul>
            <p><strong>Unlock By:</strong> Completing 3+ trips, sharing 5+ Travel Cards, referring 2+ friends.</p>
        `
    },
    'Voyager': {
        title: '🌍 Voyager (Level 3)',
        content: `
            <p><strong>Experienced Traveler</strong></p>
            <p>Voyagers are trusted community members:</p>
            <ul>
                <li><strong>XP Range:</strong> 2,000 - 5,000 XP</li>
                <li><strong>Features:</strong> Unlimited Travel Cards, creator tools access</li>
                <li><strong>Perks:</strong> Exclusive destination deals, monetization eligibility</li>
            </ul>
            <p><strong>Creator Economy:</strong> Voyagers can start earning from their Travel Cards!</p>
        `
    },
    'Legend': {
        title: '👑 Legend (Level 4)',
        content: `
            <p><strong>Elite Status</strong></p>
            <p>Legends are the top 1% of MOBIX users:</p>
            <ul>
                <li><strong>XP Range:</strong> 5,000+ XP</li>
                <li><strong>Features:</strong> VIP experiences, beta feature access</li>
                <li><strong>Perks:</strong> Revenue sharing, direct line to MOBIX team</li>
                <li><strong>Recognition:</strong> Verified badge, featured creator status</li>
            </ul>
            <p><strong>Legends shape the future of MOBIX</strong> through direct feedback and community leadership.</p>
        `
    },
    
    // ========== SLIDE 11: Pricing Tiers ==========
    'Free': {
        title: '🆓 Free Tier',
        content: `
            <p><strong>Start Exploring at No Cost</strong></p>
            <p>The Free tier is designed for casual travelers:</p>
            <ul>
                <li>5 AI conversations per month</li>
                <li>3 Travel Cards storage</li>
                <li>Basic recommendations</li>
                <li>Community access</li>
            </ul>
            <p><strong>Perfect For:</strong> Trying MOBIX before committing, occasional trip planning, browsing community content.</p>
            <p><strong>Upgrade When:</strong> You need more AI messages or want to save more itineraries.</p>
        `
    },
    'Explorer': {
        title: '🚀 Explorer Tier (€9.99/mo)',
        content: `
            <p><strong>For Regular Travelers</strong></p>
            <p>Explorer is our most popular subscription:</p>
            <ul>
                <li>Unlimited AI conversations</li>
                <li>25 Travel Cards storage</li>
                <li>Advanced personalization</li>
                <li>Priority support</li>
                <li>Early access to new features</li>
            </ul>
            <p><strong>Value Proposition:</strong> Saves 20+ hours per trip × 3 trips/year = 60+ hours saved for €120/year.</p>
        `
    },
    'Pro': {
        title: '⭐ Pro Tier (€19.99/mo)',
        content: `
            <p><strong>For Power Users & Creators</strong></p>
            <p>Pro unlocks the full MOBIX ecosystem:</p>
            <ul>
                <li>Everything in Explorer tier</li>
                <li>Unlimited Travel Cards</li>
                <li>Creator marketplace access</li>
                <li>Revenue sharing on your content</li>
                <li>API access for developers</li>
                <li>White-label options</li>
            </ul>
            <p><strong>Creator Earnings:</strong> Top creators earn €500-€2,000/month selling itineraries!</p>
        `
    },
    
    // ========== SLIDE 12: Marketplace ==========
    'For Creators': {
        title: '✨ For Creators',
        content: `
            <p><strong>Turn Your Travels Into Income</strong></p>
            <p>MOBIX enables anyone to become a travel content creator:</p>
            <ul>
                <li><strong>Sell Travel Cards:</strong> Price your itineraries €2.99 - €19.99</li>
                <li><strong>Build Following:</strong> Gain subscribers who love your travel style</li>
                <li><strong>70% Commission:</strong> Keep most of every sale</li>
                <li><strong>Creator Tools:</strong> Analytics, promotion, verification</li>
            </ul>
            <p><strong>Vision:</strong> Experienced travelers become micro travel agents, sharing knowledge and earning passively.</p>
        `
    },
    'For Travelers': {
        title: '🎒 For Travelers',
        content: `
            <p><strong>Access Expert-Curated Trips</strong></p>
            <p>Why plan from scratch when experts have done it?</p>
            <ul>
                <li><strong>Expert Itineraries:</strong> Trips designed by people who've been there</li>
                <li><strong>One-Click Adoption:</strong> Save any itinerary to your Travel Notes</li>
                <li><strong>Verified Recommendations:</strong> Real trips from verified travelers</li>
                <li><strong>Time Savings:</strong> Skip 40+ hours of research</li>
            </ul>
            <p><strong>Cost vs. Value:</strong> A €9.99 itinerary saves 20+ hours and includes insider tips you'd never find online.</p>
        `
    },
    
    // ========== SLIDE 13: B2B Solutions ==========
    'Hotels & Resorts': {
        title: '🏨 Hotels & Resorts',
        content: `
            <p><strong>AI Concierge for Your Guests</strong></p>
            <p>Integrate MOBIX into your guest experience:</p>
            <ul>
                <li>White-label AI concierge in your hotel app</li>
                <li>Personalized local recommendations for each guest</li>
                <li>Upsell tours, restaurants, and spa services</li>
                <li>24/7 automated guest assistance</li>
            </ul>
            <p><strong>Result:</strong> Higher guest satisfaction, increased ancillary revenue, reduced concierge workload.</p>
        `
    },
    'Airlines': {
        title: '✈️ Airlines',
        content: `
            <p><strong>In-Flight Destination Planning</strong></p>
            <p>Transform the flight experience:</p>
            <ul>
                <li>Passengers plan activities during their flight</li>
                <li>Personalized destination guides based on passenger profile</li>
                <li>Direct booking integration for tours and transfers</li>
                <li>Branded travel content for destination marketing</li>
            </ul>
            <p><strong>Revenue Opportunity:</strong> Airlines earn commission on bookings made during flight.</p>
        `
    },
    'Banks & Cards': {
        title: '🏦 Banks & Credit Cards',
        content: `
            <p><strong>Premium Travel Perks</strong></p>
            <p>Differentiate your card with exclusive travel benefits:</p>
            <ul>
                <li>Free MOBIX Pro subscription for cardholders</li>
                <li>Exclusive deals on travel bookings</li>
                <li>Cashback on MOBIX transactions</li>
                <li>Priority access to creator content</li>
            </ul>
            <p><strong>For Banks:</strong> Increases card usage, reduces churn, attracts travel-focused customers.</p>
        `
    },
    'OTAs': {
        title: '🌐 OTAs (Online Travel Agencies)',
        content: `
            <p><strong>AI-Powered Recommendation API</strong></p>
            <p>Enhance your platform with MOBIX intelligence:</p>
            <ul>
                <li>Integrate AI recommendations into your search results</li>
                <li>Personalization layer on top of existing inventory</li>
                <li>Conversational interface for complex queries</li>
                <li>Increase conversion with "why this is right for you" explanations</li>
            </ul>
            <p><strong>Pricing:</strong> API access from €500/month, custom integrations available.</p>
        `
    },
    
    // ========== SLIDE 16: Vision Timeline ==========
    'The Idea': {
        title: '💡 2024: The Idea',
        content: `
            <p><strong>Where It All Began</strong></p>
            <p>MOBIX was born from personal frustration with travel planning:</p>
            <ul>
                <li>Constantly searching for the cheapest flights and trains</li>
                <li>Comparing prices across 10+ different platforms</li>
                <li>Finding train tickets that cost €400 on one site and €200 on another</li>
                <li>Missing important attractions simply because I didn't know they existed</li>
            </ul>
            <p><strong>The Question:</strong> "What if there was an AI that could plan my entire trip based on my preferences and budget?"</p>
        `
    },
    'First Demo': {
        title: '🚀 2025: First Demo',
        content: `
            <p><strong>From Idea to Reality</strong></p>
            <p>The first working prototype was developed independently:</p>
            <ul>
                <li><strong>Technology:</strong> Python, FastAPI, GPT-4, PostgreSQL</li>
                <li><strong>Features:</strong> AI chatbot with 3 modes, Travel Cards, User profiles</li>
                <li><strong>Integrations:</strong> Google Places API, Amadeus flight search</li>
                <li><strong>Result:</strong> 125+ files, 40,000+ lines of code</li>
            </ul>
            <p><strong>Live Demo:</strong> mobix-travel-demo.vercel.app</p>
            <p>Built during night shifts as a hotel receptionist while studying at university.</p>
        `
    },
    'Full Version': {
        title: '🎯 2026: Full Version',
        content: `
            <p><strong>Complete Platform Launch</strong></p>
            <p>The planned full version will include:</p>
            <ul>
                <li>End-to-end booking with licensed travel agency status</li>
                <li>Creator Marketplace for selling itineraries</li>
                <li>Mobile apps for iOS and Android</li>
                <li>Social features and community</li>
                <li>Premium subscription tiers</li>
            </ul>
            <p><strong>Target:</strong> Partnership with investors, dedicated development team, first paying users.</p>
        `
    },
    'Expand': {
        title: '🌍 2027: Expand',
        content: `
            <p><strong>Global Reach & Market Leadership</strong></p>
            <p>Expansion phase goals:</p>
            <ul>
                <li>B2B solutions for hotels, airlines, and OTAs</li>
                <li>White-label platform for enterprise clients</li>
                <li>Localization in 20+ languages</li>
                <li>Regional offices in key markets</li>
                <li>1M+ active users worldwide</li>
            </ul>
            <p><strong>Vision:</strong> MOBIX becomes the industry standard for AI-powered travel planning.</p>
        `
    }
};

// Fallback descriptions for items without specific modal data
const fallbackDescriptions = {
    default: "Click to learn more about this feature and how it enhances your travel planning experience with MOBIX."
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.presentation = new MobixPresentation();
    
    // Add modal overlay to body
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = 'modalOverlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" id="modalClose">&times;</button>
            <div class="modal-header">
                <span class="modal-icon" id="modalIcon"></span>
                <h2 class="modal-title" id="modalTitle"></h2>
            </div>
            <div class="modal-body" id="modalBody"></div>
        </div>
    `;
    document.body.appendChild(modalOverlay);
    
    // Modal close handlers
    document.getElementById('modalClose').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
    
    // Delegate click events for cards
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.feature-card, .problem-card, .solution-card, .mode-card, .social-feature-card, .personalization-card, .level-card, .business-card, .pricing-card, .marketplace-card, .b2b-card, .advantage-card, .flow-step, .card-type-box, .timeline-content, .revenue-item');
        
        if (card) {
            const title = card.querySelector('.feature-title, .problem-title, .solution-title, .mode-title, .social-title, .pers-title, .level-name, .business-title, .pricing-name, .marketplace-title, .b2b-title, .advantage-title, .step-title, .card-type-title, .timeline-title, .revenue-source');
            
            if (title) {
                const titleText = title.textContent.trim();
                const data = modalData[titleText];
                
                if (data) {
                    openModal(data.title, data.content);
                } else {
                    // Generate generic modal for items without specific data
                    const icon = card.querySelector('.feature-icon, .problem-icon, .solution-icon, .mode-icon, .social-icon, .pers-icon, .level-icon, .business-icon, .pricing-icon, .marketplace-icon, .b2b-icon, .advantage-icon, .step-icon, .card-type-icon');
                    const desc = card.querySelector('.feature-desc, .problem-desc, .solution-desc, .mode-desc, .social-desc, .pers-desc, .business-desc, .b2b-desc, .advantage-desc, .step-desc, .card-type-desc, .timeline-desc, .revenue-details');
                    
                    const iconText = icon ? icon.textContent : '📌';
                    const descText = desc ? desc.textContent : '';
                    
                    openModal(
                        `${iconText} ${titleText}`,
                        `<p>${descText}</p><p><em>Kliknite elemente za više informacija o svakoj značajki.</em></p>`
                    );
                }
            }
        }
    });
});

function openModal(title, content) {
    const overlay = document.getElementById('modalOverlay');
    document.getElementById('modalTitle').textContent = title.replace(/^[^\s]+\s/, '');
    document.getElementById('modalIcon').textContent = title.match(/^[^\s]+/)?.[0] || '📌';
    document.getElementById('modalBody').innerHTML = content;
    overlay.classList.add('active');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

// Add transition overlay styles dynamically
const transitionStyles = document.createElement('style');
transitionStyles.textContent = `
    .slide-transition-overlay {
        position: fixed;
        inset: 0;
        background: linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    .slide-transition-overlay.active {
        opacity: 1;
    }
    
    .transition-content {
        text-align: center;
    }
    
    .transition-logo {
        width: 80px;
        height: 80px;
        object-fit: contain;
        animation: transitionPulse 0.6s ease-in-out;
    }
    
    @keyframes transitionPulse {
        0% { transform: scale(0.8); opacity: 0; }
        50% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(transitionStyles);
