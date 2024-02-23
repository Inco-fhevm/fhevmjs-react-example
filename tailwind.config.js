/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "green": "#3FF480",
                "border": "#05225F",
                "blue": "#3673F5",
                "surface": "#020B20",
                "light": "#BCD0FC",
                "blue-dark": "#3B57F6",
            },
            fontFamily: {
                "urb": ["Urbanist"],
            },
        },
    },
    plugins: [],
}
