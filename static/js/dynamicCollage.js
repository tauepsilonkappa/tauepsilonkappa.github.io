/**
 * Dynamic Photo Collage System
 * Automatically adapts to any number of photos and creates optimal layouts
 */

class DynamicCollage {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.photos = [];
        this.init();
    }

    init() {
        this.loadPhotos();
        this.createOptimalLayout();
        this.setupDynamicResizing();
    }

    // Load all photos from the collage
    loadPhotos() {
        const photoItems = this.container.querySelectorAll('.photo-item');
        this.photos = Array.from(photoItems).map((item, index) => ({
            element: item,
            img: item.querySelector('img'),
            index: index,
            aspectRatio: null,
            loaded: false
        }));
    }

    // Add new photos dynamically
    addPhoto(src, alt = 'Dynamic Photo') {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo-item';
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        
        photoDiv.appendChild(img);
        this.container.appendChild(photoDiv);
        
        const photoData = {
            element: photoDiv,
            img: img,
            index: this.photos.length,
            aspectRatio: null,
            loaded: false
        };
        
        this.photos.push(photoData);
        
        // Load the image and analyze it
        this.analyzePhoto(photoData).then(() => {
            this.optimizeLayout();
        });
        
        return photoDiv;
    }

    // Remove a photo
    removePhoto(index) {
        if (this.photos[index]) {
            this.photos[index].element.remove();
            this.photos.splice(index, 1);
            this.optimizeLayout();
        }
    }

    // Analyze photo dimensions and aspect ratio
    analyzePhoto(photoData) {
        return new Promise((resolve) => {
            const img = photoData.img;
            
            if (img.complete && img.naturalWidth > 0) {
                photoData.aspectRatio = img.naturalWidth / img.naturalHeight;
                photoData.loaded = true;
                resolve(photoData);
            } else {
                img.onload = () => {
                    photoData.aspectRatio = img.naturalWidth / img.naturalHeight;
                    photoData.loaded = true;
                    resolve(photoData);
                };
            }
        });
    }

    // Create optimal layout based on photo count and screen size
    createOptimalLayout() {
        // Analyze all photos first
        const analysisPromises = this.photos.map(photo => this.analyzePhoto(photo));
        
        Promise.all(analysisPromises).then(() => {
            this.optimizeLayout();
        });
    }

    // Optimize layout based on analyzed photos
    optimizeLayout() {
        const screenWidth = window.innerWidth;
        const photoCount = this.photos.length;
        
        // Determine optimal grid configuration
        const gridConfig = this.calculateOptimalGrid(photoCount, screenWidth);
        
        // Apply grid configuration
        this.applyGridConfig(gridConfig);
        
        // Assign featured status to interesting photos
        this.assignFeaturedPhotos();
    }

    // Calculate optimal grid based on photo count and screen size
    calculateOptimalGrid(count, screenWidth) {
        let minColumnWidth, maxColumns;
        
        if (screenWidth >= 1600) {
            minColumnWidth = 250;
            maxColumns = 6;
        } else if (screenWidth >= 1200) {
            minColumnWidth = 220;
            maxColumns = 5;
        } else if (screenWidth >= 768) {
            minColumnWidth = 200;
            maxColumns = 4;
        } else if (screenWidth >= 480) {
            minColumnWidth = 150;
            maxColumns = 3;
        } else {
            minColumnWidth = 120;
            maxColumns = 2;
        }
        
        const optimalColumns = Math.min(
            Math.floor(screenWidth / minColumnWidth),
            maxColumns,
            count
        );
        
        return {
            columns: optimalColumns,
            minColumnWidth: minColumnWidth,
            rowHeight: Math.max(120, minColumnWidth * 0.8)
        };
    }

    // Apply grid configuration to the container
    applyGridConfig(config) {
        this.container.style.gridTemplateColumns = `repeat(auto-fit, minmax(${config.minColumnWidth}px, 1fr))`;
        this.container.style.gridAutoRows = `${config.rowHeight}px`;
    }

    // Intelligently assign featured status to photos
    assignFeaturedPhotos() {
        // Clear existing featured classes
        this.photos.forEach(photo => {
            photo.element.classList.remove('featured-large', 'featured-wide', 'featured-tall');
        });
        
        const loadedPhotos = this.photos.filter(photo => photo.loaded);
        if (loadedPhotos.length === 0) return;
        
        // Sort photos by aspect ratio to find interesting ones
        const widePhotos = loadedPhotos.filter(photo => photo.aspectRatio > 1.5);
        const tallPhotos = loadedPhotos.filter(photo => photo.aspectRatio < 0.8);
        const squarePhotos = loadedPhotos.filter(photo => photo.aspectRatio >= 0.8 && photo.aspectRatio <= 1.5);
        
        // Assign featured status strategically
        const maxFeatured = Math.min(3, Math.floor(loadedPhotos.length / 3));
        let featuredCount = 0;
        
        // Make one large featured photo (preferably the first or a square one)
        if (featuredCount < maxFeatured && squarePhotos.length > 0) {
            squarePhotos[0].element.classList.add('featured-large');
            featuredCount++;
        }
        
        // Make some wide photos featured-wide
        if (featuredCount < maxFeatured && widePhotos.length > 0) {
            widePhotos[0].element.classList.add('featured-wide');
            featuredCount++;
        }
        
        // Make some tall photos featured-tall
        if (featuredCount < maxFeatured && tallPhotos.length > 0) {
            tallPhotos[0].element.classList.add('featured-tall');
            featuredCount++;
        }
    }

    // Setup dynamic resizing
    setupDynamicResizing() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.optimizeLayout();
            }, 250);
        });
    }

    // Shuffle photos for variety
    shufflePhotos() {
        for (let i = this.photos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tempElement = this.photos[i].element;
            const tempNextSibling = this.photos[i].element.nextSibling;
            
            this.container.insertBefore(this.photos[i].element, this.photos[j].element);
            this.container.insertBefore(this.photos[j].element, tempNextSibling);
            
            [this.photos[i], this.photos[j]] = [this.photos[j], this.photos[i]];
        }
        
        this.optimizeLayout();
    }

    // Get collage statistics
    getStats() {
        return {
            totalPhotos: this.photos.length,
            loadedPhotos: this.photos.filter(p => p.loaded).length,
            featuredPhotos: this.photos.filter(p => 
                p.element.classList.contains('featured-large') ||
                p.element.classList.contains('featured-wide') ||
                p.element.classList.contains('featured-tall')
            ).length,
            aspectRatios: this.photos.map(p => p.aspectRatio).filter(ar => ar !== null)
        };
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on a page with a collage
    const collageGrid = document.querySelector('.collage-grid');
    if (collageGrid) {
        window.dynamicCollage = new DynamicCollage('.collage-grid');
        
        // Add some helpful functions to the global scope for easy use
        window.addPhoto = (src, alt) => window.dynamicCollage.addPhoto(src, alt);
        window.removePhoto = (index) => window.dynamicCollage.removePhoto(index);
        window.shufflePhotos = () => window.dynamicCollage.shufflePhotos();
        window.getCollageStats = () => window.dynamicCollage.getStats();
        
        console.log('Dynamic Collage initialized! Try these functions:');
        console.log('- addPhoto("path/to/image.jpg", "Alt text")');
        console.log('- removePhoto(index)');
        console.log('- shufflePhotos()');
        console.log('- getCollageStats()');
    }
});
