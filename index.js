    // Canvas setup
        const canvas = document.getElementById('mainCanvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            drawHexagons();
        }
        
        // Draw hexagon pattern
        function drawHexagons() {
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
                    
                    drawHexagon(x, y, hexRadius, gradient);
                }
            }
        }
        
        function drawHexagon(x, y, radius, fillStyle) {
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
        
        // Text scroll functionality with scroll indicator
        const textContainer = document.getElementById('textContainer');
        const scrollThumb = document.getElementById('scrollThumb');
        
        function updateScrollIndicator() {
            const scrollPercentage = textContainer.scrollTop / (textContainer.scrollHeight - textContainer.clientHeight);
            const thumbHeight = Math.max(30, (textContainer.clientHeight / textContainer.scrollHeight) * 60);
            const thumbPosition = (60 - thumbHeight) * scrollPercentage;
            
            scrollThumb.style.height = `${thumbHeight}px`;
            scrollThumb.style.top = `${thumbPosition}px`;
            
            // Show or hide the scroll indicator based on content size
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (textContainer.scrollHeight <= textContainer.clientHeight) {
                scrollIndicator.style.display = 'none';
            } else {
                scrollIndicator.style.display = 'block';
            }
        }
        
        textContainer.addEventListener('scroll', updateScrollIndicator);
        
        // Initialize
        window.addEventListener('resize', () => {
            resizeCanvas();
            updateScrollIndicator();
        });
        
        window.addEventListener('load', () => {
            resizeCanvas();
            updateClock();
            
            // Scroll to bottom initially to show text at the bottom
            textContainer.scrollTop = textContainer.scrollHeight;
            updateScrollIndicator();
        });