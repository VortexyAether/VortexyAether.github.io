async function loadProjects() {
    try {
        const response = await fetch('/data/projects/projects.json');
        const data = await response.json();
        
        const container = document.getElementById('projects-container');
        const projects = data.projects;
        
        projects.forEach(project => {
            const projectHtml = `
                <div class="bg-[#363636] rounded-lg overflow-hidden">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover"/>
                    <div class="p-6">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-[#4F9BF4] text-sm">${project.category}</span>
                        </div>
                        <h3 class="text-white text-xl font-bold mb-2">${project.title}</h3>
                        <p class="text-[#adadad] mb-4">${project.summary}</p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${project.techStack.map(tech => 
                                `<span class="text-sm px-2 py-1 bg-[#1a1a1a] rounded text-[#adadad]">${tech}</span>`
                            ).join('')}
                        </div>
                        <a href="/projects/${project.id}.html" class="text-[#4F9BF4] hover:underline">Learn more →</a>
                    </div>
                </div>
            `;
            
            container.innerHTML += projectHtml;
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}