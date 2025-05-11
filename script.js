function initTheme() {
    const theme = localStorage.getItem('theme') || 'dark';
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
