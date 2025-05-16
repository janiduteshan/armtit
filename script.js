/**
 * Classroom AR Experience - Core Application Logic
 * 
 * This module handles marker detection, 3D model rendering, and interactive UI elements
 * for an augmented reality educational experience targeting classroom environments.
 * 
 * @author Classroom AR Team
 * @version 1.0.0
 */
document.addEventListener('DOMContentLoaded', function() {
    // Application configuration parameters
    const config = {
        enableSounds: true,     // Toggle audio feedback
        enableParticles: true,  // Toggle particle effects on marker detection
        debugMode: false        // Enable performance monitoring and debug logs
    };

    // Audio resources mapping for object-specific sound effects
    const sounds = {
        desk: new Audio('assets/sounds/desk.mp3'),
        chair: new Audio('assets/sounds/chair.mp3'),
        blackboard: new Audio('assets/sounds/blackboard.mp3'),
        bookshelf: new Audio('assets/sounds/bookshelf.mp3'),
        globe: new Audio('assets/sounds/globe.mp3')
    };

    // Preload audio assets to minimize latency during runtime
    Object.values(sounds).forEach(sound => {
        sound.load();
        sound.volume = 0.5; // Set consistent volume level across all audio
    });

    // Detection counters to track marker visualization instances
    // Used for optimization and one-time effect triggering
    let markerCounts = {
        desk: 0,
        chair: 0,
        blackboard: 0,
        bookshelf: 0,
        globe: 0
    };

    /**
     * Initialize marker event listeners for AR detection
     * Handles marker detection/loss events and triggers appropriate visual/audio feedback
     */
    const markers = document.querySelectorAll('a-marker');
    markers.forEach(marker => {
        const markerId = marker.getAttribute('id');
        const objectName = markerId.split('-')[0];

        // Handle marker detection event
        marker.addEventListener('markerFound', function() {
            if (config.debugMode) console.log(`AR Detection: ${objectName} marker identified`);
            markerCounts[objectName]++;
            
            // Trigger audio feedback based on configuration
            if (config.enableSounds) {
                sounds[objectName].play().catch(error => {
                    console.warn(`Audio playback failed for ${objectName}:`, error);
                });
            }

            // Display contextual information for the detected object
            showObjectInfo(objectName);
            
            // Generate particle effects for first-time detections
            if (config.enableParticles && markerCounts[objectName] === 1) {
                createParticleEffect(marker, objectName);
            }
        });

        // Handle marker loss event
        marker.addEventListener('markerLost', function() {
            if (config.debugMode) console.log(`AR Detection: ${objectName} marker lost`);
            hideObjectInfo();
        });
    });

    /**
     * Generate particle visual effects for marker detection
     * Creates a temporary particle system entity attached to the detected marker
     * 
     * @param {HTMLElement} marker - The A-Frame marker element
     * @param {string} objectName - Name of the detected object
     */
    function createParticleEffect(marker, objectName) {
        // Create A-Frame entity for particle system
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
        
        // Cleanup: Remove particle system once animation completes
        setTimeout(() => {
            marker.removeChild(entity);
        }, 2000);
    }

    /**
     * Display information panel for the detected object
     * Shows contextual information about the currently detected AR object
     * 
     * @param {string} objectName - Name of the detected object
     */
    function showObjectInfo(objectName) {
        const infoElement = document.getElementById('object-info');
        if (infoElement) {
            const objectInfoText = getObjectDescription(objectName);
            infoElement.textContent = objectInfoText;
            infoElement.style.display = 'block';
            
            // Apply animation reset to trigger animation effect
            infoElement.style.animation = 'none';
            setTimeout(() => {
                infoElement.style.animation = 'slideUp 0.3s ease-out';
            }, 10);
        }
    }

    /**
     * Hide the information panel when marker is lost
     */
    function hideObjectInfo() {
        const infoElement = document.getElementById('object-info');
        if (infoElement) {
            infoElement.style.display = 'none';
        }
    }

    /**
     * Retrieve descriptive text for each classroom object
     * Returns educational context for the detected AR objects
     * 
     * @param {string} objectName - Name of the detected object
     * @returns {string} Descriptive text for the object
     */
    function getObjectDescription(objectName) {
        const descriptions = {
            desk: "Student Desk: Individual workspace designed for focused learning and collaboration",
            chair: "Classroom Chair: Ergonomic seating designed for proper posture during learning sessions",
            blackboard: "Blackboard: Traditional visual communication tool for educational content delivery",
            bookshelf: "Bookshelf: Storage system for educational resources and reference materials",
            globe: "World Globe: Three-dimensional geographical representation for spatial learning"
        };
        
        return descriptions[objectName] || "Classroom Object";
    }

    // Initialize dynamic UI elements if not defined in HTML
    if (!document.getElementById('object-info')) {
        const infoElement = document.createElement('div');
        infoElement.id = 'object-info';
        infoElement.style.cssText = `
            position: absolute;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(40, 44, 52, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            text-align: center;
            z-index: 999;
            max-width: 80%;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            animation: slideUp 0.3s ease-out;
            display: none;
        `;
        document.body.appendChild(infoElement);
    }

    // Initialize UI controls if they don't exist in HTML
    if (!document.querySelector('.ui-panel')) {
        const controlPanel = document.createElement('div');
        controlPanel.className = 'ui-panel';
        controlPanel.innerHTML = `
            <button id="toggle-sound" class="ui-button">Sound: ON</button>
            <button id="toggle-particles" class="ui-button">Effects: ON</button>
            <button id="toggle-help" class="ui-button">Show Help</button>
        `;
        document.body.appendChild(controlPanel);
    }

    // Attach event listeners to control buttons
    document.getElementById('toggle-sound').addEventListener('click', function() {
        config.enableSounds = !config.enableSounds;
        this.textContent = `Sound: ${config.enableSounds ? 'ON' : 'OFF'}`;
        
        // Provide visual feedback for state change
        this.style.backgroundColor = config.enableSounds ? 
            'rgba(40, 44, 52, 0.85)' : 'rgba(80, 30, 30, 0.85)';
    });

    document.getElementById('toggle-particles').addEventListener('click', function() {
        config.enableParticles = !config.enableParticles;
        this.textContent = `Effects: ${config.enableParticles ? 'ON' : 'OFF'}`;
        
        // Provide visual feedback for state change
        this.style.backgroundColor = config.enableParticles ? 
            'rgba(40, 44, 52, 0.85)' : 'rgba(80, 30, 30, 0.85)';
    });

    /**
     * Initialize performance monitoring in debug mode
     * Adds FPS counter and performance stats when debug mode is enabled
     */
    if (config.debugMode) {
        // Dynamically load Stats.js if not already available
        if (typeof Stats === 'undefined') {
            console.warn('Stats.js not found. Performance monitoring disabled.');
        } else {
            const stats = new Stats();
            stats.showPanel(0); // 0: fps, 1: ms, 2: mb
            stats.dom.style.cssText = 'position:absolute;top:0;left:0;z-index:1000;';
            document.body.appendChild(stats.dom);
            
            function animate() {
                stats.begin();
                stats.end();
                requestAnimationFrame(animate);
            }
            
            animate();
            console.info('Performance monitoring initialized');
        }
    }

    // Add version information tracking to console
    console.info('Classroom AR Experience v1.0.0 initialized successfully');
});