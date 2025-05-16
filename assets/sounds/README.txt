# Sound Effects for Classroom AR Experience

This folder contains the sound effect files (.mp3) used in the AR Classroom application.

## Required Sound Files

The application requires 5 sound effects corresponding to each classroom object:
1. desk.mp3 - Sound effect for the desk (e.g., writing/tapping on desk)
2. chair.mp3 - Sound effect for the chair (e.g., chair sliding)
3. blackboard.mp3 - Sound effect for the blackboard (e.g., chalk writing)
4. bookshelf.mp3 - Sound effect for the bookshelf (e.g., book pages turning)
5. globe.mp3 - Sound effect for the globe (e.g., spinning sound)

## Where to Find Free Sound Effects

- **Freesound**: https://freesound.org/
- **Mixkit**: https://mixkit.co/free-sound-effects/
- **ZapSplat**: https://www.zapsplat.com/
- **SoundBible**: https://soundbible.com/
- **BBC Sound Effects**: https://sound-effects.bbcrewind.co.uk/

## File Format Requirements

- Use MP3 format for best compatibility
- Maximum recommended file size: 500KB per sound
- Recommended duration: 3-5 seconds
- Recommended bitrate: 128kbps
- Sample rate: 44.1kHz

## Preparing Sound Files

1. **Download** the sound effect in any format
2. **Edit** using tools like:
   - Audacity (free): https://www.audacityteam.org/
   - Adobe Audition
   - Online audio editors
3. **Trim** to 3-5 seconds length
4. **Normalize** volume levels to -3dB
5. **Export** as MP3 at 128kbps

## Sound Selection Tips

- Choose sounds that clearly represent the object
- Avoid sounds with background noise
- Select sounds that are not jarring or too loud
- Ensure sounds have a clear beginning and end
- Choose sounds that work well when repeated

## Naming Convention

- Use lowercase names with no spaces
- Follow the format: objectname.mp3
- Use the same base name as the corresponding 3D model

## Attribution

If using sounds with attribution requirements, please add credits to a CREDITS.md file in the parent directory with:
- Sound name
- Original author
- License
- Source URL

## Troubleshooting

- If sounds don't play, ensure they're in MP3 format
- Check file paths in the HTML file are correct
- Some mobile browsers require user interaction before playing sounds
- Reduce file size if loading is slow
- Sounds might not work in iOS Safari without HTTPS