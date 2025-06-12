async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
    
    // 현재 페이지 URL을 확인하여 활성 링크 스타일 적용
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(`#${elementId} a`);
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath.split('/').pop()) {
        link.classList.add('text-[#4F9BF4]');
      }
    });
  } catch (error) {
    console.error('Error loading component:', error);
  }
}
