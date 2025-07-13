# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **VortexyAether.github.io** - a personal portfolio website for Jaewon, a Master's student specializing in Computational Fluid Dynamics (CFD) and Machine Learning. The site showcases research projects, blog posts, and includes an interactive fluid simulation demo.

## Architecture

### Frontend Stack
- **Vanilla HTML/CSS/JavaScript** - No framework dependencies
- **TailwindCSS** - Utility-first CSS framework (loaded via CDN)
- **Component-based architecture** - Custom implementation using fetch API

### Key Architecture Patterns

1. **Component System**: Modular HTML components loaded dynamically
   - Header (`/components/header.html`) and Footer (`/components/footer.html`)
   - Loaded via `loadComponents.js` using fetch API
   - Active navigation state managed automatically

2. **Data-Driven Content**: JSON-based content management
   - Projects: `/data/projects/projects.json`
   - Blog posts: `/data/blog-posts.json`
   - Individual project content in markdown files

3. **Dynamic Content Loading**: Async JavaScript functions
   - `loadFeaturedProjects()` - Displays first 2 projects on homepage
   - `loadBlogPosts()` - Loads blog post previews
   - `loadComponent()` - Loads HTML components with active state management

## Development Commands

### Dependencies
```bash
npm install  # Install TailwindCSS, PostCSS, and Autoprefixer
```

### Local Development
- **No build process required** - Static files served directly
- **Live reload**: Use any local server (e.g., `python -m http.server` or VS Code Live Server)
- **TailwindCSS**: Loaded via CDN, no compilation needed

### File Structure
```
/
├── index.html              # Homepage
├── projects.html           # Projects listing
├── blog.html              # Blog listing  
├── contact.html           # Contact page
├── components/            # Reusable HTML components
│   ├── header.html
│   └── footer.html
├── js/                    # JavaScript modules
│   ├── loadComponents.js  # Component loading system
│   ├── loadFeaturedProjects.js
│   ├── loadBlogPosts.js
│   ├── mobileMenu.js      # Mobile navigation
│   └── fluid-simulation.js # WebGL fluid simulation
├── data/                  # JSON data files
│   ├── projects/projects.json
│   └── blog-posts.json
├── projects/              # Individual project pages & content
└── css/styles.css         # Custom styles (mobile menu, sidebar)
```

## Content Management

### Adding New Projects
1. Add project entry to `/data/projects/projects.json`
2. Create project directory: `/projects/{project-id}/`
3. Add `index.md` with project content
4. Create corresponding HTML page: `/projects/{project-id}.html`

### Adding Blog Posts
1. Add post metadata to `/data/blog-posts.json`
2. Create blog post directory and content following existing pattern

### Key Data Structure
Projects require: `id`, `title`, `summary`, `image`, `content`, `category`, `techStack`

## Interactive Features

### Fluid Simulation
- **WebGL-based fluid dynamics** simulation (`fluid-simulation.js`)
- MIT licensed (Pavel Dobryakov)
- Configurable parameters for physics simulation
- Canvas-based rendering in dedicated container

### Mobile Navigation
- Hamburger menu with slide-out sidebar
- CSS transforms for smooth animations
- Touch-friendly interface

## Styling Approach

- **TailwindCSS classes** for most styling
- **Custom CSS** (`css/styles.css`) for:
  - Mobile menu animations
  - Sidebar positioning
  - Component-specific overrides
- **Responsive design** with mobile-first approach
- **Dark theme** with #1a1a1a background

## Important Notes

- **Static hosting optimized** - No server-side processing required
- **GitHub Pages compatible** - Direct deployment from repository
- **Component loading** happens after DOM ready
- **Korean comments** present in some JavaScript files
- **Active navigation** highlighting based on current page URL