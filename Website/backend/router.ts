import { Router } from "https://deno.land/x/oak/mod.ts";
import Controller from "./controller.ts";
import products from "./products.ts"

const router = new Router();

router
    .get("/products", (ctx) => {
        ctx.response.status = 200;
        ctx.response.body = {
            success: true,
            products: products
        }})
    .post("/AddToBasket/:id", async(ctx) => {
        console.log(ctx.state)
        await ctx.state.session.set("Basket", 0);
        

        /* await ctx.state.session.set("Basket", (await ctx.state.session.get("Basket")).push(
            products.filter(product => product.id !== ctx.params.id)
        )); */

         ctx.response.body = {
            success: true,
        }})

export default router;