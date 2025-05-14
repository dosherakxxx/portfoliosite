function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    const button = document.getElementById('themeToggle');
    
    button.style.transform = 'scale(0.9)';
    setTimeout(() => button.style.transform = '', 200);
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function updateThemeIcon(theme) {
    const button = document.querySelector('#themeToggle');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => button.style.transform = '', 200);
}

function handleScroll() {
    const header = document.querySelector('.main-header');
    const theme = document.documentElement.getAttribute('data-theme');
    if (window.scrollY > 50) {
        header.style.background = theme === 'dark' ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = theme === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    }
}

window.addEventListener('scroll', handleScroll);

const translations = {
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            skills: 'Skills',
            portfolio: 'Portfolio',
            contact: 'Contact'
        },
        home: {
            title: 'Web Developer',
            subtitle: 'Creating modern and responsive web solutions'
        },
        about: {
            title: 'About Me',
            description: 'I am a passionate web developer with expertise in creating dynamic and user-friendly websites. With a strong foundation in both front-end and back-end development, I bring ideas to life through clean and efficient code.'
        },
        skills: {
            title: 'My Skills',
            html: 'Modern and responsive layouts',
            js: 'Dynamic web applications',
            python: 'Backend development & automation',
            mysql: 'Database design & management',
            php: 'Server-side development'
        },
        contact: {
            title: 'Contact Me',
            name: 'Name',
            email: 'Email',
            message: 'Message',
            send: 'Send Message'
        }
    },
    ru: {
        nav: {
            home: 'Главная',
            about: 'Обо мне',
            skills: 'Навыки',
            portfolio: 'Портфолио',
            contact: 'Контакты'
        },
        home: {
            title: 'Веб-разработчик',
            subtitle: 'Создаю современные адаптивные веб-решения'
        },
        about: {
            title: 'Обо мне',
            description: 'Я увлеченный веб-разработчик с опытом создания динамичных и удобных веб-сайтов. Имею сильную базу как во фронтенд, так и в бэкенд разработке, воплощаю идеи в жизнь через чистый и эффективный код.'
        },
        skills: {
            title: 'Мои навыки',
            html: 'Современные адаптивные макеты',
            js: 'Динамические веб-приложения',
            python: 'Бэкенд разработка и автоматизация',
            mysql: 'Проектирование и управление БД',
            php: 'Серверная разработка'
        },
        contact: {
            title: 'Связаться со мной',
            name: 'Имя',
            email: 'Почта',
            message: 'Сообщение',
            send: 'Отправить'
        }
    }
};

let currentLang = 'en';

function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-button button');
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            if (lang) {
                langButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                switchLanguage(lang);
            }
        });
    });
}

function switchLanguage(lang) {
    if (currentLang === lang) return;
    
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    
    document.body.classList.add('language-switching');
    
    setTimeout(() => {
        updateContent(lang);
        localStorage.setItem('preferred-lang', lang);
        
        setTimeout(() => {
            document.body.classList.remove('language-switching');
        }, 300);
    }, 150);
}

document.documentElement.style.setProperty('scroll-padding-top', '80px');

function updateContent(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate').split('.');
        let translation = translations[lang];
        try {
            key.forEach(k => {
                if (translation && k in translation) {
                    translation = translation[k];
                } else {
                    console.warn(`Translation missing for key: ${key.join('.')} in language: ${lang}`);
                    translation = element.textContent;
                }
            });
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        } catch (error) {
            console.warn(`Error translating element:`, error);
        }
    });
}

// Функции для модального окна
function openModal() {
    const modal = document.getElementById('orderModal');
    document.body.style.overflow = 'hidden';
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('orderModal');
    modal.addEventListener('transitionend', function handler(e) {
        if (e.propertyName === 'opacity' && !modal.classList.contains('active')) {
            document.body.style.overflow = '';
            modal.removeEventListener('transitionend', handler);
        }
    });
    modal.classList.remove('active');
}

const TELEGRAM_TOKEN = '7921213339:AAG13NxWY3ds9TBTmrMjf6sq34t5vPTXaqU'; // Замените на ваш токен бота
const TELEGRAM_CHAT_ID = '7520366041'; // Замените на ваш ID чата

