const esbuild = require("esbuild");


esbuild.build({
    entryPoints: ["./src/app.ts"],
    outfile: "./dist/app.js",
    bundle: true,
    sourcemap: true,
    minify: true,
    tsconfig: "tsconfig.json",
    watch: {
        onRebuild(error, result) {
            if (error) console.error('watch build failed:', error)
            else console.log('watch build succeeded:', result)
        },
    }
}).catch(()=>{
    process.exit(1);
});