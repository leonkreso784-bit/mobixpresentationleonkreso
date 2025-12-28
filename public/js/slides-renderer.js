/* =============================================
   MOBIX Presentation - Slides Renderer
   Generates HTML for each slide type
   ============================================= */

const SlidesRenderer = {
    
    // Main render function
    render(slide) {
        const renderer = this.renderers[slide.type];
        if (renderer) {
            return renderer(slide);
        }
        return this.renderDefault(slide);
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
            return `
                <div class="slide-content title-slide-content">
                    <div class="title-header animate-fade-up">
                        <img src="assets/title-font.png" alt="MOBIX" class="title-logo-img">
                        <p class="title-subtitle">${subtitle}</p>
                    </div>
                    
                    <p class="main-description animate-fade-up" style="animation-delay: 0.2s">
                        ${mainText}
                    </p>
                    
                    <div class="features-grid stagger-animation animate">
                        ${features.map(f => `
                            <div class="feature-card hover-lift">
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
            return `
                <div class="slide-content">
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    
                    <div class="problems-grid stagger-animation animate">
                        ${problems.map(p => `
                            <div class="problem-card hover-lift">
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
            return `
                <div class="slide-content">
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    
                    <div class="main-message animate-fade-up">
                        <p>${mainMessage}</p>
                    </div>
                    
                    <div class="solutions-grid stagger-animation animate">
                        ${solutions.map(s => `
                            <div class="solution-card hover-lift">
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
            return `
                <div class="slide-content">
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="slide-subtitle animate-fade-up">${subtitle}</p>
                    
                    <div class="flow-container stagger-animation animate">
                        ${steps.map((step, index) => `
                            <div class="flow-step hover-lift">
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
            return `
                <div class="slide-content">
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="slide-intro animate-fade-up">${intro}</p>
                    
                    <div class="modes-container stagger-animation animate">
                        ${modes.map(mode => `
                            <div class="mode-card mode-${mode.color} hover-lift">
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
            return `
                <div class="slide-content">
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    
                    <div class="cards-comparison stagger-animation animate">
                        <div class="card-type-box hover-lift">
                            <span class="card-type-icon">${travelCards.icon}</span>
                            <h3 class="card-type-title">${travelCards.title}</h3>
                            <p class="card-type-desc">${travelCards.desc}</p>
                            <ul class="card-features-list">
                                ${travelCards.features.map(f => `<li>${f}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="card-type-box hover-lift">
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
            return `
                <div class="slide-content">
                    <div class="badge-container animate-fade-up">
                        <span class="future-badge">${badge}</span>
                    </div>
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <h2 class="slide-main-title animate-fade-up">${mainTitle}</h2>
                    
                    <div class="social-features-grid stagger-animation animate">
                        ${features.map(f => `
                            <div class="social-feature-card hover-lift">
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
            return `
                <div class="slide-content">
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="main-message animate-fade-up">${mainMessage}</p>
                    
                    <div class="personalization-grid stagger-animation animate">
                        ${features.map(f => `
                            <div class="personalization-card hover-lift">
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
            return `
                <div class="slide-content">
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="slide-intro animate-fade-up">${intro}</p>
                    
                    <div class="levels-container stagger-animation animate">
                        ${levels.map(level => `
                            <div class="level-card level-${level.level} hover-lift">
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
            return `
                <div class="slide-content">
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="slide-subtitle animate-fade-up">${subtitle}</p>
                    
                    <div class="business-models-grid stagger-animation animate">
                        ${models.map(model => `
                            <div class="business-card hover-lift">
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
            return `
                <div class="slide-content">
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    
                    <div class="pricing-container stagger-animation animate">
                        ${tiers.map(tier => `
                            <div class="pricing-card ${tier.highlighted ? 'highlighted' : ''} hover-lift">
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
            return `
                <div class="slide-content">
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="headline animate-fade-up">${headline}</p>
                    
                    <div class="marketplace-grid stagger-animation animate">
                        <div class="marketplace-card creators hover-lift">
                            <span class="marketplace-icon">${forCreators.icon}</span>
                            <h3 class="marketplace-title">${forCreators.title}</h3>
                            <ul class="marketplace-benefits">
                                ${forCreators.benefits.map(b => `<li>${b}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="marketplace-card travelers hover-lift">
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
            return `
                <div class="slide-content">
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="slide-subtitle animate-fade-up">${subtitle}</p>
                    
                    <div class="b2b-solutions-grid stagger-animation animate">
                        ${solutions.map(s => `
                            <div class="b2b-card hover-lift">
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
            return `
                <div class="slide-content">
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="headline animate-fade-up">${headline}</p>
                    
                    <div class="revenue-hero animate-scale-in">
                        <span class="revenue-total gradient-text-animated">${totalRevenue}</span>
                        <span class="revenue-year">${year}</span>
                    </div>
                    
                    <div class="revenue-breakdown stagger-animation animate">
                        ${breakdown.map(item => `
                            <div class="revenue-item hover-lift">
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
            return `
                <div class="slide-content">
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    <p class="slide-intro animate-fade-up">${intro}</p>
                    
                    <div class="advantages-grid stagger-animation animate">
                        ${advantages.map(adv => `
                            <div class="advantage-card hover-lift">
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
            return `
                <div class="slide-content vision-slide-content">
                    <h1 class="slide-title gradient-text animate-fade-up">${slide.title}</h1>
                    
                    <blockquote class="vision-quote animate-fade-up">${quote}</blockquote>
                    
                    <div class="timeline stagger-animation animate">
                        ${milestones.map(m => `
                            <div class="timeline-item">
                                <span class="timeline-year">${m.year}</span>
                                <div class="timeline-content hover-lift">
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
            return `
                <div class="slide-content final-slide-content">
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
