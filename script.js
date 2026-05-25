/**
 * PORTFOLIO JAVASCRIPT - Grzegorz Sikorski
 * Obsługa interakcji, efektów wizualnych oraz formularza kontaktowego.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTypingEffect();
    initScrollReveal();
    initActiveNavOnScroll();
    initContactForm();
});

/* ==========================================================================
   1. OBSŁUGA NAWIGACJI (MOBILNE MENU & STICKY NAV)
   ========================================================================== */
function initNavigation() {
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');

    // Przełączanie menu mobilnego
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Zamknięcie menu po kliknięciu w link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Efekt "Sticky Nav" podczas przewijania
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   2. EFEKT PISANIA NA MASZYNIE (TYPING EFFECT)
   ========================================================================== */
function initTypingEffect() {
    const words = [
        "Full-Stack Developerem.",
        "Inżynierem Oprogramowania.",
        "Pasjonatem Nowych Technologii.",
        "Twórcą Aplikacji Webowych."
    ];
    const typingSpan = document.getElementById('typing-text');
    
    if (!typingSpan) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Usuwanie znaków
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Szybsze kasowanie
        } else {
            // Pisanie znaków
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Warunki zmiany stanu
        if (!isDeleting && charIndex === currentWord.length) {
            // Słowo wpisane w całości - zatrzymaj na chwilę
            isDeleting = true;
            typingSpeed = 2000; // Czas wyświetlenia pełnego słowa
        } else if (isDeleting && charIndex === 0) {
            // Słowo skasowane w całości - przejdź do następnego
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 300; // Czas pauzy przed nowym słowem
        }

        setTimeout(type, typingSpeed);
    }

    // Uruchomienie efektu z lekkim opóźnieniem
    setTimeout(type, 1000);
}

/* ==========================================================================
   3. ANIMACJE WEJŚCIA ELEMENTÓW (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // element musi być widoczny w 15%
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Wyłącz obserwację po animacji wejścia
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });
}

/* ==========================================================================
   4. DYNAMICZNA KLASA ACTIVE DLA LINKÓW W MENU PODCZAS SCROLLOWANIA
   ========================================================================== */
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Próg aktywacji (np. gdy przewinięto o 1/3 wysokości danej sekcji)
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   5. OBSŁUGA ZAKŁADEK UMIEJĘTNOŚCI (SKILL TABS)
   ========================================================================== */
window.switchTab = function(event, tabId) {
    // Ukryj wszystkie zawartości zakładek
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Usuń klasę active ze wszystkich przycisków zakładek
    const tabButtons = document.querySelectorAll('.skill-tab');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Pokaż wybraną zakładkę i dodaj klasę active dla klikniętego przycisku
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

