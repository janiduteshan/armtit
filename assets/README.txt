# 3D Models for Classroom AR Experience

This folder contains the 3D models (.glb/.gltf files) used in the AR Classroom application.

## Required Models

The application requires 5 classroom-related models:
1. desk.glb - Student desk
2. chair.glb - Classroom chair
3. blackboard.glb - Traditional blackboard
4. bookshelf.glb - Bookshelf with books
5. globe.glb - World globe

## Where to Find Free 3D Models

- **Sketchfab**: https://sketchfab.com/features/free-3d-models
- **Poly Pizza**: https://poly.pizza/
- **TurboSquid**: https://www.turbosquid.com/Search/3D-Models/free
- **CGTrader**: https://www.cgtrader.com/free-3d-models
- **Google Poly Archive**: https://poly.google.com/

## File Format Requirements

- Use glTF (.glb or .gltf) format for best compatibility
- Maximum recommended file size: 5MB per model for good performance
- If using .gltf format, ensure all textures are included

## Preparing Models for AR

1. **Download** the model in glTF/GLB format
2. **Optimize** using tools like:
   - gltf-pipeline: https://github.com/CesiumGS/gltf-pipeline
   - Blender with glTF exporter
3. **Resize** models to have similar scale (A-Frame units are in meters)
4. **Test** in A-Frame before adding to the AR application

## Model Optimization Tips

- Reduce polygon count below 50,000 triangles
- Compress textures to JPG or PNG format
- Maximum texture resolution: 1024x1024
- Remove unnecessary bones/animations
- Use Draco compression for larger models

## Naming Convention

- Use lowercase names with no spaces
- Follow the format: objectname.glb
- Use descriptive names related to the classroom object

## Sound Files

The 'sounds' subfolder should contain corresponding audio files:
- desk.mp3
- chair.mp3
- blackboard.mp3 
- bookshelf.mp3
- globe.mp3

Keep sound files short (3-5 seconds) and under 500KB each.

## Attribution

If using models with attribution requirements, please add credits to a CREDITS.md file in this directory with:
- Model name
- Original author
- License
- Source URL