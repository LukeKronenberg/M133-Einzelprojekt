import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product, BasketProduct } from "./interfaces.ts";
import { products, basketTemplate } from "./products.ts";

export default {
    allProducts: async (context: any) => {
        if (await context.state.session.get("UserView") === undefined) {
            await context.state.session.set("UserView", [0, '']);
        }
        context.response.body = {
            products: products,
            userview: await context.state.session.get("UserView")
        }
    },
    AddProductById: async (context: any) => {
        if (await context.state.session.get("basket") === undefined) {
            await context.state.session.set("basket", basketTemplate);
        }

        var currentBasket: BasketProduct[] = await context.state.session.get("basket");

        for (var p of currentBasket) {
            if (p.id == context.params.id) {
                p.number++;
            }
        }

        await context.state.session.set("basket", currentBasket);

        context.response.body = {
            basket: currentBasket
        }
    },
    UpdateBasket: async (context: any) => {
        await context.state.session.set("basket", await context.request.body().value);

        context.response.body = {
            success: true
        }
    },
    UpdateUserView: async (context: any) => {
        await context.state.session.set("UserView", await context.request.body().value);
        context.response.body = {
            success: true
        }
    },
    FormSubmission: async (context: any) => {
        var body = await context.request.body().value;
        console.log(body[1])
        if (body[0] != "" && body[1] != "" && body[2] != "") {
            context.state.session.set("basket", basketTemplate)
            context.response.body = {
                success: true
            }
        } else {
            context.response.body = {
                success: false
            }
        }
    }
}