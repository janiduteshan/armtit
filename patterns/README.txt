# AR Marker Pattern Instructions

This folder contains the pattern files (.patt) used by the AR.js library to detect and display 3D models.

## How to Generate Your Own Markers

1. Visit the AR.js Marker Generator website:
   https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

2. Upload a simple, high-contrast image (preferably black and white) for each classroom object:
   - desk_image.png
   - chair_image.png
   - blackboard_image.png
   - bookshelf_image.png
   - globe_image.png

3. The pattern file will be generated automatically. Download it and save in this folder with the appropriate name:
   - desk_marker.patt
   - chair_marker.patt
   - blackboard_marker.patt
   - bookshelf_marker.patt
   - globe_marker.patt

4. Print each marker on paper (recommended size: 10cm x 10cm)

## Tips for Good Marker Images

- Use simple, high-contrast designs
- Black and white images work best
- Avoid symmetrical patterns (make each side distinct)
- Add a border around your image
- Test markers in different lighting conditions

## Using the Markers

1. Print all markers
2. Place them on a flat surface
3. Point your device camera at the markers
4. The 3D models will appear on top of the markers in the AR view

## Default Markers

If you don't create your own markers, you can use the Hiro and Kanji markers provided by AR.js:
https://github.com/AR-js-org/AR.js/tree/master/data/images

These are well-tested patterns that work reliably with AR.js.