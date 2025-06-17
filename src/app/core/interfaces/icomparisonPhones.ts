export interface PhoneProduct {
    data: Datum[];
}

export interface Datum {
    Item_Name: string;
    Image_Cover: string;
    Rate: number;
    Price: number;
    Price_After_Sale: number;
    RAM: number;
    Memory: number;
    CPU: string;
    Screen_Size: number;
    Color: string;
    Item_ID: string;
    Buyer_ID: number;
    images: Images;
}

export interface Images {
    'Item_Images-1': string;
    'Item_Images-2': string;
}