import { Router } from "https://deno.land/x/oak/mod.ts";
import Controller from "./controller.ts";

const router = new Router();

router
    .get("/products", Controller.allProducts)
    .post("/AddToBasket/:id", Controller.AddProductById)
    .put("/UpdateBasket", Controller.UpdateBasket)
    .post("/UpdateUserView", Controller.UpdateUserView)
    .post("/FormSubmission", Controller.FormSubmission)

export default router;