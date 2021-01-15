import { Router } from "https://deno.land/x/oak/mod.ts";
import Controller from "./controller.ts";
import { products } from "./products.ts"

const router = new Router();

router
    .get("/products", Controller.allProducts)
    .post("/AddToBasket/:id", Controller.AddProductById)

export default router;