import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "./interfaces.ts";
import products from "./products.ts";

export default {
    allProducts: ({ response }: { response: any}) => {
        response.status = 200;
        response.body = {
            success: true,
            data: products
        }
    },
}