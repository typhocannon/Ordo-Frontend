// vite.config.ts
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";
import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "Ordo",
  description: "Ordo Description",
  options_ui: {
    page: "src/pages/options/index.html"
  },
  background: {
    service_worker: "src/pages/background/index.ts",
    type: "module"
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: {
      "32": "icon-32.png"
    }
  },
  icons: {
    "128": "icon-128.png"
  },
  permissions: [
    "activeTab"
  ],
  content_scripts: [
    {
      matches: [
        "http://*/*",
        "https://*/*",
        "<all_urls>"
      ],
      js: [
        "src/pages/content/index.tsx"
      ],
      css: [
        "contentStyle.css"
      ]
    }
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: [
        "contentStyle.css",
        "icon-128.png",
        "icon-32.png"
      ],
      matches: []
    }
  ]
};

// manifest.dev.json
var manifest_dev_default = {
  action: {
    default_icon: "public/dev-icon-32.png",
    default_popup: "src/pages/popup/index.html"
  },
  icons: {
    "128": "public/dev-icon-128.png"
  },
  web_accessible_resources: [
    {
      resources: [
        "contentStyle.css",
        "dev-icon-128.png",
        "dev-icon-32.png"
      ],
      matches: []
    }
  ]
};

// package.json
var package_default = {
  name: "vite-web-extension",
  version: "1.3.0",
  description: "A simple chrome & firefox extension template with Vite, React, TypeScript and Tailwind CSS.",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/JohnBra/web-extension.git"
  },
  scripts: {
    build: "vite build",
    dev: "nodemon"
  },
  type: "module",
  dependencies: {
    "@chakra-ui/react": "^2.10.3",
    "@crxjs/vite-plugin": "^1.0.14",
    "@emotion/react": "^11.13.3",
    "@emotion/styled": "^11.13.0",
    "@fortawesome/fontawesome-svg-core": "^6.6.0",
    "@fortawesome/free-solid-svg-icons": "^6.6.0",
    "@fortawesome/react-fontawesome": "^0.2.2",
    "framer-motion": "^11.11.9",
    react: "^18.3.1",
    "react-dom": "^18.3.1",
    "webextension-polyfill": "^0.12.0"
  },
  devDependencies: {
    "@types/chrome": "^0.0.278",
    "@types/node": "^20.12.11",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@types/webextension-polyfill": "^0.10.7",
    "@typescript-eslint/eslint-plugin": "^7.8.0",
    "@typescript-eslint/parser": "^7.8.0",
    "@vitejs/plugin-react": "^1.3.0",
    autoprefixer: "^10.4.19",
    eslint: "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.2",
    "fs-extra": "^11.2.0",
    nodemon: "^3.1.0",
    postcss: "^8.4.38",
    tailwindcss: "^3.4.14",
    "ts-node": "^10.9.2",
    typescript: "^5.6.3",
    vite: "^2.9.15"
  }
};

