import { Product } from "../backend/interfaces.ts";

export async function LoadProducts() {
    const products: Product[] = (await (await fetch("/products")).json()).products;
    const ProductList = document.getElementById("ProductOverviewContainer");
    for(const product of products){
        ProductList.insertAdjacentHTML(`beforeend`, `
            <div id="${product.id}" class="ProductOverviewElement">
                <img src="./productImages/${product.imageName}" alt="" onclick="ChangeView(ProductDetailContainer, '${product.id}')">
                <div class="ProductName">${product.name}</div>
                <div class="ProductCurrentPrice">CHF ${product.priceCurrent.toFixed(2)}</div>
                <div class="BasePrice"><strike>CHF ${product.priceBase.toFixed(2)}</strike></div>
                <div class="ButtonAddProduct" onclick="AddToBasket('${product.id}')">Add</div>
            </div>
        `);
    }
}
