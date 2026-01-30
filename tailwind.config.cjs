/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./context/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                'fire-yellow': '#FFFB97',
                'fire-orange': '#FE7F42',
                'fire-red': '#B32C1A',
                'fire-dark': '#2A1617',
                'fire-brown': '#7A4B47',
            }
        },
    },
    plugins: [],
}
