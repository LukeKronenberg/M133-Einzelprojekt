const [diagnostics, fileContent] = await Deno.bundle(
    "./frontend/script1.ts",
);

await Deno.writeTextFile("./frontend/script1.js", fileContent);