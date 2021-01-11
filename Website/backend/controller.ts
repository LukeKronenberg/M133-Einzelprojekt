import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "./interfaces.ts";
import products from "./products.ts";

export default {
    allProducts: (ctx: any) => {
        ctx.response.status = 200;
        ctx.response.body = {
            success: true,
            products: products
        }
    },
    AddProductById: async(ctx: any) => {
        console.log(ctx.state)
        await ctx.state.session.set("Basket", 0);
        

        /* await ctx.state.session.set("Basket", (await ctx.state.session.get("Basket")).push(
            products.filter(product => product.id !== ctx.params.id)
        )); */

         ctx.response.body = {
            success: true,
        } 
    },
}