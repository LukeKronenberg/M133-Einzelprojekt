import { Product } from "../backend/interfaces.ts";

export async function LoadProducts() {
    const products: Product[] = (await (await fetch("/products")).json()).data;
    const ProductList = document.getElementById("ProductsContainer");
    for(const product of products){
        ProductList.insertAdjacentHTML(`beforeend`, `
            <div class="ProductOverview" id="${product.id}">
                <img class="ImageOverview" src="./productImages/${product.imageName}" alt="">
                <div class="ProductNameOverview">${product.name}</div>
                <div class="Currentprice">CHF ${product.priceCurrent.toFixed(2)}</div>
                <div class="BasePrice"><strike>CHF ${product.priceBase.toFixed(2)}</div>
            </div>
        `);
    }
}
