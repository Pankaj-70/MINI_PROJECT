/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				typing: {
					"0%": { left: "0%" },
					"40%": { left: "100%" },
					"60%": { left: "100%" },
					"100%": { left: "0%" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"slide-in": {
					"0%": { transform: "translateX(-20px)", opacity: "0" },
					"100%": { transform: "translateX(0)", opacity: "1" },
				},
			},
			animation: {
				spin: "spin 1s linear infinite",
				pulse: "pulse 1.5s ease-in-out infinite",
				typing: "typing 10s steps(12) infinite",
				"fade-in": "fade-in 1s ease-in-out forwards",
				"slide-in": "slide-in 0.8s ease-in-out forwards",
			},
			fontFamily: {
				playwrite: ["Playwrite GB S", "sans-serif"],
				roboto: ["Roboto Slab", "serif"],
				poppins: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				".text-stroke": {
					"-webkit-text-stroke": "1px black",
				},
			});
		},
	],
};