// vite.config.ts
var root = resolve("/Users/justin/Desktop/Ordo-Frontend", "src");
var pagesDir = resolve(root, "pages");
var assetsDir = resolve(root, "assets");
var outDir = resolve("/Users/justin/Desktop/Ordo-Frontend", "dist");
var publicDir = resolve("/Users/justin/Desktop/Ordo-Frontend", "public");
var isDev = process.env.__DEV__ === "true";
var extensionManifest = {
  ...manifest_default,
  ...isDev ? manifest_dev_default : {},
  name: isDev ? `DEV: ${manifest_default.name}` : manifest_default.name,
  version: package_default.version
};
function stripDevIcons(isDev2) {
  if (isDev2)
    return null;
  return {
    name: "strip-dev-icons",
    resolveId(source) {
      return source === "virtual-module" ? source : null;
    },
    renderStart(outputOptions, inputOptions) {
      const outDir2 = outputOptions.dir;
      fs.rm(resolve(outDir2, "dev-icon-32.png"), () => console.log(`Deleted dev-icon-32.png from prod build`));
      fs.rm(resolve(outDir2, "dev-icon-128.png"), () => console.log(`Deleted dev-icon-128.png from prod build`));
    }
  };
}
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [
    react(),
    crx({
      manifest: extensionManifest,
      browser: "chrome",
      contentScripts: {
        injectCss: true
      }
    }),
    stripDevIcons(isDev)
  ],
  publicDir,
  build: {
    outDir,
    sourcemap: isDev,
    emptyOutDir: !isDev
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBjcngsIE1hbmlmZXN0VjNFeHBvcnQgfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nO1xuXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5qc29uJztcbmltcG9ydCBkZXZNYW5pZmVzdCBmcm9tICcuL21hbmlmZXN0LmRldi5qc29uJztcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nO1xuXG5jb25zdCByb290ID0gcmVzb2x2ZShcIi9Vc2Vycy9qdXN0aW4vRGVza3RvcC9PcmRvLUZyb250ZW5kXCIsICdzcmMnKTtcbmNvbnN0IHBhZ2VzRGlyID0gcmVzb2x2ZShyb290LCAncGFnZXMnKTtcbmNvbnN0IGFzc2V0c0RpciA9IHJlc29sdmUocm9vdCwgJ2Fzc2V0cycpO1xuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShcIi9Vc2Vycy9qdXN0aW4vRGVza3RvcC9PcmRvLUZyb250ZW5kXCIsICdkaXN0Jyk7XG5jb25zdCBwdWJsaWNEaXIgPSByZXNvbHZlKFwiL1VzZXJzL2p1c3Rpbi9EZXNrdG9wL09yZG8tRnJvbnRlbmRcIiwgJ3B1YmxpYycpO1xuXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Ll9fREVWX18gPT09ICd0cnVlJztcblxuY29uc3QgZXh0ZW5zaW9uTWFuaWZlc3QgPSB7XG4gIC4uLm1hbmlmZXN0LFxuICAuLi4oaXNEZXYgPyBkZXZNYW5pZmVzdCA6IHt9IGFzIE1hbmlmZXN0VjNFeHBvcnQpLFxuICBuYW1lOiBpc0RldiA/IGBERVY6ICR7IG1hbmlmZXN0Lm5hbWUgfWAgOiBtYW5pZmVzdC5uYW1lLFxuICB2ZXJzaW9uOiBwa2cudmVyc2lvbixcbn07XG5cbi8vIHBsdWdpbiB0byByZW1vdmUgZGV2IGljb25zIGZyb20gcHJvZCBidWlsZFxuZnVuY3Rpb24gc3RyaXBEZXZJY29ucyAoaXNEZXY6IGJvb2xlYW4pIHtcbiAgaWYgKGlzRGV2KSByZXR1cm4gbnVsbFxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3N0cmlwLWRldi1pY29ucycsXG4gICAgcmVzb2x2ZUlkIChzb3VyY2U6IHN0cmluZykge1xuICAgICAgcmV0dXJuIHNvdXJjZSA9PT0gJ3ZpcnR1YWwtbW9kdWxlJyA/IHNvdXJjZSA6IG51bGxcbiAgICB9LFxuICAgIHJlbmRlclN0YXJ0IChvdXRwdXRPcHRpb25zOiBhbnksIGlucHV0T3B0aW9uczogYW55KSB7XG4gICAgICBjb25zdCBvdXREaXIgPSBvdXRwdXRPcHRpb25zLmRpclxuICAgICAgZnMucm0ocmVzb2x2ZShvdXREaXIsICdkZXYtaWNvbi0zMi5wbmcnKSwgKCkgPT4gY29uc29sZS5sb2coYERlbGV0ZWQgZGV2LWljb24tMzIucG5nIGZyb20gcHJvZCBidWlsZGApKVxuICAgICAgZnMucm0ocmVzb2x2ZShvdXREaXIsICdkZXYtaWNvbi0xMjgucG5nJyksICgpID0+IGNvbnNvbGUubG9nKGBEZWxldGVkIGRldi1pY29uLTEyOC5wbmcgZnJvbSBwcm9kIGJ1aWxkYCkpXG4gICAgfVxuICB9XG59XG5cbi8qXG4qIEJ5IGRlZmF1bHQgdGhpcyB2aXRlIGNvbmZpZyBwcm9kdWNlcyBhIGRpc3QgZm9yIGNocm9tZVxuKiBUbyBidWlsZCBmb3IgZmlyZWZveCBjaGFuZ2UgdGhlIFwiYnJvd3NlclwiIHByb3AgaW4gdGhlIGNyeCBjb25maWcgYmVsb3cgdG8gJ2ZpcmVmb3gnXG4qIEFORCBBTFNPIGNoYW5nZSB0aGUgXCJiYWNrZ3JvdW5kXCIgY29uZmlnIGluIHRoZSBtYW5pZmVzdC5qc29uIHRvIHRoZSBmb2xsb3dpbmc6XG4qIFxue1xuICBcIm1hbmlmZXN0X3ZlcnNpb25cIjogMyxcbiAgXCJuYW1lXCI6IFwiPG5hbWUgaW4gbWFuaWZlc3QuanNvbj5cIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIjxkZXNjcmlwdGlvbiBpbiBtYW5pZmVzdC5qc29uPlwiLFxuICAuLi5cbiAgXCJiYWNrZ3JvdW5kXCI6IFxuICAgIFwic2NyaXB0c1wiOiBbIFwic2VydmljZS13b3JrZXItbG9hZGVyLmpzXCIgXVxuICB9LFxuICAuLi5cbn1cbiogTk9URTogcmVtb3ZlIFwidHlwZVwiIHByb3AgYW5kIFwic2VydmljZV93b3JrZXJcIiBwcm9wIChzdHJpbmcgdmFsKSBcbiogdGhlbiByZXBsYWNlIHdpdGggXCJzY3JpcHRzXCIgcHJvcCAoYXJyYXkgdmFsKVxuKi9cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQHNyYyc6IHJvb3QsXG4gICAgICAnQGFzc2V0cyc6IGFzc2V0c0RpcixcbiAgICAgICdAcGFnZXMnOiBwYWdlc0RpcixcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBjcngoe1xuICAgICAgbWFuaWZlc3Q6IGV4dGVuc2lvbk1hbmlmZXN0IGFzIE1hbmlmZXN0VjNFeHBvcnQsXG4gICAgICBicm93c2VyOiAnY2hyb21lJywgLy8gPC0tIGNoYW5nZSB2YWx1ZSB0byAnZmlyZWZveCcgb3IgJ2Nocm9tZSdcbiAgICAgIGNvbnRlbnRTY3JpcHRzOiB7XG4gICAgICAgIGluamVjdENzczogdHJ1ZSxcbiAgICAgIH1cbiAgICB9KSxcbiAgICBzdHJpcERldkljb25zKGlzRGV2KVxuICBdLFxuICBwdWJsaWNEaXIsXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyLFxuICAgIHNvdXJjZW1hcDogaXNEZXYsXG4gICAgZW1wdHlPdXREaXI6ICFpc0RldlxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFFBQVE7QUFDZixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLFdBQTZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTXRDLElBQU0sT0FBTyxRQUFRLHVDQUF1QyxLQUFLO0FBQ2pFLElBQU0sV0FBVyxRQUFRLE1BQU0sT0FBTztBQUN0QyxJQUFNLFlBQVksUUFBUSxNQUFNLFFBQVE7QUFDeEMsSUFBTSxTQUFTLFFBQVEsdUNBQXVDLE1BQU07QUFDcEUsSUFBTSxZQUFZLFFBQVEsdUNBQXVDLFFBQVE7QUFFekUsSUFBTSxRQUFRLFFBQVEsSUFBSSxZQUFZO0FBRXRDLElBQU0sb0JBQW9CO0FBQUEsRUFDeEIsR0FBRztBQUFBLEVBQ0gsR0FBSSxRQUFRLHVCQUFjLENBQUM7QUFBQSxFQUMzQixNQUFNLFFBQVEsUUFBUyxpQkFBUyxTQUFVLGlCQUFTO0FBQUEsRUFDbkQsU0FBUyxnQkFBSTtBQUNmO0FBR0EsU0FBUyxjQUFlQSxRQUFnQjtBQUN0QyxNQUFJQTtBQUFPLFdBQU87QUFFbEIsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sVUFBVyxRQUFnQjtBQUN6QixhQUFPLFdBQVcsbUJBQW1CLFNBQVM7QUFBQSxJQUNoRDtBQUFBLElBQ0EsWUFBYSxlQUFvQixjQUFtQjtBQUNsRCxZQUFNQyxVQUFTLGNBQWM7QUFDN0IsU0FBRyxHQUFHLFFBQVFBLFNBQVEsaUJBQWlCLEdBQUcsTUFBTSxRQUFRLElBQUkseUNBQXlDLENBQUM7QUFDdEcsU0FBRyxHQUFHLFFBQVFBLFNBQVEsa0JBQWtCLEdBQUcsTUFBTSxRQUFRLElBQUksMENBQTBDLENBQUM7QUFBQSxJQUMxRztBQUFBLEVBQ0Y7QUFDRjtBQXFCQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLElBQUk7QUFBQSxNQUNGLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUNULGdCQUFnQjtBQUFBLFFBQ2QsV0FBVztBQUFBLE1BQ2I7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGNBQWMsS0FBSztBQUFBLEVBQ3JCO0FBQUEsRUFDQTtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLGFBQWEsQ0FBQztBQUFBLEVBQ2hCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsiaXNEZXYiLCAib3V0RGlyIl0KfQo=
