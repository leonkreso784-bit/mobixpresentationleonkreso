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
        // Generate more detailed content based on the card type
        return `
            <p>${desc}</p>
            <p class="modal-extra">Click anywhere outside to close this popup.</p>
        `;
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
