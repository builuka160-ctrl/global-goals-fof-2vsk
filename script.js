document.addEventListener("DOMContentLoaded", () => {
    // 1. Анимация появления карточек при скролле
    const cards = document.querySelectorAll('.glass-card');
    
    // Устанавливаем начальное состояние (скрыто и смещено вниз)
    gsap.set(cards, { opacity: 0, y: 50 });

    const animateCards = () => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }
        });
    };

    window.addEventListener('scroll', animateCards);
    animateCards(); // Чек при загрузке

    // 2. Логика интерактивного симулятора
    const btn = document.getElementById('fire-btn');
    const percentEl = document.getElementById('ui-percent');
    const firedEl = document.getElementById('ui-fired');
    let firedCount = 0;

    if (btn) {
        // Добавляем текст, если забыл в HTML
        btn.innerText = "ATLAIST DARBINIEKU"; 
        
        btn.addEventListener('click', () => {
            firedCount++;
            let percent = (firedCount * 0.4).toFixed(1);
            
            firedEl.innerText = firedCount;
            percentEl.innerText = percent + "%";

            // Тряска при клике
            gsap.fromTo(percentEl, 
                { x: -5 }, 
                { x: 5, duration: 0.05, repeat: 5, yoyo: true }
            );
            
            if (parseFloat(percent) >= 10) {
                percentEl.style.color = "#dc2626"; // Red-600
            }
        });
    }
});