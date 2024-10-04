export interface IProduct {
    id: number;
    name: string;
    quantity:number;
    price: number;
    PrdimgURL: string;
    Material:string;
    categoryID: number;
    isPurchased?: boolean;
}
