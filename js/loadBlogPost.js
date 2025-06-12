async function loadBlogPost() {
    try {
        const postId = window.location.pathname.split('/').pop().replace('.html', '');
        const response = await fetch('/data/posts/posts.json');
        const data = await response.json();
        
        const post = data.posts.find(p => p.id === postId);
        if (!post) throw new Error('Post not found');
        
        const contentResponse = await fetch(post.content);
        const markdown = await contentResponse.text();
        const html = marked.parse(markdown);
        
        document.title = `${post.title} - Vortexy Aether`;
        const articleContainer = document.querySelector('article');
        if (articleContainer) {
            articleContainer.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading blog post:', error);
    }
}