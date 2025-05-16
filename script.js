// AR Classroom Application - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const config = {
        enableSounds: true,
        enableParticles: true,
        debugMode: false
    };

    // Sound effects for different objects
    const sounds = {
        desk: new Audio('assets/sounds/desk.mp3'),
        chair: new Audio('assets/sounds/chair.mp3'),
        blackboard: new Audio('assets/sounds/blackboard.mp3'),
        bookshelf: new Audio('assets/sounds/bookshelf.mp3'),
        globe: new Audio('assets/sounds/globe.mp3')
    };

    // Preload all sounds
    Object.values(sounds).forEach(sound => {
        sound.load();
        sound.volume = 0.5;
    });

    // Initialize counters for tracking marker detections
    let markerCounts = {
        desk: 0,
        chair: 0,
        blackboard: 0,
        bookshelf: 0,
        globe: 0
    };

    // Register for marker events
    const markers = document.querySelectorAll('a-marker');
    markers.forEach(marker => {
        const markerId = marker.getAttribute('id');
        const objectName = markerId.split('-')[0];

        // Event when marker is found
        marker.addEventListener('markerFound', function() {
            console.log(`${objectName} marker detected`);
            markerCounts[objectName]++;
            
            // Play sound if enabled
            if (config.enableSounds) {
                sounds[objectName].play().catch(error => {
                    console.warn('Sound play failed:', error);
                });
            }

            // Show object info popup
            showObjectInfo(objectName);
            
            // Add particles if enabled and it's the first detection
            if (config.enableParticles && markerCounts[objectName] === 1) {
                createParticleEffect(marker, objectName);
            }
        });

        // Event when marker is lost
        marker.addEventListener('markerLost', function() {
            console.log(`${objectName} marker lost`);
            hideObjectInfo();
        });
    });

    // Create particle effect for object appearance
    function createParticleEffect(marker, objectName) {
        const entity = document.createElement('a-entity');
        entity.setAttribute('position', '0 0.5 0');
        entity.setAttribute('particle-system', {
            preset: 'dust',
            color: '#FFFFFF',
            particleCount: 50,
            size: 0.2,
            duration: 2,
            blending: 'additive'
        });
        marker.appendChild(entity);
        
        // Remove particle system after animation completes
        setTimeout(() => {
            marker.removeChild(entity);
        }, 2000);
    }

    // Show information about the detected object
    function showObjectInfo(objectName) {
        const infoElement = document.getElementById('object-info');
        if (infoElement) {
            const objectInfoText = getObjectDescription(objectName);
            infoElement.textContent = objectInfoText;
            infoElement.style.display = 'block';
        }
    }

    // Hide information popup
    function hideObjectInfo() {
        const infoElement = document.getElementById('object-info');
        if (infoElement) {
            infoElement.style.display = 'none';
        }
    }

    // Get description for each classroom object
    function getObjectDescription(objectName) {
        const descriptions = {
            desk: "Student Desk: Where learning happens.",
            chair: "Classroom Chair: Take a seat!",
            blackboard: "Blackboard: Traditional teaching tool.",
            bookshelf: "Bookshelf: Knowledge storage unit.",
            globe: "World Globe: Explore our planet!"
        };
        
        return descriptions[objectName] || "Classroom Object";
    }

    // Create info display element if it doesn't exist
    if (!document.getElementById('object-info')) {
        const infoElement = document.createElement('div');
        infoElement.id = 'object-info';
        infoElement.style.cssText = `
            position: absolute;
            bottom: 70px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px 20px;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            text-align: center;
            z-index: 999;
            display: none;
        `;
        document.body.appendChild(infoElement);
    }

    // Toggle buttons for features
    const controlPanel = document.createElement('div');
    controlPanel.innerHTML = `
        <div style="position: absolute; top: 10px; right: 10px; z-index: 999;">
            <button id="toggle-sound" style="background: #333; color: white; border: none; padding: 5px 10px; margin: 2px; border-radius: 5px;">Sound: ON</button>
            <button id="toggle-particles" style="background: #333; color: white; border: none; padding: 5px 10px; margin: 2px; border-radius: 5px;">Particles: ON</button>
        </div>
    `;
    document.body.appendChild(controlPanel);

    // Add toggle functionality
    document.getElementById('toggle-sound').addEventListener('click', function() {
        config.enableSounds = !config.enableSounds;
        this.textContent = `Sound: ${config.enableSounds ? 'ON' : 'OFF'}`;
    });

    document.getElementById('toggle-particles').addEventListener('click', function() {
        config.enableParticles = !config.enableParticles;
        this.textContent = `Particles: ${config.enableParticles ? 'ON' : 'OFF'}`;
    });

    // Performance monitoring
    if (config.debugMode) {
        const stats = new Stats();
        stats.showPanel(0);
        document.body.appendChild(stats.dom);
        
        function animate() {
            stats.begin();
            stats.end();
            requestAnimationFrame(animate);
        }
        
        animate();
    }

    console.log('AR Classroom application initialized');
});