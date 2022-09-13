// rollup.config.js
import typescript from "@rollup/plugin-typescript";

const esm = {
  input: "lib/index.ts",
  output: {
    file: "dist/router.mjs",
    format: "esm"
  },
  plugins: [
    typescript(),
  ]
};

export default [ esm ];