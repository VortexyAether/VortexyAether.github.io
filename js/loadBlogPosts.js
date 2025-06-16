async function loadBlogPosts() {
  try {
    const response = await fetch('/data/posts/posts.json');
    const data = await response.json();
    
    // blog.html에서는 blog-posts-container, index.html에서는 blog-container 사용
    const blogContainer = document.getElementById('blog-posts-container') || document.getElementById('blog-container');
    if (!blogContainer) return;
    const posts = data.posts;
    
    posts.forEach(post => {
      const postHtml = `
        <div class="bg-[#363636] rounded-lg overflow-hidden mb-6">
          <div class="flex flex-col md:flex-row">
            <div class="flex-[2] p-6">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-[#4F9BF4] text-sm">${post.category}</span>
                <span class="text-[#adadad] text-sm">${post.date}</span>
              </div>
              <h2 class="text-white text-xl font-bold mb-2">${post.title}</h2>
              <p class="text-[#adadad] text-sm mb-4">${post.summary}</p>
              <a href="/blog/${post.id}.html" class="text-[#4F9BF4] hover:underline">
                Read more →
              </a>
            </div>
            <div class="w-full md:w-1/3 flex items-center justify-center p-4 md:p-0">
              <img src="${post.image}" alt="${post.title}" class="w-full h-40 md:h-full object-cover rounded-lg"/>
            </div>
          </div>
        </div>
      `;
      blogContainer.innerHTML += postHtml;
    });
  } catch (error) {
    console.error('Error loading blog posts:', error);
    const blogContainer = document.getElementById('blog-posts-container') || document.getElementById('blog-container');
    if (blogContainer) {
      blogContainer.innerHTML = '<p class="text-[#adadad] p-4">Failed to load blog posts</p>';
    }
  }
}