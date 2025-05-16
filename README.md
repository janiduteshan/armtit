# Classroom AR Experience

A marker-based augmented reality web application that displays 3D models of classroom objects when specific markers are detected.

## Overview

This project creates an interactive AR experience where various classroom objects (desk, chair, blackboard, bookshelf, and globe) appear when their corresponding markers are detected by your device's camera. The application includes animations, sound effects, and particle effects for an engaging experience.

## Requirements

- A device with a camera (smartphone, tablet, or laptop)
- A modern web browser that supports WebXR (Chrome, Firefox, Safari)
- Printed markers (provided in the `patterns` folder)
- Internet connection

## Setup Instructions

### For Users

1. Visit the hosted application URL (provided by your instructor)
2. Allow camera access when prompted
3. Point your device at the printed markers to see the 3D models appear

### For Developers

1. Clone this repository
2. Ensure you have Node.js installed
3. Install a simple HTTP server: `npm install -g http-server`
4. Navigate to the project folder and run: `http-server -c-1`
5. Open a browser and go to `http://localhost:8080` (for desktop testing)

> **IMPORTANT**: For mobile AR testing, you MUST use HTTPS as browsers require secure connections for camera access. See the "HTTPS Setup" section below.

## HTTPS Setup for Mobile Testing

AR applications require camera access, which modern browsers only grant over secure HTTPS connections. We've provided multiple options to enable HTTPS for local development:

### Option 1: Use the Setup Script (Recommended)

We've included a helper script that automates HTTPS setup:

```bash
# Make the script executable
chmod +x setup-https.sh

# Run the script
./setup-https.sh
```

The script offers two methods:
1. **ngrok**: Creates a temporary public HTTPS URL (easiest for quick testing)
2. **Self-signed certificates**: Creates local HTTPS server (better for extended development)

### Option 2: Manual HTTPS Setup

See the `https-setup.md` file for detailed instructions on:
- Using ngrok
- Creating self-signed certificates
- Using mkcert for locally-trusted certificates
- Deploying to GitHub Pages
- Using Netlify CLI

### Option 3: Remote Deployment

For the simplest testing experience, deploy to a service that provides HTTPS:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## Creating Your Own Markers

1. Visit the [AR.js Marker Training](https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html) website
2. Upload an image to use as a marker (high contrast black and white images work best)
3. Download the pattern file (.patt)
4. Place it in the `patterns` folder
5. Update the `index.html` file to reference your new marker

## 3D Models

The application uses 5 classroom-related 3D models:

1. **Desk** - A student desk with animated rotation
2. **Chair** - A classroom chair 
3. **Blackboard** - A traditional classroom blackboard
4. **Bookshelf** - A bookshelf filled with books
5. **Globe** - A world globe with animated rotation

You can replace these models with your own by:
1. Finding GLB/GLTF format 3D models from sites like [Sketchfab](https://sketchfab.com) or [Poly Pizza](https://poly.pizza)
2. Placing them in the `assets` folder
3. Updating the model paths in `index.html`

## Features

- **Marker-based AR** - 3D models appear when markers are detected
- **Animations** - Rotating globe and desk
- **Sound Effects** - Unique sound for each object when detected
- **Particle Effects** - Visual effects when markers are first detected
- **Information Display** - Text descriptions of each object
- **Toggle Controls** - Enable/disable sounds and particles

## Troubleshooting

- **Camera not working**: Ensure you have given camera permissions and are using HTTPS
  - Most modern browsers require HTTPS for camera access
  - iOS Safari is particularly strict about this requirement
  - See the "HTTPS Setup for Mobile Testing" section above
- **Certificate warnings**: For self-signed certificates, you'll need to accept the security warnings
  - On iOS, you may need to go to Settings > General > About > Certificate Trust Settings
- **Models not appearing**: Make sure markers are well-lit and not obscured
  - Avoid glossy paper that causes reflections
  - Ensure markers are printed at sufficient size (ideally 5-10cm)
- **Performance issues**: Try closing other applications or using a device with better specifications

## Group Assignment Details

This project was created as a group assignment for the MTIT course. Each group member contributed one 3D model to the classroom scene:

1. **Member 1**: Desk model and animations
2. **Member 2**: Chair model and sounds
3. **Member 3**: Blackboard model and user interface
4. **Member 4**: Bookshelf model and markers
5. **Member 5**: Globe model and particles

## License

Educational use only - All 3D models and sound effects have proper attribution in the Credits section.