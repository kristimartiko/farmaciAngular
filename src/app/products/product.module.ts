export class Product {
    public id: number;
    public name: string;
    public price: string;
    public imgPath: string;

    constructor(name: string, price: string, imgPath: string) {
        this.name = name;
        this.price = price;
        this.imgPath = imgPath;
    }
}