async function sendToTelegram(formData) {
    // Получаем текст выбранной услуги вместо значения
    let serviceText = "";
    if (formData.get('service')) {
        const select = document.getElementById('service');
        const option = select.options[select.selectedIndex];
        serviceText = option ? option.text : formData.get('service');
    }

    const text = `🔥 Новая заявка!

👤 Имя: ${formData.get('name')}
📱 Телефон: ${formData.get('phone')}
🛠 Услуга: ${serviceText}
💬 Сообщение: ${formData.get('message')}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const params = {
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'HTML'
    };

    try {
        const response = await fetch(url + '?' + new URLSearchParams(params));
        const data = await response.json();
        return data.ok;
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        return false;
    }
}

// Массив для хранения отзывов
let reviews = [
    {
        company: 'MainBet',
        message: 'Отличная работа! Сайт полностью соответствует нашим требованиям. Рекомендуем!'
    },
    {
        company: 'EuroTherm',
        message: 'Профессиональный подход к работе. Все выполнено в срок и качественно.'
    }
];

// Функция для добавления нового отзыва
function addReview(review) {
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    renderReviews();
}

// Функция для отображения отзывов
function renderReviews() {
    const reviewsGrid = document.querySelector('.reviews-grid');
    reviewsGrid.innerHTML = reviews.map((review, index) => `
        <div class="review-card">
            <div class="review-header">
                <h3>${review.company}</h3>
                <button class="delete-review" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <p>${review.message}</p>
        </div>
    `).join('');

    // Добавляем обработчики для кнопок удаления
    document.querySelectorAll('.delete-review').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index'));
            deleteReview(index);
        });
    });
}

// Функция удаления отзыва
function deleteReview(index) {
    if (confirm('Вы уверены, что хотите удалить этот отзыв?')) {
        reviews.splice(index, 1);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        renderReviews();
    }
}

// Загрузка отзывов при старте
function initReviews() {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
        reviews = JSON.parse(savedReviews);
    }
    renderReviews();
}

function updateAuthButtons(isLoggedIn) {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const dashboardBtn = document.getElementById('dashboardBtn');
    
    if (isLoggedIn) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        dashboardBtn.style.display = 'block';
    } else {
        loginBtn.style.display = 'block';
        registerBtn.style.display = 'block';
        dashboardBtn.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    initLanguageSwitcher();
    const savedLang = localStorage.getItem('preferred-lang') || 'en';
    switchLanguage(savedLang);

    const logoLink = document.querySelector('.logo-link');
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.reload();
    });

    initReviews();

    // Add event listeners for all order buttons
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (button.textContent.trim() === 'Заказать') {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const card = button.closest('.pricing-card');
                if (card) {
                    const serviceType = card.querySelector('.pricing-header h3').textContent;
                    const serviceSelect = document.getElementById('service');
                    
                    // Set the service in the modal
                    Array.from(serviceSelect.options).forEach(option => {
                        if (option.text === serviceType) {
                            serviceSelect.value = option.value;
                        }
                    });
                }
                openModal();
            });
        }
    });

    // Close modal when clicking outside
    document.getElementById('orderModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    });

    // Close modal when clicking the close button
    document.querySelector('.close-modal').addEventListener('click', closeModal);

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('orderModal').classList.contains('active')) {
            closeModal();
        }
    });

    // Обновленная обработка отправки формы
    document.getElementById('orderForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const success = await sendToTelegram(formData);
            
            if (success) {
                alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
                closeModal();
                e.target.reset();
            } else {
                alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
        }
    });

    // Обработчик формы контактов
    document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const success = await sendToTelegram(formData);
            
            if (success) {
                alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
                e.target.reset();
            } else {
                alert('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.');
        }
    });

    // Обработчик формы отзывов
    document.getElementById('reviewForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newReview = {
            company: formData.get('company'),
            message: formData.get('message')
        };

        const text = `📝 Новый отзыв!

🏢 Компания: ${newReview.company}
💬 Отзыв: ${newReview.message}`;

        try {
            const success = await sendToTelegram({ get: key => formData.get(key), message: text });
            
            if (success) {
                addReview(newReview); // Добавляем отзыв на страницу
                alert('Спасибо за ваш отзыв!');
                e.target.reset();
            } else {
                alert('Произошла ошибка при отправке отзыва. Пожалуйста, попробуйте позже.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке отзыва. Пожалуйста, попробуйте позже.');
        }
    });

    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    mobileMenuClose.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking on links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu();
            // Smooth scroll to section
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Sync theme toggle between desktop and mobile
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }

    // Оптимизация для мобильных устройств
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', e => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', e => {
        touchEndY = e.changedTouches[0].screenY;
        const diffY = touchStartY - touchEndY;

        // Закрываем меню при свайпе вверх
        if (diffY > 50 && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }, { passive: true });

    // Оптимизация прокрутки
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            handleScroll();
        }, 66);
    }, { passive: true });

    // Ленивая загрузка изображений
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Определение поддержки touch
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    // Check auth status on page load
    fetch('/php/auth/check_auth.php')
        .then(response => response.json())
        .then(data => {
            updateAuthButtons(data.isLoggedIn);
        })
        .catch(error => console.error('Auth check error:', error));

    // Keep only smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Cart toggle functionality
    const cartToggle = document.getElementById('cartToggle');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');

    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close cart on outside click
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('section-hidden');
    observer.observe(section);
});
