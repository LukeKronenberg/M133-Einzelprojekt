export interface Product {
    id: string,
    name: string,
    description: string,
    priceCurrent: number,
    priceBase: number,
    imageName: string
}

export interface BasketProduct{
    id: string,
    number: number
}