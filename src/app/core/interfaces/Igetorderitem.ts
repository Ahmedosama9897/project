export interface Igetitem {
    message: string;
    data: Datum[];
}

export interface Datum {
    Order_ID: number;
    Item_ID: string;
    Quantity: number;
    Price_out: number;
    Discount: number;
    Item_Name: string;
    Rate: number;
    Image_Cover: string;
    Category_Image: string;
    Sub_Category_Name: string;
}