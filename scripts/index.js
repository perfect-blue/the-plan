    const blogArticles = [
        {
            id: 1,
            title: "Getting Started with Markdown",
            description: "Learn the basics of Markdown syntax",
            markdown: "getting-started.md", 
            date: "2025-05-01"
        },
        {
            id: 2,
            title: "Advanced JavaScript Techniques",
            description: "Explore modern JavaScript features",
            markdown: "advanced-js.md",
            date: "2025-05-03"
        },
        {
            id: 3,
            title: "Building Responsive Websites",
            description: "Tips for creating mobile-friendly sites",
            markdown: "responsive-design.md",
            date: "2025-05-05"
        }
    ];

    function renderArticles(articles, containerElement) {
        articles.forEach(article =>{
            const articleElement = document.createElement('div');
            articleElement.className = 'article-item';
             articleElement.innerHTML = `
                <a href="template/article.html?id=${article.id}" class="article-link">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <small>${article.date}</small>
                </a>
            `;
            
            containerElement.appendChild(articleElement);
        })
    }

    // Draw hexagon pattern
    function drawHexagons(ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const hexRadius = 30;
        const hexHeight = hexRadius * Math.sqrt(3);
        const horizontalSpacing = hexRadius * 1.5;
        const verticalSpacing = hexHeight;
        
        for (let row = 0; row < canvas.height / verticalSpacing + 1; row++) {
            for (let col = 0; col < canvas.width / horizontalSpacing + 1; col++) {
                const x = col * horizontalSpacing + (row % 2 === 0 ? 0 : hexRadius * 0.75);
                const y = row * verticalSpacing * 0.75;
                
                // Create gradient for each hexagon
                const gradient = ctx.createRadialGradient(
                    x, y, 0,
                    x, y, hexRadius
                );
                
                // Generate random colors with good contrast
                const hue = (row * 30 + col * 20) % 360;
                const saturation = 70 + Math.random() * 30;
                const lightness = 40 + Math.random() * 30;
                
                gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, 0.9)`);
                gradient.addColorStop(1, `hsla(${(hue + 30) % 360}, ${saturation}%, ${lightness - 20}%, 0.7)`);
                
                drawHexagon(ctx, x, y, hexRadius, gradient);
            }
        }
    }

    function drawHexagon(ctx, x, y, radius, fillStyle) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = Math.PI / 3 * i;
            const px = x + radius * Math.cos(angle);
            const py = y + radius * Math.sin(angle);
            
            if (i === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        }
        ctx.closePath();
        
        ctx.fillStyle = fillStyle;
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Set canvas dimensions
    function resizeCanvas(ctx) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        drawHexagons(ctx);
    }

    // Clock functionality
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 to 12 for 12 AM
        hours = hours.toString().padStart(2, '0');
        
        document.getElementById('clock').textContent = `${hours}:${minutes} ${ampm}`;
        
        setTimeout(updateClock, 1000);
    }

    // Canvas setup
    const canvas = document.getElementById('mainCanvas');
    if (canvas !== null) {
        const ctx = canvas.getContext('2d');
        window.addEventListener('resize', () => {
            resizeCanvas(ctx);
        });
        
        window.addEventListener('load', () => {
            resizeCanvas(ctx);
            updateClock();
        });
    }
 
    console.log(window.location.pathname)
    if (window.location.pathname === '/blog.html'){
        document.addEventListener('DOMContentLoaded', () => {
            const articlesContainer = document.getElementById('articles-container');
            renderArticles(blogArticles, articlesContainer);
        });
    }
    
    if (window.location.pathname === '/template/article.html'){
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        console.log(articleId)
    }
