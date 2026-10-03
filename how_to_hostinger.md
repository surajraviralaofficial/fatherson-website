# Hostinger Deployment & Client Handoff Guide

## 1. Storage & Performance Concerns
**Do I need 100GB of external storage?**
**No, you do not!** A typical smartphone photo is around 1MB to 3MB. Even if you upload **1,000 photos**, that is only about 1GB to 3GB of data. Hostinger's standard Web Hosting plans already give you 100GB of built-in NVMe storage, which is more than enough for tens of thousands of memories. 

**Will it slow down the website?**
**No.** Next.js (the technology we built this with) is extremely smart. It uses "lazy loading" (`loading="lazy"` on the images), which means it only loads the 3 or 4 images visible on the user's screen at any time. Even if you have 10,000 photos in your `media` folder, the website will still load instantly!

---

## 2. Preparing the App for Hostinger (Shared Hosting)
If your client is buying a standard Hostinger plan (Shared Web Hosting), it does not have a Node.js server. You will need to export the website as purely static HTML/CSS files. 

### Step 1: Update Next.js Config
1. Open `next.config.ts` in the project.
2. Add the `output: 'export'` option so it looks like this:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### Step 2: Build the Website
1. Open your terminal in VSCode (`Ctrl + ~`).
2. Run this command:
   ```bash
   npm run build
   ```
3. A new folder called `out` will be created in your project. **This `out` folder contains the final, ready-to-host website!**

---

## 3. How the Client Updates the Website
Since you do not want the client using your personal GitHub or dealing with complex Git commands, here is the simplest way for them to update the live Hostinger site:

### The File Manager Method:
1. The client logs into their **Hostinger hPanel**.
2. They click on **File Manager** and open the `public_html` folder (this is where the website lives).
3. **To upload photos:** They open the `media` folder and simply drag-and-drop their new `.jpg` or `.png` images from their computer right into Hostinger's browser window!
4. **To write new memories:** They right-click the `public/data/memories.json` file inside Hostinger's File Manager and click **Edit**. They can literally copy and paste a new memory block right there in the browser, save it, and the live website updates instantly without needing a rebuild!

**Note:** If the client wants to update locally on their computer first (like you are doing now), you can zip the entire project folder, email it to them, and tell them to download VSCode and run `npm run dev` just like you do. But the Hostinger File Manager method is usually easiest for non-technical clients!
