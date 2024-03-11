import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import pkg from "./package.json";
import { resolve } from "path";
import resolveModule from "@rollup/plugin-node-resolve";
import rollupTypescriptPlugin from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import sourcemaps from "rollup-plugin-sourcemaps";
import babel from "@rollup/plugin-babel";
import typescript from "typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";

const plugins = [
    peerDepsExternal(),
    babel({ babelHelpers: "bundled" }),
    sourcemaps(),
    resolveModule(),
    json(),
    commonjs(),
    postcss({ plugins: [autoprefixer()] }),
    terser({ format: { comments: false } }),
];

const typescriptPlugin = rollupTypescriptPlugin({
    typescript,
});

const combinedBuild = {
    input: "src/react-components/index.ts",
    output: [
        {
            file: resolve("dist", "index.js"),
            format: "esm",
        },
        {
            file: resolve("dist", "index.cjs"),
            format: "cjs",
        },
    ],
    plugins: [...plugins, typescriptPlugin],
};

const componentBuilds = pkg.components.map((component) => {
    return {
        input: `src/react-components/${component}/index.ts`,
        output: [
            {
                file: resolve(`dist/${component}`, "index.js"),
                format: "esm",
            },
            {
                file: resolve(`dist/${component}`, "index.cjs"),
                format: "cjs",
            },
        ],
        plugins: [...plugins, typescriptPlugin],
    };
});

export default [combinedBuild, ...componentBuilds];
