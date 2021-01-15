import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product, BasketProduct } from "./interfaces.ts";
import { products, basketTemplate } from "./products.ts";

export default {
    allProducts: (context: any) => {
        context.response.status = 200;
        context.response.body = {
            success: true,
            products: products
        }
    },
    AddProductById: async(context: any) => {
        if (await context.state.session.get("basket") === undefined) {
            await context.state.session.set("basket", basketTemplate);                   
        }

        var currentBasket = await context.state.session.get("basket");
        for(var bp of currentBasket){
            if(bp.id == context.params.id){
                bp.number++;
            }
        }

        await context.state.session.set("basket", currentBasket);

        console.log(await context.state.session.get("basket"));

         context.response.body = {
            success: true,
            basket: currentBasket
        } 
    },
}