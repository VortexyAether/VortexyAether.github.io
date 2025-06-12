async function loadBlogPosts() {
  try {
    const response = await fetch('/data/posts/posts.json');
    const data = await response.json();
    
    const blogContainer = document.getElementById('blog-container');
    const posts = data.posts.slice(0, 3); // 최근 3개의 포스트만 표시
    
    posts.forEach(post => {
      const postHtml = `
        <div class="p-4">
          <div class="flex items-stretch justify-between gap-4 bg-[#363636] rounded-lg overflow-hidden">
            <div class="flex flex-[2_2_0px] flex-col gap-4 p-6">
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <span class="text-[#4F9BF4] text-sm">${post.category}</span>
                  <span class="text-[#adadad] text-sm">${post.date}</span>
                </div>
                <h3 class="text-white text-xl font-bold">${post.title}</h3>
                <p class="text-[#adadad] text-sm">${post.summary}</p>
              </div>
              <a href="/blog/${post.id}.html" class="text-[#4F9BF4] hover:underline">
                Read more →
              </a>
            </div>
            <div class="w-1/3">
              <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover"/>
            </div>
          </div>
        </div>
      `;
      
      blogContainer.innerHTML += postHtml;
    });
  } catch (error) {
    console.error('Error loading blog posts:', error);
    const blogContainer = document.getElementById('blog-container');
    blogContainer.innerHTML = '<p class="text-[#adadad] p-4">Failed to load blog posts</p>';
  }
}