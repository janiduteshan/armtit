# AR Classroom Developer Guide

This guide provides comprehensive instructions for developing, modifying, and testing the Classroom AR Experience application.

## Table of Contents

1. [Development Environment Setup](#development-environment-setup)
2. [Project Structure](#project-structure)
3. [Local Development Server](#local-development-server)
4. [Adding New 3D Models](#adding-new-3d-models)
5. [Creating Custom Markers](#creating-custom-markers)
6. [Adding Sounds and Effects](#adding-sounds-and-effects)
7. [Testing the Application](#testing-the-application)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

## Development Environment Setup

### Required Software

- **Text Editor/IDE**: VSCode, Sublime Text, or any preferred code editor
- **Node.js**: Latest LTS version
- **NPM/Yarn**: For package management
- **Git**: For version control
- **Modern Web Browser**: Chrome, Firefox, Safari with WebXR support

### Initial Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd AR-Classroom
   ```

2. Install development dependencies:
   ```
   npm install -g http-server
   ```

## Project Structure

```
AR-Classroom/
├── index.html          # Main application HTML
├── script.js           # Application JavaScript logic
├── README.md           # Project documentation
├── DEVELOPER-GUIDE.md  # This developer guide
├── assets/             # 3D models and sound files
│   ├── sounds/         # Sound effect files
│   └── README.txt      # Guide for 3D models
├── patterns/           # AR marker pattern files
│   └── README.txt      # Guide for marker creation
```

## Local Development Server

To run the application locally:

1. Navigate to the project folder:
   ```
   cd path/to/AR-Classroom
   ```

2. Start a local server:
   ```
   http-server -c-1 -p 8080
   ```

3. Access the application:
   - Open a browser and navigate to `http://localhost:8080`
   - For mobile testing, use your machine's local IP address (e.g., `http://192.168.1.100:8080`)

> **Note**: For AR camera access on mobile browsers, you'll need to use HTTPS. Consider using ngrok or GitHub Pages for this.

## Adding New 3D Models

1. **Find suitable 3D models** in GLB/GLTF format from sources like Sketchfab or Poly Pizza
2. **Optimize the model** for web use (reduce polygons, compress textures)
3. **Add the model file** to the `assets/` directory
4. **Update index.html** by adding a new marker section:

```html
<!-- New Object Marker and 3D Model -->
<a-marker type="pattern" url="patterns/new_object_marker.patt" id="new-object-marker">
    <a-entity
        position="0 0 0"
        rotation="-90 0 0"
        scale="0.5 0.5 0.5"
        gltf-model="assets/new_object.glb"
        sound="src: assets/sounds/new_object.mp3; on: markerFound; volume: 0.5;">
    </a-entity>
</a-marker>
```

5. **Update script.js** to include the new object in the sounds and descriptions objects

## Creating Custom Markers

1. Visit the [AR.js Marker Training website](https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html)
2. Upload a high-contrast image (black and white works best)
3. Download the generated `.patt` file
4. Save it to the `patterns/` directory
5. Update the marker URL in your HTML file to point to this new pattern file
6. Print the marker image for testing

## Adding Sounds and Effects

### Sound Effects

1. Find appropriate sound effects in MP3 format (3-5 seconds duration)
2. Place them in the `assets/sounds/` directory
3. Link them in your HTML using the A-Frame sound component:
   ```html
   sound="src: assets/sounds/your_sound.mp3; on: markerFound; volume: 0.5;"
   ```

### Particle Effects

To add particle effects to a model:

```html
<a-entity position="0 0.5 0" 
          particle-system="preset: dust; particleCount: 50; color: #FFFFFF;">
</a-entity>
```

Available presets include: dust, snow, rain, and fire.

### Animations

To add custom animations:

```html
<a-entity animation="property: rotation; to: 0 360 0; loop: true; dur: 10000;">
</a-entity>
```

## Testing the Application

### Browser Testing

1. Open Chrome/Firefox Developer Tools (F12)
2. Use the Console tab to check for errors
3. Use the Network tab to verify assets are loading
4. Test with the AR.js debug parameter: `arjs="debugUIEnabled: true;"`

### Mobile Testing

1. Ensure your device and development machine are on the same network
2. Access the application via your machine's local IP address
3. Test in good lighting conditions with printed markers
4. Test in different browsers (Chrome, Safari, Firefox)

### Performance Testing

Monitor for:
- Frame rate drops
- Asset loading times
- Camera initialization issues
- Memory usage over time

Use the A-Frame stats component to monitor performance:
```html
<a-scene stats="true">
```

## Deployment

### GitHub Pages

1. Push your project to a GitHub repository
2. Enable GitHub Pages in the repository settings
3. Access your application at `https://username.github.io/repository-name/`

### Other Hosting Options

- Netlify
- Vercel
- Firebase Hosting
- Any static website hosting service

## Troubleshooting

### Common Issues

1. **Camera access denied**
   - Ensure you're using HTTPS for mobile browsers
   - Check browser permissions

2. **Models not appearing**
   - Verify marker patterns are correctly loaded
   - Check model file paths are correct
   - Ensure lighting conditions are adequate

3. **Performance issues**
   - Reduce model complexity
   - Optimize texture sizes
   - Reduce the number of simultaneous models

4. **Sound not playing**
   - Some browsers require user interaction before playing sounds
   - Verify file paths and formats
   - Check browser console for errors

### Debug Mode

Enable AR.js debug mode to help identify issues:

```html
<a-scene arjs="debugUIEnabled: true;">
```

This will show camera feed quality and marker detection status.