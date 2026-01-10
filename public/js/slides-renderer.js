/* =============================================
   MOBIX Presentation - Slides Renderer
   Generates HTML for each slide type
   With Creative Image Integration
   ============================================= */

const SlidesRenderer = {
    
    // Curated Unsplash images for each slide theme
    slideImages: {
        1: { // Title - AI Travel
            main: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80',
            alt: 'Travel planning'
        },
        2: { // Problem
            main: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80',
            alt: 'Stressed traveler'
        },
        3: { // Solution
            main: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80',
            alt: 'Road trip adventure'
        },
        4: { // How it works
            main: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=600&q=80',
            alt: 'Mobile app travel'
        },
        5: { // AI Chatbot
            main: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
            alt: 'AI technology'
        },
        6: { // Travel Cards
            main: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80',
            alt: 'Beautiful destination'
        },
        7: { // Social
            main: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
            alt: 'Friends traveling'
        },
        8: { // Personalization
            main: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
            alt: 'Personal journey'
        },
        9: { // User Levels
            main: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=600&q=80',
            alt: 'Achievement'
        },
        10: { // Business Model
            main: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
            alt: 'Business growth'
        },
        11: { // Subscription
            main: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
            alt: 'Premium service'
        },
        12: { // Creator Marketplace
            main: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
            alt: 'Creative community'
        },
        13: { // B2B
            main: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
            alt: 'Business partnership'
        },
        14: { // Revenue
            main: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
            alt: 'Analytics growth'
        },
        15: { // Competitive
            main: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
            alt: 'Team strategy'
        },
        16: { // Vision
            main: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
            alt: 'Global vision'
        },
        17: { // Thank You
            main: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600&q=80',
            alt: 'Thank you sunset'
        }
    },

    // Destination images for travel cards showcase
    destinationImages: [
        { src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80', name: 'Paris' },
        { src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80', name: 'London' },
        { src: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&q=80', name: 'Dubai' },
        { src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80', name: 'Tokyo' },
        { src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=80', name: 'Santorini' },
        { src: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80', name: 'Barcelona' }
    ],

    // Main render function
    render(slide) {
        const renderer = this.renderers[slide.type];
        if (renderer) {
            return renderer(slide);
        }
        return this.renderDefault(slide);
    },

    // Get slide image
    getSlideImage(slideId) {
        return this.slideImages[slideId] || { main: '', alt: '' };
    },

    // Render floating image decoration
    renderFloatingImage(slideId) {
        const image = this.slideImages[slideId];
        if (!image) return '';
        return `
            <div class="slide-image-card">
                <img src="${image.main}" alt="${image.alt}" loading="lazy">
            </div>
        `;
    },

    // Default fallback renderer
    renderDefault(slide) {
        return `
            <div class="slide-content">
                <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
            </div>
        `;
    },

    // All slide type renderers
    renderers: {
        
        // Slide 1: Title Slide
        'title-slide': (slide) => {
            const { subtitle, mainText, features, tagline } = slide.content;
            const destinations = SlidesRenderer.destinationImages;
            return `
                <div class="slide-content title-slide-content">
                    <div class="floating-images-container">
                        <div class="floating-image">
                            <img src="${destinations[0].src}" alt="${destinations[0].name}" loading="lazy">
                        </div>
                        <div class="floating-image">
                            <img src="${destinations[4].src}" alt="${destinations[4].name}" loading="lazy">
                        </div>
                        <div class="floating-image">
                            <img src="${destinations[2].src}" alt="${destinations[2].name}" loading="lazy">
                        </div>
                    </div>
                    
                    <div class="title-header animate-fade-up">
                        <img src="assets/title-font.png" alt="MOBIX" class="title-logo-img">
                        <p class="title-subtitle">${subtitle}</p>
                    </div>
                    
                    <p class="main-description animate-fade-up" style="animation-delay: 0.2s">
                        ${mainText}
                    </p>
                    
                    <div class="features-grid stagger-animation animate">
                        ${features.map(f => `
                            <div class="feature-card hover-lift" data-modal="feature">
                                <span class="feature-icon">${f.icon}</span>
                                <h3 class="feature-title">${f.title}</h3>
                                <p class="feature-desc">${f.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <p class="tagline gradient-text-animated">${tagline}</p>
                </div>
            `;
        },

        // Slide 2: Problem Slide
        'problem-slide': (slide) => {
            const { problems, conclusion } = slide.content;
            const image = SlidesRenderer.slideImages[2];
            return `
                <div class="slide-content">
                    <div class="slide-image-card">
                        <img src="${image.main}" alt="${image.alt}" loading="lazy">
                    </div>
                    
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    
                    <div class="problems-grid stagger-animation animate">
                        ${problems.map(p => `
                            <div class="problem-card hover-lift" data-modal="problem">
                                <span class="problem-icon">${p.icon}</span>
                                <h3 class="problem-title">${p.title}</h3>
                                <p class="problem-desc">${p.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="conclusion-box animate-fade-up">
                        <p class="conclusion-text">${conclusion}</p>
                    </div>
                </div>
            `;
        },

        // Slide 3: Solution Slide
        'solution-slide': (slide) => {
            const { mainMessage, solutions } = slide.content;
            const image = SlidesRenderer.slideImages[3];
            return `
                <div class="slide-content">
                    <div class="slide-image-card">
                        <img src="${image.main}" alt="${image.alt}" loading="lazy">
                    </div>
                    
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    
                    <div class="main-message animate-fade-up">
                        <p>${mainMessage}</p>
                    </div>
                    
                    <div class="solutions-grid stagger-animation animate">
                        ${solutions.map(s => `
                            <div class="solution-card hover-lift" data-modal="solution">
                                <span class="solution-icon">${s.icon}</span>
                                <h3 class="solution-title">${s.title}</h3>
                                <p class="solution-desc">${s.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // Slide 4: Flow Slide
        'flow-slide': (slide) => {
            const { subtitle, steps } = slide.content;
            const image = SlidesRenderer.slideImages[4];
            return `
                <div class="slide-content">
                    <div class="slide-bg-image">
                        <img src="${image.main}" alt="${image.alt}" loading="lazy">
                    </div>
                    
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="slide-subtitle animate-fade-up">${subtitle}</p>
                    
                    <div class="flow-container stagger-animation animate">
                        ${steps.map((step, index) => `
                            <div class="flow-step hover-lift" data-modal="step">
                                <div class="step-number">${step.number}</div>
                                <span class="step-icon">${step.icon}</span>
                                <h3 class="step-title">${step.title}</h3>
                                <p class="step-desc">${step.desc}</p>
                            </div>
                            ${index < steps.length - 1 ? '<div class="flow-arrow">→</div>' : ''}
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // Slide 5: Modes Slide
        'modes-slide': (slide) => {
            const { intro, modes } = slide.content;
            const image = SlidesRenderer.slideImages[5];
            return `
                <div class="slide-content">
                    <div class="slide-image-card">
                        <img src="${image.main}" alt="${image.alt}" loading="lazy">
                    </div>
                    
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="slide-intro animate-fade-up">${intro}</p>
                    
                    <div class="modes-container stagger-animation animate">
                        ${modes.map(mode => `
                            <div class="mode-card mode-${mode.color} hover-lift" data-modal="mode">
                                <span class="mode-icon">${mode.icon}</span>
                                <h3 class="mode-title">${mode.title}</h3>
                                <p class="mode-desc">${mode.desc}</p>
                                <div class="mode-example">
                                    <span class="example-label">Example:</span>
                                    <span class="example-text">${mode.example}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // Slide 6: Cards Slide
        'cards-slide': (slide) => {
            const { travelCards, travelNotes, highlight } = slide.content;
            const destinations = SlidesRenderer.destinationImages;
            return `
                <div class="slide-content">
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    
                    <div class="image-showcase animate-fade-up" style="animation-delay: 0.1s">
                        ${destinations.slice(0, 3).map(dest => `
                            <div class="image-showcase-item">
                                <img src="${dest.src}" alt="${dest.name}" loading="lazy">
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="cards-comparison stagger-animation animate">
                        <div class="card-type-box hover-lift" data-modal="card">
                            <span class="card-type-icon">${travelCards.icon}</span>
                            <h3 class="card-type-title">${travelCards.title}</h3>
                            <p class="card-type-desc">${travelCards.desc}</p>
                            <ul class="card-features-list">
                                ${travelCards.features.map(f => `<li>${f}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="card-type-box hover-lift" data-modal="card">
                            <span class="card-type-icon">${travelNotes.icon}</span>
                            <h3 class="card-type-title">${travelNotes.title}</h3>
                            <p class="card-type-desc">${travelNotes.desc}</p>
                            <ul class="card-features-list">
                                ${travelNotes.features.map(f => `<li>${f}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="highlight-box animate-fade-up">
                        <p>${highlight}</p>
                    </div>
                </div>
            `;
        },

        // Slide 7: Social Slide
        'social-slide': (slide) => {
            const { badge, mainTitle, features, quote } = slide.content;
            const image = SlidesRenderer.slideImages[7];
            return `
                <div class="slide-content">
                    <div class="slide-image-card">
                        <img src="${image.main}" alt="${image.alt}" loading="lazy">
                    </div>
                    
                    <div class="badge-container animate-fade-up">
                        <span class="future-badge">${badge}</span>
                    </div>
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <h2 class="slide-main-title animate-fade-up">${mainTitle}</h2>
                    
                    <div class="social-features-grid stagger-animation animate">
                        ${features.map(f => `
                            <div class="social-feature-card hover-lift" data-modal="social">
                                <span class="social-icon">${f.icon}</span>
                                <h3 class="social-title">${f.title}</h3>
                                <p class="social-desc">${f.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <blockquote class="slide-quote animate-fade-up">${quote}</blockquote>
                </div>
            `;
        },

        // Slide 8: Personalization Slide
        'personalization-slide': (slide) => {
            const { mainMessage, features, stats } = slide.content;
            const image = SlidesRenderer.slideImages[8];
            return `
                <div class="slide-content">
                    <div class="slide-image-card">
                        <img src="${image.main}" alt="${image.alt}" loading="lazy">
                    </div>
                    
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="main-message animate-fade-up">${mainMessage}</p>
                    
                    <div class="personalization-grid stagger-animation animate">
                        ${features.map(f => `
                            <div class="personalization-card hover-lift" data-modal="personalization">
                                <span class="pers-icon">${f.icon}</span>
                                <h3 class="pers-title">${f.title}</h3>
                                <p class="pers-desc">${f.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="stats-row animate-fade-up">
                        ${stats.map(s => `
                            <div class="stat-item">
                                <span class="stat-value gradient-text">${s.value}</span>
                                <span class="stat-label">${s.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // Slide 9: Levels Slide
        'levels-slide': (slide) => {
            const { intro, levels, earnXP } = slide.content;
            const image = SlidesRenderer.slideImages[9];
            return `
                <div class="slide-content">
                    <div class="slide-bg-image">
                        <img src="${image.main}" alt="${image.alt}" loading="lazy">
                    </div>
                    
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="slide-intro animate-fade-up">${intro}</p>
                    
                    <div class="levels-container stagger-animation animate">
                        ${levels.map(level => `
                            <div class="level-card level-${level.level} hover-lift" data-modal="level">
                                <div class="level-header">
                                    <span class="level-icon">${level.icon}</span>
                                    <div class="level-info">
                                        <span class="level-number">Level ${level.level}</span>
                                        <h3 class="level-name">${level.name}</h3>
                                    </div>
                                </div>
                                <span class="level-xp">${level.xp}</span>
                                <ul class="level-perks">
                                    ${level.perks.map(p => `<li>${p}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="earn-xp-box animate-fade-up">
                        <h4>Earn XP by:</h4>
                        <div class="xp-methods">
                            ${earnXP.map(method => `<span class="xp-method">${method}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        },

        // Slide 10: Business Slide
        'business-slide': (slide) => {
            const { subtitle, models } = slide.content;
            const image = SlidesRenderer.slideImages[10];
            return `
                <div class="slide-content">
                    <div class="slide-image-card">
                        <img src="${image.main}" alt="${image.alt}" loading="lazy">
                    </div>
                    
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="slide-subtitle animate-fade-up">${subtitle}</p>
                    
                    <div class="business-models-grid stagger-animation animate">
                        ${models.map(model => `
                            <div class="business-card hover-lift" data-modal="business">
                                <div class="business-revenue">${model.revenue}</div>
                                <span class="business-icon">${model.icon}</span>
                                <h3 class="business-title">${model.title}</h3>
                                <p class="business-desc">${model.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // Slide 11: Pricing Slide
        'pricing-slide': (slide) => {
            const { tiers } = slide.content;
            const image = SlidesRenderer.slideImages[11];
            return `
                <div class="slide-content">
                    <div class="slide-bg-image">
                        <img src="${image.main}" alt="${image.alt}" loading="lazy">
                    </div>
                    
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    
                    <div class="pricing-container stagger-animation animate">
                        ${tiers.map(tier => `
                            <div class="pricing-card ${tier.highlighted ? 'highlighted' : ''} hover-lift" data-modal="pricing">
                                <span class="pricing-icon">${tier.icon}</span>
                                <h3 class="pricing-name">${tier.name}</h3>
                                <div class="pricing-price">
                                    <span class="price-value">${tier.price}</span>
                                    <span class="price-period">${tier.period}</span>
                                </div>
                                <ul class="pricing-features">
                                    ${tier.features.map(f => `<li><span class="check">✓</span> ${f}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // Slide 12: Marketplace Slide
        'marketplace-slide': (slide) => {
            const { headline, forCreators, forTravelers, stats } = slide.content;
            const image = SlidesRenderer.slideImages[12];
            return `
                <div class="slide-content">
                    <div class="slide-image-card">
                        <img src="${image.main}" alt="${image.alt}" loading="lazy">
                    </div>
                    
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="headline animate-fade-up">${headline}</p>
                    
                    <div class="marketplace-grid stagger-animation animate">
                        <div class="marketplace-card creators hover-lift" data-modal="marketplace">
                            <span class="marketplace-icon">${forCreators.icon}</span>
                            <h3 class="marketplace-title">${forCreators.title}</h3>
                            <ul class="marketplace-benefits">
                                ${forCreators.benefits.map(b => `<li>${b}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="marketplace-card travelers hover-lift" data-modal="marketplace">
                            <span class="marketplace-icon">${forTravelers.icon}</span>
                            <h3 class="marketplace-title">${forTravelers.title}</h3>
                            <ul class="marketplace-benefits">
                                ${forTravelers.benefits.map(b => `<li>${b}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="stats-row animate-fade-up">
                        ${stats.map(s => `
                            <div class="stat-item">
                                <span class="stat-value gradient-text">${s.value}</span>
                                <span class="stat-label">${s.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // Slide 13: B2B Slide
        'b2b-slide': (slide) => {
            const { subtitle, solutions, pricing } = slide.content;
            const image = SlidesRenderer.slideImages[13];
            return `
                <div class="slide-content">
                    <div class="slide-image-card">
                        <img src="${image.main}" alt="${image.alt}" loading="lazy">
                    </div>
                    
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="slide-subtitle animate-fade-up">${subtitle}</p>
                    
                    <div class="b2b-solutions-grid stagger-animation animate">
                        ${solutions.map(s => `
                            <div class="b2b-card hover-lift" data-modal="b2b">
                                <span class="b2b-icon">${s.icon}</span>
                                <h3 class="b2b-title">${s.title}</h3>
                                <p class="b2b-desc">${s.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="b2b-pricing animate-fade-up">
                        ${pricing.map(p => `
                            <div class="b2b-price-tier">
                                <span class="tier-name">${p.tier}</span>
                                <span class="tier-price">${p.price}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // Slide 14: Revenue Slide
        'revenue-slide': (slide) => {
            const { headline, totalRevenue, year, breakdown } = slide.content;
            const image = SlidesRenderer.slideImages[14];
            return `
                <div class="slide-content">
                    <div class="slide-bg-image">
                        <img src="${image.main}" alt="${image.alt}" loading="lazy">
                    </div>
                    
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="headline animate-fade-up">${headline}</p>
                    
                    <div class="revenue-hero animate-scale-in">
                        <span class="revenue-total gradient-text-animated">${totalRevenue}</span>
                        <span class="revenue-year">${year}</span>
                    </div>
                    
                    <div class="revenue-breakdown stagger-animation animate">
                        ${breakdown.map(item => `
                            <div class="revenue-item hover-lift" data-modal="revenue">
                                <div class="revenue-header">
                                    <span class="revenue-source">${item.source}</span>
                                    <span class="revenue-amount">${item.amount}</span>
                                </div>
                                <div class="revenue-bar">
                                    <div class="revenue-fill" style="width: ${item.percentage}%"></div>
                                </div>
                                <p class="revenue-details">${item.details}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // Slide 15: Advantage Slide
        'advantage-slide': (slide) => {
            const { intro, advantages, competitors } = slide.content;
            const image = SlidesRenderer.slideImages[15];
            return `
                <div class="slide-content">
                    <div class="slide-image-card">
                        <img src="${image.main}" alt="${image.alt}" loading="lazy">
                    </div>
                    
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="slide-intro animate-fade-up">${intro}</p>
                    
                    <div class="advantages-grid stagger-animation animate">
                        ${advantages.map(adv => `
                            <div class="advantage-card hover-lift" data-modal="advantage">
                                <span class="advantage-icon">${adv.icon}</span>
                                <h3 class="advantage-title">${adv.title}</h3>
                                <p class="advantage-desc">${adv.desc}</p>
                                <div class="vs-others">
                                    <span class="vs-label">${adv.vsOthers}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="competitors-row animate-fade-up">
                        <span class="vs-text">vs</span>
                        ${competitors.map(c => `<span class="competitor">${c}</span>`).join('')}
                    </div>
                </div>
            `;
        },

        // Slide 16: Vision Slide
        'vision-slide': (slide) => {
            const { quote, milestones, mission } = slide.content;
            const image = SlidesRenderer.slideImages[16];
            const destinations = SlidesRenderer.destinationImages;
            return `
                <div class="slide-content vision-slide-content">
                    <div class="floating-images-container">
                        <div class="floating-image">
                            <img src="${destinations[3].src}" alt="${destinations[3].name}" loading="lazy">
                        </div>
                        <div class="floating-image">
                            <img src="${destinations[5].src}" alt="${destinations[5].name}" loading="lazy">
                        </div>
                    </div>
                    
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    
                    <blockquote class="vision-quote animate-fade-up">${quote}</blockquote>
                    
                    <div class="timeline stagger-animation animate">
                        ${milestones.map(m => `
                            <div class="timeline-item">
                                <span class="timeline-year">${m.year}</span>
                                <div class="timeline-content hover-lift" data-modal="timeline">
                                    <h3 class="timeline-title">${m.title}</h3>
                                    <p class="timeline-desc">${m.desc}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <p class="mission-statement animate-fade-up">${mission}</p>
                </div>
            `;
        },

        // Slide 17: Final Slide
        'final-slide': (slide) => {
            const { headline, tagline, cta, presenter, contact, demo } = slide.content;
            const image = SlidesRenderer.slideImages[17];
            return `
                <div class="slide-content final-slide-content">
                    <div class="slide-bg-image" style="opacity: 0.2;">
                        <img src="${image.main}" alt="${image.alt}" loading="lazy">
                    </div>
                    
                    <div class="final-header animate-fade-up">
                        <h1 class="final-title">${slide.title} 🙏</h1>
                    </div>
                    
                    <p class="final-headline gradient-text animate-fade-up">${headline}</p>
                    
                    <div class="presenter-info animate-fade-up">
                        <span class="presenter-item">👤 ${presenter.name}</span>
                        <span class="presenter-divider">|</span>
                        <span class="presenter-item">🏛️ ${presenter.university}</span>
                        <span class="presenter-divider">|</span>
                        <span class="presenter-item">🏢 ${presenter.faculty}</span>
                    </div>
                    
                    <div class="contact-buttons animate-fade-up">
                        <a href="mailto:${contact.email}" class="contact-btn email-btn">
                            <span class="btn-icon">✉️</span>
                            <span>${contact.email}</span>
                        </a>
                        <a href="https://${contact.github}" target="_blank" class="contact-btn github-btn">
                            <span class="btn-icon">💻</span>
                            <span>${contact.github}</span>
                        </a>
                    </div>
                    
                    <div class="demo-link animate-fade-up">
                        <span class="demo-label">Live Demo:</span>
                        <a href="https://${demo}" target="_blank" class="demo-url">${demo}</a>
                    </div>
                    
                    <p class="final-tagline animate-fade-up">${tagline}</p>
                </div>
            `;
        }
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SlidesRenderer;
}
