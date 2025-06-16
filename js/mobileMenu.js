// 모바일 메뉴 초기화 함수
function initializeMobileMenu() {
    console.log('Initializing mobile menu...');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!hamburgerMenu || !closeMenu || !mobileMenu) {
        console.error('Required elements not found:', {
            hamburgerMenu: !!hamburgerMenu,
            closeMenu: !!closeMenu,
            mobileMenu: !!mobileMenu
        });
        return;
    }

    // 햄버거 메뉴 클릭 이벤트
    hamburgerMenu.onclick = function() {
        console.log('Hamburger clicked');
        mobileMenu.style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden';
    };

    // 닫기 버튼 클릭 이벤트
    closeMenu.onclick = function() {
        console.log('Close clicked');
        mobileMenu.style.transform = 'translateX(100%)';
        document.body.style.overflow = '';
    };

    // 모바일 메뉴 링크 클릭 이벤트
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.onclick = function() {
            mobileMenu.style.transform = 'translateX(100%)';
            document.body.style.overflow = '';
        };
    });

    // 화면 크기 변경 이벤트
    window.onresize = function() {
        if (window.innerWidth >= 768) {
            mobileMenu.style.transform = 'translateX(100%)';
            document.body.style.overflow = '';
        }
    };
}

// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // 헤더가 로드되면 모바일 메뉴 초기화
    const checkHeader = setInterval(function() {
        const header = document.getElementById('header');
        if (header && header.innerHTML.includes('hamburger-menu')) {
            console.log('Header found with hamburger menu');
            clearInterval(checkHeader);
            initializeMobileMenu();
        }
    }, 100);

    // 5초 후에도 헤더를 찾지 못하면 인터벌 중지
    setTimeout(function() {
        clearInterval(checkHeader);
    }, 5000);
});

// 컴포넌트가 동적으로 로드될 때도 모바일 메뉴 초기화
document.addEventListener('componentLoaded', function(e) {
    if (e.detail && e.detail.elementId === 'header') {
        console.log('componentLoaded: header');
        initializeMobileMenu();
    }
});