async function loadFeaturedProjects() {
    try {
        const response = await fetch('/data/projects/projects.json');
        const data = await response.json();
        
        const container = document.getElementById('featured-projects');
        const featuredProjects = data.projects.slice(0, 2); // 처음 2개 프로젝트만 표시
        
        featuredProjects.forEach(project => {
            const projectHtml = `
              <div class="flex flex-col gap-3 pb-3">
                <a href="/projects/${project.id}.html">
                  <div
                    class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded"
                    style='background-image: url("${project.image}");'
                  ></div>
                  <div>
                    <p class="text-white text-base font-medium leading-normal">${project.title}</p>
                    <p class="text-[#adadad] text-sm font-normal leading-normal">${project.summary}</p>
                  </div>
                </a>
              </div>
            `;
            
            container.innerHTML += projectHtml;
        });
    } catch (error) {
        console.error('Error loading featured projects:', error);
    }
}