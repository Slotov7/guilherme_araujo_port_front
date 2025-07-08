import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                spaceGrotesk: ["var(--font-space-grotesk)"],
                marope: ["var(--font-marope)"],
            },
        },
    },
    plugins: [],
};
export default config;