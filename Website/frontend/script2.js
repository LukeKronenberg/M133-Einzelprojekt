const ProductOverviewContainer = document.getElementById("ProductOverviewContainer");
const ShopingBasketContainer = document.getElementById("ShopingBasketContainer");
const ShopingBasketProducts = document.getElementById("ShopingBasketProducts");
const ShopingBasketButton = document.getElementsByClassName("ShoppingbasketButton")[0];
const ProductDetailContainer = document.getElementById("ProductDetailContainer");
const ProductDetailImage = document.getElementById("ProductDetailImage");
const ProductDetailName = document.getElementById("ProductDetailName");
const ProductDetailDescription = document.getElementById("ProductDetailDescription");
const ProductDetailPriceCurrent = document.getElementById("ProductDetailPriceCurrent");
const ProductDetailPriceBase = document.getElementById("ProductDetailPriceBase");
const OrderForm = document.getElementById("OrderForm");

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
    ProductsInBasket = (await (await fetch(`/AddToBasket/null`, { method: "POST" })).json()).basket;
    UpdateBasketButton();
    if (response.userview[0] == 0) {
        ChangeView(ProductOverviewContainer, '');
    } else if (response.userview[0] == 1) {
        ChangeView(ProductDetailContainer, `${response.userview[1]}`);
    } else {
        ChangeView(ShopingBasketContainer, '');
    }
}

function ChangeView(targetView, ProductId) {
    ProductOverviewContainer.style.display = "none";
    ProductDetailContainer.style.display = "none";
    ShopingBasketContainer.style.display = "none";

    var targetViewNumber = 0;
    if (targetView == ProductDetailContainer) {
        targetViewNumber = 1;
    } else if (targetView == ShopingBasketContainer) {
        targetViewNumber = 2;
    }

    fetch(`/UpdateUserView`, {
        method: "POST",
        body: JSON.stringify([targetViewNumber, ProductId.replace(`'`, ``)]),
        headers: { 'Content-Type': 'application/json' }
    })

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

async function AddToBasket(ProductId) {
    ProductsInBasket = (await (await fetch(`/AddToBasket/${ProductId}`, { method: "POST" })).json()).basket;
    UpdateBasketButton();
}

function UpdateBasketButton() {
    var Items = 0;
    var Price = 0;
    for (const p of ProductsInBasket) {
        Items += p.number;
        Price += p.priceCurrent * p.number;
    }
    ShopingBasketButton.innerHTML = `🛒Warenkorb🛒 <br>Items: ${Items} <br>Price: ${Price.toFixed(2)}.-`;
}

function UpdateShopingBasket() {
    ShopingBasketProducts.innerHTML = "";
    var TotalPrice = 0;
    for (const p of ProductsInBasket) {
        if (p.number > 0) {
            ShopingBasketProducts.insertAdjacentHTML('afterbegin',
                `<div class="ProductBasketElement">
                    <img src="./productImages/${p.imageName}"/>
                    <div class="ProductBasketTextParent">
                        <div class="ProductName">${p.name}</div>
                        <div>${p.priceCurrent.toFixed(2)}</div>
                        <div class="BasePrice"><strike>${p.priceBase.toFixed(2)}</strike></div>
                        <div class="ShopingBasketProductNumberContainer">
                            <div onclick="ChangeBasket(-1,'${p.id}',this.parentElement)">➖</div>
                            <div>Number: ${p.number}</div>
                            <div onclick="ChangeBasket(1,'${p.id}',this.parentElement)">➕</div>
                        </div>
                    </div>
                </div>`
            );
            TotalPrice += p.priceCurrent;
        }
    }
    if (TotalPrice == 0) {
        ShopingBasketProducts.innerHTML = "<div>Shopping Cart empty</div>";
    }
}

function ChangeBasket(value, id, element) {
    for (var p of ProductsInBasket) {
        if (p.id == id) {
            p.number += value;
            UpdateBasketButton();
            if (p.number <= 0) {
                p.number = 0;
                element.parentElement.parentElement.remove();
            }
            fetch("/UpdateBasket", {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ProductsInBasket),
            });
        }
    }

    element.querySelectorAll("div")[1].innerText = "Number: " + (parseInt(element.querySelectorAll("div")[1].innerText.replace("Number: ", "")) + value);
}

async function SubmitForm(){
    var response = await fetch(`/FormSubmission`, {
        method: "POST",
        body: JSON.stringify([
            OrderForm.querySelectorAll("input")[0].value,
            OrderForm.querySelectorAll("input")[1].value,
            OrderForm.querySelectorAll("input")[2].value
        ])
    })
    if ((await(await response).json()).success) {
        console.log("pog")
    }
}

GetProducts();