// ===== UTILITY FUNCTIONS =====

// Set active navigation link
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ===== QUIZ FUNCTIONS =====

// Check quiz answers
function submitQuiz(event) {
    event.preventDefault();
    
    const quizForm = document.getElementById('quizForm');
    if (!quizForm) return;
    
    const questions = document.querySelectorAll('.quiz-question');
    let score = 0;
    let totalQuestions = 0;
    
    questions.forEach((question, index) => {
        const correctAnswer = question.dataset.correct;
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        
        if (selectedOption) {
            totalQuestions++;
            const selectedValue = selectedOption.value;
            
            // Mark correct/incorrect
            const options = question.querySelectorAll('.quiz-option');
            options.forEach(option => {
                const input = option.querySelector('input[type="radio"]');
                option.classList.remove('correct', 'incorrect');
                
                if (input.value === correctAnswer) {
                    option.classList.add('correct');
                }
                
                if (selectedValue === correctAnswer) {
                    if (selectedValue === input.value) {
                        score++;
                    }
                } else if (selectedValue === input.value) {
                    option.classList.add('incorrect');
                }
            });
        }
    });
    
    // Show result
    const resultDiv = document.getElementById('quizResult');
    if (resultDiv) {
        const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
        resultDiv.innerHTML = `
            <div class="score-result">
                <h3>Hasil Kuis Anda</h3>
                <p>Skor: ${score} dari ${totalQuestions} (${percentage}%)</p>
                <p id="resultMessage"></p>
            </div>
        `;
        
        const resultMessage = document.getElementById('resultMessage');
        if (percentage >= 80) {
            resultMessage.textContent = 'Luar biasa! Anda menguasai materi dengan sangat baik! 🎉';
        } else if (percentage >= 60) {
            resultMessage.textContent = 'Bagus! Anda sudah memahami materi dengan cukup baik. 👍';
        } else if (percentage >= 40) {
            resultMessage.textContent = 'Cukup baik, tapi Anda perlu belajar lebih lagi. 📚';
        } else {
            resultMessage.textContent = 'Silakan pelajari kembali materi dan coba lagi. 💪';
        }
        
        // Save score
        localStorage.setItem('quizScore_' + new Date().toLocaleDateString(), JSON.stringify({
            score: score,
            total: totalQuestions,
            percentage: percentage,
            date: new Date().toLocaleString()
        }));
        
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

// Reset quiz
function resetQuiz() {
    const quizForm = document.getElementById('quizForm');
    if (quizForm) {
        quizForm.reset();
    }
    
    const questions = document.querySelectorAll('.quiz-question');
    questions.forEach(question => {
        const options = question.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.classList.remove('correct', 'incorrect');
        });
    });
    
    const resultDiv = document.getElementById('quizResult');
    if (resultDiv) {
        resultDiv.innerHTML = '';
    }
}

// Show previous scores
function showPreviousScores() {
    const scoresDiv = document.getElementById('previousScores');
    if (!scoresDiv) return;
    
    let html = '<h3>Riwayat Nilai Anda</h3>';
    let hasScores = false;
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('quizScore_')) {
            hasScores = true;
            const scoreData = JSON.parse(localStorage.getItem(key));
            html += `
                <div class="info-box-light" style="margin: 0.5rem 0;">
                    <strong>${scoreData.date}</strong><br>
                    Skor: ${scoreData.score}/${scoreData.total} (${scoreData.percentage}%)
                </div>
            `;
        }
    }
    
    if (!hasScores) {
        html += '<p>Belum ada riwayat nilai. Mulai kerjakan kuis sekarang!</p>';
    }
    
    scoresDiv.innerHTML = html;
}

// ===== GALLERY FUNCTIONS =====

// Open image in modal
function openGalleryImage(src, title) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        display: flex;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.7);
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background-color: white;
        padding: 1rem;
        border-radius: 1rem;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = `
        max-width: 100%;
        max-height: 70vh;
        object-fit: contain;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Tutup (X)';
    closeBtn.className = 'btn btn-danger';
    closeBtn.onclick = () => modal.remove();
    
    content.appendChild(img);
    if (title) {
        const titleEl = document.createElement('h3');
        titleEl.textContent = title;
        titleEl.style.marginBottom = '1rem';
        content.insertBefore(titleEl, img);
    }
    content.appendChild(closeBtn);
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== INITIALIZE ON PAGE LOAD =====
window.addEventListener('load', function() {
    // Show previous scores if on kuis page
    if (window.location.pathname.includes('kuis')) {
        setTimeout(showPreviousScores, 500);
    }
    
    // Add animation to elements
    const animateElements = document.querySelectorAll('[data-animate]');
    animateElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ===== PRINT PAGE FUNCTION =====
function printPage() {
    window.print();
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Teks berhasil disalin!');
    }).catch(() => {
        alert('Gagal menyalin teks.');
    });
}

// ===== SEARCH FUNCTION (Optional) =====
function searchContent(query) {
    const contentElements = document.querySelectorAll('h2, h3, p');
    const results = [];
    
    contentElements.forEach(el => {
        if (el.textContent.toLowerCase().includes(query.toLowerCase())) {
            results.push({
                text: el.textContent.substring(0, 100),
                element: el
            });
        }
    });
    
    return results;
}

// ===== FADE IN ANIMATION ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.menu-card, .page-content, .info-box').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
