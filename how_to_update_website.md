# How to Update Your Father & Son Memory Book

This guide explains step-by-step how to add new memories, photos, and push them to your live Vercel website.

## Step 1: Save Your Images/Videos
1. Open your project folder.
2. Go to the `public/media` folder.
3. Paste your new images (e.g., `my-photo.jpg`, `video.mp4`) into this folder.

## Step 2: Edit the Data File
Open the file located at `data/memories.json`. This is where all your stories live.

### How to add a single memory with an image:
Scroll to the bottom of the file, add a comma `,` after the last `}`, and add your new block:
```json
  {
    "id": "5",
    "date": "2026-10-03",
    "title": "Zoo Trip",
    "type": "MESSAGE",
    "description": "We saw the lions today!",
    "mediaUrl": "/media/my-photo.jpg",
    "isFavorite": true
  }
```

### How to add MULTIPLE images inside a SINGLE memory block:
If you want to have 2, 3, or more photos attached to the exact same story block, use `"mediaUrls"` (notice the 's') instead of `"mediaUrl"`, and put your image links inside brackets `[ ]`.

```json
  {
    "id": "6",
    "date": "2026-10-04",
    "title": "A Day at the Beach",
    "type": "MESSAGE",
    "description": "Building sandcastles in the morning and swimming in the afternoon.",
    "mediaUrls": [
      "/media/beach1.jpg", 
      "/media/beach2.jpg", 
      "/media/beach3.jpg"
    ]
  }
```
*Note: These images will automatically display nicely in a grid on the timeline, stack beautifully in the full-screen modal, and all of them will individually appear in your Photos section!*

## Step 3: Push to the Live Website
Once you have saved your images in `public/media` and saved the `memories.json` file, you need to push these changes to GitHub so Vercel can update your live site.

Open your Terminal in VSCode (`Ctrl + ~`) and run these exact commands:

```bash
git add .
git commit -m "Added new memories"
git push origin master
```

**That's it!** Wait about 1-2 minutes, refresh your website, and your new memories will be there.
