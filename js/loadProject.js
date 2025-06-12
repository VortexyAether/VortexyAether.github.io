async function loadProject() {
    try {
        const projectId = window.location.pathname.split('/').pop().replace('.html', '');
        const response = await fetch('/data/projects/projects.json');
        const data = await response.json();
        
        const project = data.projects.find(p => p.id === projectId);
        if (!project) throw new Error('Project not found');
        
        const contentResponse = await fetch(project.content);
        const markdown = await contentResponse.text();
        const html = marked.parse(markdown);
        
        document.title = `${project.title} - Vortexy Aether`;
        const articleContainer = document.querySelector('article');
        if (articleContainer) {
            const headerHtml = `
                <div class="mb-8">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover rounded-lg mb-4">
                    <h1 class="text-3xl font-bold text-white mb-2">${project.title}</h1>
                    <div class="flex items-center gap-4 text-sm text-[#adadad] mb-4">
                        <span class="text-[#4F9BF4]">${project.category}</span>
                        <div class="flex gap-2">
                            ${project.techStack.map(tech => 
                                `<span class="px-2 py-1 bg-[#363636] rounded">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `;
            articleContainer.innerHTML = headerHtml + html;
            articleContainer.classList.add('prose-invert');
        }
    } catch (error) {
        console.error('Error loading project:', error);
    }
}