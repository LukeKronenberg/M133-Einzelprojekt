import { Router } from "https://deno.land/x/oak/mod.ts";
import Controller from "./controller.ts";

const router = new Router();

router
    .get("/products", Controller.allProducts);

export default router;