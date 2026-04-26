# Example Input

Drop a short `.mp4` (1-3 minutes) here named `sample.mp4` to run the full pipeline manually.

This directory is gitignored for `*.mp4` files — do not commit real videos.

To generate a synthetic sample locally (requires ffmpeg):

```bash
ffmpeg -f lavfi -i testsrc=duration=10:size=1080x1920:rate=30 \
       -f lavfi -i sine=frequency=440:duration=10 \
       -c:v libx264 -pix_fmt yuv420p -c:a aac sample.mp4
```
