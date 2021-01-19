import { Application, send } from "https://deno.land/x/oak/mod.ts";
import router from "./backend/router.ts";
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";

const port: number = 8000;
const app = new Application();

const session = new Session({ framework: "oak", });
await session.init();
app.use(session.use()(session));

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async context => {
    await send(context,
        context.request.url.pathname,
        {
            root: `${Deno.cwd()}/frontend`,
            index: "index.html"
        }
    )
});

app.addEventListener("listen", ({ secure, hostname, port }) => {
    const protocol = secure ? "https://" : "http://";
    const url = `${protocol}${hostname ?? "localhost"}:${port}`;
    console.log(`Listening on: ${port}`);
});

app.listen({ port });