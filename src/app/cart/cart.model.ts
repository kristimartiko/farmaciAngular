export class Cart {
    public name: string;
    public price: string;
    public imgPath: string;
    public p_id: number;
    public quantity: number;
    public userId: string;
    public id: number;

    constructor(name: string, price: string, img_Path: string, p_id: number, quantity: number, userId: string, id: number) {
        this.name = name;
        this.price = price;
        this.imgPath = img_Path;
        this.p_id = p_id;
        this.quantity = quantity;
        this.userId = userId;
        this.id = id;
    }
}