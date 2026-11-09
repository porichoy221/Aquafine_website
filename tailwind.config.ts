import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.tsx", "./components/**/*.tsx"], theme: { extend: {
  colors: { ocean: "#0E47A1", sky: "#4FC3F7", mist: "#E1F5FE", leaf: "#00C853", eco: "#007A36", ink: "#12263F", paper: "#F7FBFE", line: "#D3E6F2", tint: "#F7FBFE", cyan: { brand: "#4FC3F7" } },
  fontFamily: { display: ['"Fraunces Variable"', "Georgia", "serif"], sans: ['"Hind Siliguri"', "system-ui", "sans-serif"] } } }, plugins: [] } satisfies Config;
