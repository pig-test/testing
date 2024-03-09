const fs = require("fs");
const path = require("path");

const pkg = require("./package.json");

// updatePackageJsonWithExports
(() => {
    const components = pkg.components || [];
    const exports = {
        ".": {
            types: `./dist/index.d.ts`,
            node: {
                require: `./dist/index.cjs`,
                import: `./dist/index.js`,
            },
            browser: {
                require: `./dist/index.js`,
                import: `./dist/index.js`,
            },
            default: `./dist/index.js`,
        },
    };
    components.forEach((component) => {
        const dir = `./${component}`;

        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true });
        }
        fs.mkdirSync(dir);
        fs.writeFileSync(
            `${dir}/package.json`,
            JSON.stringify(
                {
                    name: `cliq-common-components/${component}`,
                    types: `../dist/${component}/index.d.ts`,
                    main: `../dist/${component}/index.js`,
                    module: `../dist/${component}/index.js`,
                    es2015: `../dist/${component}/index.js`,
                    sideEffects: false,
                },
                null,
                4
            )
        );
        exports[`./${component}`] = {
            types: `./dist/${component}/index.d.ts`,
            node: {
                require: `./dist/${component}/index.js`,
                import: `./dist/${component}/index.js`,
            },
            browser: {
                require: `./dist/${component}/index.js`,
                import: `./dist/${component}/index.js`,
            },
            default: `./dist/${component}/index.js`,
        };
    });
    pkg.exports = exports;
    const pathName = path.resolve(process.cwd(), "package.json");
    fs.writeFileSync(pathName, JSON.stringify(pkg, null, 4));
    console.log("package.json updated with exports");
})();
