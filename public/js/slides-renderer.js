/* =============================================
   MOBIX Presentation - Slides Renderer
   Premium Design with HD Images & Modal Support
   ============================================= */

const SlidesRenderer = {
    
    // Premium HD Images from Pexels
    images: {
        maldives: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        santorini: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        paris: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        tokyo: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        bali: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        dubai: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        stressed: 'https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        happy_traveler: 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        friends_travel: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        solo_traveler: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        creator: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        smartphone: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        ai_tech: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        laptop_travel: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        chat_ai: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        business_meeting: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        growth_chart: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        handshake: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        office: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        adventure: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        hiking: 'https://images.pexels.com/photos/2526025/pexels-photo-2526025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        sunset: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        beach: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        globe: 'https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        future: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        thank_you: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
    },

    render(slide) {
        const renderer = this.renderers[slide.type];
        if (renderer) {
            return renderer(slide);
        }
        return this.renderDefault(slide);
    },

    renderDefault(slide) {
        return `
            <div class="slide-content">
                <h1 class="premium-title animate-fade-up">${slide.title}</h1>
            </div>
        `;
    },

    renderers: {
        
        // SLIDE 1: TITLE - What is MOBIX?
        'title-slide': (slide) => {
            const { subtitle, mainText, features, tagline } = slide.content;
            const img = SlidesRenderer.images;
            return `
                <div class="slide-content title-slide-content">
                    <div class="slide-hero-bg">
                        <img src="${img.maldives}" alt="Paradise destination" loading="lazy">
                    </div>
                    <div class="title-header animate-fade-up">
                        <img src="assets/title-font.png" alt="MOBIX" class="title-logo-img">
                        <p class="premium-subtitle">${subtitle}</p>
                    </div>
                    <p class="premium-text animate-fade-up" style="animation-delay: 0.2s; max-width: 700px; text-align: center;">${mainText}</p>
                    <div class="features-grid stagger-premium">
                        ${features.map(f => `
                            <div class="premium-card hover-lift clickable-card" data-modal="feature">
                                <span class="feature-icon">${f.icon}</span>
                                <h3 class="feature-title">${f.title}</h3>
                                <p class="feature-desc">${f.desc}</p>
                                <span class="click-hint">Click for details</span>
                            </div>
                        `).join('')}
                    </div>
                    <p class="tagline gradient-text-animated animate-float">${tagline}</p>
                </div>
            `;
        },

        // SLIDE 2: PROBLEM
        'problem-slide': (slide) => {
            const { problems, conclusion } = slide.content;
            const img = SlidesRenderer.images;
            return `
                <div class="split-screen">
                    <div class="split-content">
                        <h1 class="premium-title animate-fade-up">${slide.title}</h1>
                        <div class="stagger-premium" style="display: grid; gap: 16px;">
                            ${problems.map(p => `
                                <div class="glass-card-light clickable-card" data-modal="problem" style="padding: 20px; border-radius: 16px; display: flex; gap: 16px; align-items: flex-start; text-align: left; cursor: pointer;">
                                    <span class="problem-icon" style="font-size: 2rem; flex-shrink: 0;">${p.icon}</span>
                                    <div>
                                        <h3 class="problem-title" style="color: #fca5a5; font-size: 1.1rem; font-weight: 600; margin-bottom: 4px;">${p.title}</h3>
                                        <p class="problem-desc" style="color: var(--gray-400); font-size: 0.9rem; line-height: 1.5;">${p.desc}</p>
                                    </div>
                                    <span class="click-hint-mini">ℹ️</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="premium-badge animate-fade-up" style="margin-top: 16px;">${conclusion}</div>
                    </div>
                    <div class="split-image">
                        <img src="${img.stressed}" alt="Travel planning frustration" loading="lazy">
                        <div class="split-image-overlay"></div>
                    </div>
                </div>
            `;
        },

        // SLIDE 3: SOLUTION
        'solution-slide': (slide) => {
            const { mainMessage, solutions } = slide.content;
            const img = SlidesRenderer.images;
            return `
                <div class="split-screen" style="direction: rtl;">
                    <div class="split-content" style="direction: ltr;">
                        <h1 class="premium-title animate-fade-up">${slide.title}</h1>
                        <div class="glass-card animate-fade-up" style="padding: 20px 28px; border-radius: 16px; margin-bottom: 16px;">
                            <p style="font-size: 1.4rem; font-weight: 700; color: var(--white); margin: 0;">${mainMessage}</p>
                        </div>
                        <div class="stagger-premium" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            ${solutions.map(s => `
                                <div class="glass-card-light clickable-card" data-modal="solution" style="padding: 20px; border-radius: 16px; text-align: left; cursor: pointer;">
                                    <span class="solution-icon" style="font-size: 2rem; display: block; margin-bottom: 12px;">${s.icon}</span>
                                    <h3 class="solution-title" style="color: #6ee7b7; font-size: 1rem; font-weight: 600; margin-bottom: 6px;">${s.title}</h3>
                                    <p class="solution-desc" style="color: var(--gray-400); font-size: 0.85rem; line-height: 1.5;">${s.desc}</p>
                                    <span class="click-hint-mini">ℹ️</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="split-image" style="direction: ltr;">
                        <img src="${img.happy_traveler}" alt="Happy traveler" loading="lazy">
                        <div class="split-image-overlay"></div>
                    </div>
                </div>
            `;
        },

        // SLIDE 4: HOW IT WORKS
        'flow-slide': (slide) => {
            const { subtitle, steps } = slide.content;
            const img = SlidesRenderer.images;
            return `
                <div class="slide-content">
                    <div class="slide-full-bg">
                        <img src="${img.laptop_travel}" alt="Planning travel" loading="lazy">
                    </div>
                    <h1 class="premium-title animate-fade-up">${slide.title}</h1>
                    <p class="premium-subtitle animate-fade-up">${subtitle}</p>
                    <div class="premium-flow stagger-premium">
                        ${steps.map((step, index) => `
                            <div class="premium-flow-step clickable-card hover-lift" data-modal="step">
                                <div class="premium-flow-number">${step.number}</div>
                                <span class="step-icon">${step.icon}</span>
                                <h3 class="step-title">${step.title}</h3>
                                <p class="step-desc">${step.desc}</p>
                                <span class="click-hint-mini">ℹ️</span>
                            </div>
                            ${index < steps.length - 1 ? '<span class="premium-flow-arrow">→</span>' : ''}
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // SLIDE 5: AI CHATBOT MODES
        'modes-slide': (slide) => {
            const { intro, modes } = slide.content;
            const img = SlidesRenderer.images;
            return `
                <div class="split-screen">
                    <div class="split-content">
                        <h1 class="premium-title animate-fade-up">${slide.title}</h1>
                        <p class="premium-text animate-fade-up" style="margin-bottom: 16px;">${intro}</p>
                        <div class="stagger-premium" style="display: grid; gap: 16px;">
                            ${modes.map(mode => `
                                <div class="glass-card-light clickable-card" data-modal="mode" style="padding: 20px; border-radius: 16px; text-align: left; cursor: pointer;">
                                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                        <span class="mode-icon" style="font-size: 2rem;">${mode.icon}</span>
                                        <h3 class="mode-title" style="color: var(--primary-300); font-size: 1.2rem; font-weight: 700;">${mode.title}</h3>
                                    </div>
                                    <p class="mode-desc" style="color: var(--gray-400); font-size: 0.9rem; line-height: 1.5; margin-bottom: 12px;">${mode.desc}</p>
                                    <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px;">
                                        <span style="color: var(--primary-400); font-size: 0.75rem; text-transform: uppercase;">Example:</span>
                                        <p style="color: var(--gray-300); font-size: 0.9rem; font-style: italic; margin-top: 4px;">${mode.example}</p>
                                    </div>
                                    <span class="click-hint-mini">ℹ️</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="split-image">
                        <img src="${img.chat_ai}" alt="AI Chat Interface" loading="lazy">
                        <div class="split-image-overlay"></div>
                    </div>
                </div>
            `;
        },

        // SLIDE 6: TRAVEL CARDS & NOTES
        'cards-slide': (slide) => {
            const { travelCards, travelNotes, highlight } = slide.content;
            const img = SlidesRenderer.images;
            return `
                <div class="slide-content">
                    <div class="slide-hero-bg" style="width: 100%; opacity: 0.2;">
                        <img src="${img.santorini}" alt="Santorini" loading="lazy">
                    </div>
                    <h1 class="premium-title animate-fade-up">${slide.title}</h1>
                    <div class="animate-fade-up" style="display: flex; gap: 16px; margin-bottom: 24px;">
                        <div style="width: 120px; height: 80px; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                            <img src="${img.paris}" alt="Paris" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div style="width: 120px; height: 80px; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                            <img src="${img.tokyo}" alt="Tokyo" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div style="width: 120px; height: 80px; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                            <img src="${img.dubai}" alt="Dubai" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                    </div>
                    <div class="stagger-premium" style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 900px;">
                        <div class="glass-card clickable-card" data-modal="cards" style="padding: 28px; border-radius: 20px; text-align: left; cursor: pointer;">
                            <span class="item-icon" style="font-size: 3rem; display: block; margin-bottom: 16px;">${travelCards.icon}</span>
                            <h3 class="item-title" style="font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 8px;">${travelCards.title}</h3>
                            <p class="item-desc" style="color: var(--gray-400); margin-bottom: 16px;">${travelCards.desc}</p>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${travelCards.features.map(f => `<li style="color: var(--gray-300); font-size: 0.9rem; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">✓ ${f}</li>`).join('')}
                            </ul>
                            <span class="click-hint">Click for details</span>
                        </div>
                        <div class="glass-card clickable-card" data-modal="notes" style="padding: 28px; border-radius: 20px; text-align: left; cursor: pointer;">
                            <span class="item-icon" style="font-size: 3rem; display: block; margin-bottom: 16px;">${travelNotes.icon}</span>
                            <h3 class="item-title" style="font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 8px;">${travelNotes.title}</h3>
                            <p class="item-desc" style="color: var(--gray-400); margin-bottom: 16px;">${travelNotes.desc}</p>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${travelNotes.features.map(f => `<li style="color: var(--gray-300); font-size: 0.9rem; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">✓ ${f}</li>`).join('')}
                            </ul>
                            <span class="click-hint">Click for details</span>
                        </div>
                    </div>
                    <div class="premium-badge animate-fade-up" style="margin-top: 20px;">${highlight}</div>
                </div>
            `;
        },

        // SLIDE 7: SOCIAL DISCOVERY
        'social-slide': (slide) => {
            const { badge, mainTitle, features, quote } = slide.content;
            const img = SlidesRenderer.images;
            return `
                <div class="split-screen" style="direction: rtl;">
                    <div class="split-content" style="direction: ltr;">
                        <span class="premium-badge animate-fade-up">${badge}</span>
                        <h1 class="premium-title animate-fade-up" style="margin-top: 12px;">${slide.title}</h1>
                        <h2 class="premium-subtitle animate-fade-up">${mainTitle}</h2>
                        <div class="stagger-premium" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px;">
                            ${features.map(f => `
                                <div class="glass-card-light clickable-card" data-modal="social" style="padding: 20px; border-radius: 16px; text-align: left; cursor: pointer;">
                                    <span class="feature-icon" style="font-size: 2rem; display: block; margin-bottom: 10px;">${f.icon}</span>
                                    <h3 class="feature-title" style="color: #fff; font-size: 1rem; font-weight: 600; margin-bottom: 6px;">${f.title}</h3>
                                    <p class="feature-desc" style="color: var(--gray-400); font-size: 0.85rem;">${f.desc}</p>
                                    <span class="click-hint-mini">ℹ️</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="premium-quote animate-fade-up" style="font-size: 1.1rem; margin-top: 20px; padding: 16px;">${quote}</div>
                    </div>
                    <div class="split-image" style="direction: ltr;">
                        <img src="${img.friends_travel}" alt="Friends traveling together" loading="lazy">
                        <div class="split-image-overlay"></div>
                    </div>
                </div>
            `;
        },

        // SLIDE 8: PERSONALIZATION
        'personalization-slide': (slide) => {
            const { mainMessage, features, stats } = slide.content;
            const img = SlidesRenderer.images;
            return `
                <div class="slide-content">
                    <div class="slide-hero-bg">
                        <img src="${img.solo_traveler}" alt="Personal journey" loading="lazy">
                    </div>
                    <h1 class="premium-title animate-fade-up">${slide.title}</h1>
                    <p class="premium-subtitle animate-fade-up">${mainMessage}</p>
                    <div class="stagger-premium" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; max-width: 1000px; margin: 20px 0;">
                        ${features.map(f => `
                            <div class="premium-card clickable-card hover-lift" data-modal="personalization" style="padding: 24px 16px; cursor: pointer;">
                                <span class="feature-icon">${f.icon}</span>
                                <h3 class="feature-title" style="color: #fff; font-size: 1rem; font-weight: 600; margin-bottom: 8px;">${f.title}</h3>
                                <p class="feature-desc" style="color: var(--gray-400); font-size: 0.85rem;">${f.desc}</p>
                                <span class="click-hint-mini">ℹ️</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="premium-stats-row animate-fade-up">
                        ${stats.map(s => `
                            <div class="premium-stat">
                                <span class="counter-value" data-target="${s.value}">${s.value}</span>
                                <span class="premium-stat-label">${s.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // SLIDE 9: USER LEVELS
        'levels-slide': (slide) => {
            const { intro, levels, earnXP } = slide.content;
            const img = SlidesRenderer.images;
            return `
                <div class="slide-content">
                    <div class="slide-full-bg">
                        <img src="${img.adventure}" alt="Adventure" loading="lazy">
                    </div>
                    <h1 class="premium-title animate-fade-up">${slide.title}</h1>
                    <p class="premium-text animate-fade-up">${intro}</p>
                    <div class="stagger-premium" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; max-width: 1100px; margin: 20px 0;">
                        ${levels.map(level => `
                            <div class="glass-card clickable-card hover-lift" data-modal="level" style="padding: 24px 16px; text-align: left; border-color: ${level.level === 4 ? 'rgba(234, 179, 8, 0.3)' : 'rgba(255,255,255,0.08)'}; cursor: pointer;">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                    <span class="level-icon" style="font-size: 2.5rem;">${level.icon}</span>
                                    <div>
                                        <span style="font-size: 0.75rem; color: var(--primary-400);">Level ${level.level}</span>
                                        <h3 class="level-title" style="color: #fff; font-size: 1.1rem; font-weight: 700;">${level.name}</h3>
                                    </div>
                                </div>
                                <span class="level-desc" style="display: block; color: var(--gray-400); font-size: 0.85rem; margin-bottom: 12px;">${level.xp}</span>
                                <ul style="list-style: none; padding: 0; margin: 0;">
                                    ${level.perks.map(p => `<li style="color: var(--gray-300); font-size: 0.8rem; padding: 4px 0;">• ${p}</li>`).join('')}
                                </ul>
                                <span class="click-hint-mini">ℹ️</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="glass-card animate-fade-up" style="padding: 16px 24px; display: flex; align-items: center; gap: 16px;">
                        <h4 style="color: var(--primary-400); font-size: 0.9rem;">Earn XP by:</h4>
                        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                            ${earnXP.map(method => `<span style="background: rgba(14, 165, 233, 0.2); color: var(--primary-300); padding: 6px 12px; border-radius: 100px; font-size: 0.8rem;">${method}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        },

        // SLIDE 10: BUSINESS MODEL
        'business-slide': (slide) => {
            const { subtitle, models } = slide.content;
            const img = SlidesRenderer.images;
            return `
                <div class="split-screen">
                    <div class="split-content">
                        <h1 class="premium-title animate-fade-up">${slide.title}</h1>
                        <p class="premium-subtitle animate-fade-up">${subtitle}</p>
                        <div class="stagger-premium" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px;">
                            ${models.map(model => `
                                <div class="glass-card-light clickable-card hover-lift" data-modal="business" style="padding: 24px; border-radius: 16px; text-align: left; position: relative; cursor: pointer;">
                                    <span style="position: absolute; top: 12px; right: 12px; background: linear-gradient(135deg, var(--primary-500), var(--accent-cyan)); padding: 4px 12px; border-radius: 100px; font-size: 0.85rem; font-weight: 700;">${model.revenue}</span>
                                    <span class="model-icon" style="font-size: 2.5rem; display: block; margin-bottom: 12px;">${model.icon}</span>
                                    <h3 class="model-title" style="color: #fff; font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">${model.title}</h3>
                                    <p class="model-desc" style="color: var(--gray-400); font-size: 0.9rem;">${model.desc}</p>
                                    <span class="click-hint-mini">ℹ️</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="split-image">
                        <img src="${img.growth_chart}" alt="Business growth" loading="lazy">
                        <div class="split-image-overlay"></div>
                    </div>
                </div>
            `;
        },

        // SLIDE 11: PRICING
        'pricing-slide': (slide) => {
            const { tiers } = slide.content;
            return `
                <div class="slide-content">
                    <h1 class="premium-title animate-fade-up">${slide.title}</h1>
                    <div class="stagger-premium" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1000px; margin-top: 24px;">
                        ${tiers.map(tier => `
                            <div class="premium-pricing-card clickable-card ${tier.highlighted ? 'highlighted' : ''} hover-lift" data-modal="pricing" style="cursor: pointer;">
                                <span class="tier-icon" style="font-size: 3rem; display: block; margin-bottom: 12px;">${tier.icon}</span>
                                <h3 class="tier-title" style="font-size: 1.3rem; font-weight: 700; color: #fff;">${tier.name}</h3>
                                <div style="margin: 16px 0;">
                                    <span class="premium-pricing-price">${tier.price}</span>
                                    <span class="premium-pricing-period">${tier.period}</span>
                                </div>
                                <ul style="list-style: none; padding: 0; margin: 0; text-align: left;">
                                    ${tier.features.map(f => `<li style="color: var(--gray-300); font-size: 0.9rem; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; gap: 8px;"><span style="color: var(--success);">✓</span> ${f}</li>`).join('')}
                                </ul>
                                <span class="click-hint">Click for details</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // SLIDE 12: CREATOR MARKETPLACE
        'marketplace-slide': (slide) => {
            const { headline, forCreators, forTravelers, stats } = slide.content;
            const img = SlidesRenderer.images;
            return `
                <div class="split-screen" style="direction: rtl;">
                    <div class="split-content" style="direction: ltr;">
                        <h1 class="premium-title animate-fade-up">${slide.title}</h1>
                        <p class="premium-subtitle animate-fade-up">${headline}</p>
                        <div class="stagger-premium" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                            <div class="glass-card clickable-card" data-modal="marketplace" style="padding: 24px; border-radius: 16px; text-align: left; border-color: rgba(168, 85, 247, 0.3); cursor: pointer;">
                                <span class="creator-icon" style="font-size: 2rem; margin-bottom: 12px; display: block;">${forCreators.icon}</span>
                                <h3 class="creator-title" style="color: #c4b5fd; font-size: 1.1rem; font-weight: 700; margin-bottom: 12px;">${forCreators.title}</h3>
                                <ul style="list-style: none; padding: 0; margin: 0;">
                                    ${forCreators.benefits.map(b => `<li style="color: var(--gray-300); font-size: 0.9rem; padding: 6px 0;">✨ ${b}</li>`).join('')}
                                </ul>
                                <span class="click-hint">Click for details</span>
                            </div>
                            <div class="glass-card clickable-card" data-modal="marketplace" style="padding: 24px; border-radius: 16px; text-align: left; border-color: rgba(14, 165, 233, 0.3); cursor: pointer;">
                                <span class="traveler-icon" style="font-size: 2rem; margin-bottom: 12px; display: block;">${forTravelers.icon}</span>
                                <h3 class="traveler-title" style="color: var(--primary-300); font-size: 1.1rem; font-weight: 700; margin-bottom: 12px;">${forTravelers.title}</h3>
                                <ul style="list-style: none; padding: 0; margin: 0;">
                                    ${forTravelers.benefits.map(b => `<li style="color: var(--gray-300); font-size: 0.9rem; padding: 6px 0;">🎯 ${b}</li>`).join('')}
                                </ul>
                                <span class="click-hint">Click for details</span>
                            </div>
                        </div>
                        <div class="premium-stats-row animate-fade-up" style="padding: 16px 0; border: none;">
                            ${stats.map(s => `
                                <div class="premium-stat">
                                    <span class="premium-stat-value">${s.value}</span>
                                    <span class="premium-stat-label">${s.label}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="split-image" style="direction: ltr;">
                        <img src="${img.creator}" alt="Content creator" loading="lazy">
                        <div class="split-image-overlay"></div>
                    </div>
                </div>
            `;
        },

        // SLIDE 13: B2B
        'b2b-slide': (slide) => {
            const { subtitle, solutions, pricing } = slide.content;
            const img = SlidesRenderer.images;
            return `
                <div class="split-screen">
                    <div class="split-content">
                        <h1 class="premium-title animate-fade-up">${slide.title}</h1>
                        <p class="premium-subtitle animate-fade-up">${subtitle}</p>
                        <div class="stagger-premium" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;">
                            ${solutions.map(s => `
                                <div class="glass-card-light clickable-card hover-lift" data-modal="b2b" style="padding: 20px; border-radius: 16px; text-align: left; cursor: pointer;">
                                    <span class="b2b-icon" style="font-size: 2rem; display: block; margin-bottom: 10px;">${s.icon}</span>
                                    <h3 class="b2b-title" style="color: #fff; font-size: 1rem; font-weight: 600; margin-bottom: 6px;">${s.title}</h3>
                                    <p class="b2b-desc" style="color: var(--gray-400); font-size: 0.85rem;">${s.desc}</p>
                                    <span class="click-hint-mini">ℹ️</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="glass-card animate-fade-up" style="display: flex; justify-content: center; gap: 32px; padding: 20px;">
                            ${pricing.map(p => `
                                <div style="text-align: center;">
                                    <span style="display: block; color: var(--gray-400); font-size: 0.85rem; margin-bottom: 4px;">${p.tier}</span>
                                    <span style="font-size: 1.2rem; font-weight: 700; color: var(--primary-300);">${p.price}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="split-image">
                        <img src="${img.business_meeting}" alt="Business meeting" loading="lazy">
                        <div class="split-image-overlay"></div>
                    </div>
                </div>
            `;
        },

        // SLIDE 14: REVENUE
        'revenue-slide': (slide) => {
            const { headline, totalRevenue, year, breakdown } = slide.content;
            const img = SlidesRenderer.images;
            return `
                <div class="slide-content">
                    <div class="slide-full-bg">
                        <img src="${img.office}" alt="Office" loading="lazy">
                    </div>
                    <h1 class="premium-title animate-fade-up">${slide.title}</h1>
                    <p class="premium-text animate-fade-up">${headline}</p>
                    <div class="animate-scale-in" style="text-align: center; margin: 24px 0;">
                        <span class="counter-value" style="font-size: 4.5rem;">${totalRevenue}</span>
                        <span style="display: block; color: var(--gray-400); font-size: 1.1rem; margin-top: 8px;">${year}</span>
                    </div>
                    <div class="stagger-premium" style="display: grid; gap: 16px; max-width: 800px; width: 100%;">
                        ${breakdown.map(item => `
                            <div class="glass-card clickable-card" data-modal="revenue" style="padding: 20px; border-radius: 12px; cursor: pointer;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                                    <span class="revenue-title" style="color: #fff; font-weight: 600;">${item.source}</span>
                                    <span style="color: var(--primary-300); font-weight: 700; font-size: 1.2rem;">${item.amount}</span>
                                </div>
                                <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                                    <div style="height: 100%; width: ${item.percentage}%; background: linear-gradient(90deg, var(--primary-500), var(--accent-cyan)); border-radius: 4px;"></div>
                                </div>
                                <p class="revenue-desc" style="color: var(--gray-500); font-size: 0.8rem; margin-top: 8px;">${item.details}</p>
                                <span class="click-hint-mini">ℹ️</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // SLIDE 15: COMPETITIVE ADVANTAGE
        'advantage-slide': (slide) => {
            const { intro, advantages, competitors } = slide.content;
            const img = SlidesRenderer.images;
            return `
                <div class="slide-content">
                    <div class="slide-hero-bg">
                        <img src="${img.hiking}" alt="Reaching the top" loading="lazy">
                    </div>
                    <h1 class="premium-title animate-fade-up">${slide.title}</h1>
                    <p class="premium-subtitle animate-fade-up">${intro}</p>
                    <div class="stagger-premium" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; max-width: 1100px; margin: 20px 0;">
                        ${advantages.map(adv => `
                            <div class="glass-card clickable-card hover-lift" data-modal="advantage" style="padding: 24px 16px; text-align: left; cursor: pointer;">
                                <span class="advantage-icon" style="font-size: 2.5rem; display: block; margin-bottom: 12px;">${adv.icon}</span>
                                <h3 class="advantage-title" style="color: #fff; font-size: 1rem; font-weight: 700; margin-bottom: 8px;">${adv.title}</h3>
                                <p class="advantage-desc" style="color: var(--gray-400); font-size: 0.85rem; margin-bottom: 12px;">${adv.desc}</p>
                                <span style="display: block; color: #fca5a5; font-size: 0.75rem; font-style: italic;">${adv.vsOthers}</span>
                                <span class="click-hint-mini">ℹ️</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="glass-card-light animate-fade-up" style="display: flex; align-items: center; gap: 16px; padding: 12px 24px;">
                        <span style="color: var(--gray-400); font-weight: 600;">vs</span>
                        ${competitors.map(c => `<span style="background: rgba(255,255,255,0.05); padding: 8px 16px; border-radius: 8px; color: var(--gray-400); font-size: 0.9rem;">${c}</span>`).join('')}
                    </div>
                </div>
            `;
        },

        // SLIDE 16: VISION
        'vision-slide': (slide) => {
            const { quote, milestones, mission } = slide.content;
            const img = SlidesRenderer.images;
            return `
                <div class="slide-content">
                    <div class="slide-full-bg">
                        <img src="${img.future}" alt="Future vision" loading="lazy">
                    </div>
                    <h1 class="premium-title animate-fade-up">${slide.title}</h1>
                    <div class="premium-quote animate-fade-up">${quote}</div>
                    <div class="premium-timeline stagger-premium">
                        ${milestones.map(m => `
                            <div class="premium-timeline-item clickable-card" data-modal="vision" style="cursor: pointer;">
                                <div class="premium-timeline-year">${m.year}</div>
                                <div class="premium-timeline-content">
                                    <h3 class="milestone-title">${m.title}</h3>
                                    <p class="milestone-desc">${m.desc}</p>
                                </div>
                                <span class="click-hint-mini" style="position: absolute; top: 8px; right: 8px;">ℹ️</span>
                            </div>
                        `).join('')}
                    </div>
                    <p class="premium-text animate-fade-up" style="font-size: 1.1rem; color: var(--primary-300); margin-top: 24px;">${mission}</p>
                </div>
            `;
        },

        // SLIDE 17: THANK YOU
        'final-slide': (slide) => {
            const { headline, tagline, cta, presenter, contact, demo } = slide.content;
            const img = SlidesRenderer.images;
            return `
                <div class="slide-content">
                    <div class="slide-full-bg">
                        <img src="${img.thank_you}" alt="Thank you" loading="lazy">
                    </div>
                    <h1 class="premium-title animate-fade-up" style="font-size: 3.5rem;">Thank You 🙏</h1>
                    <p class="counter-value animate-fade-up" style="font-size: 2.5rem; margin: 16px 0;">${headline}</p>
                    <div class="glass-card animate-fade-up" style="padding: 24px 40px; display: flex; align-items: center; gap: 24px; margin: 24px 0;">
                        <span style="font-size: 1.1rem;">👤 <strong>${presenter.name}</strong></span>
                        <span style="color: var(--gray-600);">|</span>
                        <span style="color: var(--gray-400);">🏛️ ${presenter.university}</span>
                        <span style="color: var(--gray-600);">|</span>
                        <span style="color: var(--gray-400);">🏢 ${presenter.faculty}</span>
                    </div>
                    <div class="stagger-premium" style="display: flex; gap: 16px; margin: 16px 0;">
                        <a href="mailto:${contact.email}" class="glass-card-light hover-lift" style="padding: 16px 24px; border-radius: 12px; display: flex; align-items: center; gap: 12px; text-decoration: none;">
                            <span style="font-size: 1.5rem;">✉️</span>
                            <span style="color: var(--gray-300);">${contact.email}</span>
                        </a>
                        <a href="https://${contact.github}" target="_blank" class="glass-card-light hover-lift" style="padding: 16px 24px; border-radius: 12px; display: flex; align-items: center; gap: 12px; text-decoration: none;">
                            <span style="font-size: 1.5rem;">💻</span>
                            <span style="color: var(--gray-300);">${contact.github}</span>
                        </a>
                    </div>
                    <div class="animate-fade-up" style="margin-top: 16px;">
                        <span style="color: var(--gray-500); font-size: 0.9rem;">Live Demo:</span>
                        <a href="https://${demo}" target="_blank" style="color: var(--primary-400); font-weight: 600; margin-left: 8px; font-size: 1.1rem;">${demo}</a>
                    </div>
                    <p class="tagline gradient-text-animated animate-float" style="margin-top: 24px; font-size: 1.3rem;">${tagline}</p>
                </div>
            `;
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SlidesRenderer;
}
