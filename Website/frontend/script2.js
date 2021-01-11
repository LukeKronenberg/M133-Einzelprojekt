ProductOverviewContainer = document.getElementById("ProductOverviewContainer");
ProductDetailContainer = document.getElementById("ProductDetailContainer");
ShopingBasketContainer = document.getElementById("ShopingBasketContainer");

const Products = (await (await fetch("/products")).json()).data;
ProductsInBasket = [];

function ChangeView(targetView, ProductId){
    ProductOverviewContainer.style.display = "none";
    ProductDetailContainer.style.display = "none";
    ShopingBasketContainer.style.display = "none";

    targetView.style.display = "";
    if(targetView.id == "ProductDetailContainer"){
        
    } else if(targetView.id == "ShopingBasketContainer"){
        UpdateShopingBasket();
    }
}

function UpdateShopingBasket(){
    console.log("Yes", ProductsInBasket)
    if(ProductsInBasket.length == 0){
        ShopingBasketContainer.innerHTML = "empty";
    }
}