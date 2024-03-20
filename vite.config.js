import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@components": "/src/components",
            "@layout": "/src/layout",
            "@pages": "/src/pages",
            "@assets": "/src/assets",
            "@styles": "/src/styles",
            "@hooks": "/src/hooks",
            "@fonts": "/src/fonts",
            "@utils": "/src/utils",
            "@constants": "/src/constants",
            "@toolkits": "/src/toolkits"
        },
    },
});
