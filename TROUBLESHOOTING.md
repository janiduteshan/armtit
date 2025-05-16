# AR Classroom Troubleshooting Guide

## "My 3D Models Aren't Showing Up"

If your AR application loads but no 3D models appear when pointing at markers, follow this step-by-step troubleshooting guide.

## Quick Solutions

Try these solutions first before diving deeper:

1. **Use our working examples:**
   - Open `simple-demo.html` instead of `index.html`
   - Open `working-demo.html` for a version with multiple objects

2. **Check for simplest visibility:**
   - Markers visible? AR.js debug panel showing "Found marker"?
   - Try both Hiro and Kanji markers first (they're built into AR.js)

## Step-by-Step Diagnostics

### 1. Verify HTTPS Connection

**Problem:** Camera access requires HTTPS on most browsers, especially on mobile.

**Solutions:**
- Use our `setup-https.sh` script to create an HTTPS server
- Run `./setup-https.sh` and select option 1 (ngrok) for easiest setup
- Check browser URL starts with `https://` not `http://`

### 2. Confirm Marker Detection

**Problem:** AR.js can't recognize your custom markers.

**Solutions:**
- Turn on AR.js debug UI `debugUIEnabled: true` in your HTML
- Look for "Found marker" message in the UI or console
- Test with standard Hiro marker first (download from [here](https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg))
- Ensure good lighting and no glare on markers
- Print markers at 5-10cm size
- Avoid dark, low-contrast, or tiny marker images

### 3. Fix 3D Model Issues

**Problem:** Models can't load or aren't correctly formatted.

**Solutions:**
- Check browser console (F12) for model loading errors
- Verify model path is correct (e.g., `assets/desk.glb`)
- Test with online models first:
  ```html
  gltf-model="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf"
  ```
- Ensure model files are actually in your `assets` folder
- Try multiple model formats (GLB is most reliable)
- Reduce model size (<5MB) if loading fails

### 4. Adjust Position, Rotation and Scale

**Problem:** Model may be loading but appears too small, too large, or off-screen.

**Solutions:**
- Set position to keep model centered: `position="0 0.5 0"`
- Adjust scale (smaller value = smaller model): `scale="0.1 0.1 0.1"`
- Fix rotation for models that appear sideways: `rotation="-90 0 0"`
- Add animation to see if model is loading but tiny:
  ```html
  animation="property: scale; to: 2 2 2; loop: true; dur: 2000"
  ```

### 5. Fallback to Basic Shapes

**Problem:** Need to verify if any 3D content appears at all.

**Solution:** Add primitives as a test:
```html
<a-marker preset="hiro">
  <a-box position="0 0.5 0" color="red"></a-box>
  <a-sphere position="0 1 0" color="blue" radius="0.5"></a-sphere>
  <a-text value="Test" position="0 1.5 0" align="center"></a-text>
</a-marker>
```

### 6. Browser Compatibility Issues

**Problem:** Some browsers have limited WebXR/AR support.

**Solutions:**
- Test on Chrome for Android (best support)
- For iOS, use Safari (iOS 13+)
- Try different devices if possible
- Update your browser to the latest version
- Disable content blockers and tracking prevention

### 7. Development Environment Issues

**Problem:** Local server configuration problems.

**Solutions:**
- Close and restart your local server
- Clear browser cache with Ctrl+F5 or Cmd+Shift+R
- Try a different port if 8080 is blocked
- If using VSCode Live Server, switch to http-server
- Verify all files are saved before testing

## Using the Working Demo Files

For immediate testing, we've included two working examples:

1. **simple-demo.html** - Uses the Hiro marker and basic shapes
2. **working-demo.html** - Uses multiple markers and online 3D models

To use these:
1. Start HTTPS server using our script: `./setup-https.sh`
2. Open the demo file in your browser
3. Point camera at the appropriate marker
4. Verify AR content appears

## Still Having Issues?

If following all steps above still doesn't resolve your problem:

1. Check the browser console (F12) for specific error messages
2. Try a different browser or device
3. Verify your device supports WebAR (most phones from 2018+ should)
4. Ensure camera permissions are granted
5. Try a completely fresh project from the AR.js examples