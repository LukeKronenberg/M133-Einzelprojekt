const ProductOverviewContainer = document.getElementById("ProductOverviewContainer");
const ShopingBasketContainer = document.getElementById("ShopingBasketContainer");
const ShopingBasketButton = document.getElementsByClassName("ShoppingbasketButton")[0];
const ProductDetailContainer = document.getElementById("ProductDetailContainer");
const ProductDetailImage = document.getElementById("ProductDetailImage");
const ProductDetailName = document.getElementById("ProductDetailName");
const ProductDetailDescription = document.getElementById("ProductDetailDescription");
const ProductDetailPriceCurrent = document.getElementById("ProductDetailPriceCurrent");
const ProductDetailPriceBase = document.getElementById("ProductDetailPriceBase");

const Products = [];
ProductsInBasket = [];

async function GetProducts() {
    var response = await (await fetch("/products")).json();
    for (const Product of response.products) {
        Products.push({
            id: Product.id,
            name: Product.name,
            description: Product.description,
            priceCurrent: Product.priceCurrent,
            priceBase: Product.priceBase,
            imageName: Product.imageName
        })
    }
    ProductsInBasket = (await (await fetch(`/AddToBasket/yes`, { method: "POST" })).json()).basket;
    UpdateBasketButton();
}

function ChangeView(targetView, ProductId) {
    ProductOverviewContainer.style.display = "none";
    ProductDetailContainer.style.display = "none";
    ShopingBasketContainer.style.display = "none";

    targetView.style.display = "";
    if (targetView.id == "ProductDetailContainer") {
        Products.forEach(async Product => {
            if (Product.id == ProductId) {
                ProductDetailImage.src = `./productImages/${Product.imageName}`;
                ProductDetailName.innerText = Product.name;
                ProductDetailDescription.innerText = Product.description;
                ProductDetailPriceCurrent.innerText = `CHF ${Product.priceCurrent}`;
                ProductDetailPriceBase.innerHTML = `<strike>CHF: ${Product.priceBase}`;
            }
        })
    } else if (targetView.id == "ShopingBasketContainer") {
        UpdateShopingBasket();
    }
}

async function AddToBasket(ProductId){
    ProductsInBasket = (await (await fetch(`/AddToBasket/${ProductId}`, { method: "POST" })).json()).basket;
    UpdateBasketButton();
}

function UpdateBasketButton(){
    var value = 0;
    for(const p of ProductsInBasket){
        value += p.number;
    }
    ShopingBasketButton.innerHTML = `🛒Warenkorb🛒&#10;&#13;Items: ${value}`;
}

function UpdateShopingBasket() {
    if (ProductsInBasket.length == 0) {
        ShopingBasketContainer.innerHTML = "empty";
    }
}

GetProducts();