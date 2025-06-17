

export interface PcProduct {
    Item_ID: string;
    Image_Cover: string;
    Item_Name: string;
    Rate: number;
    Price: number;
    Price_After_Sale: number;
    RAM: number;
    Memory: number;
    Memory_Type: string;
    Graphics_Card: GraphicsCard | string;
    CPU: string;
    Buyer_ID: number;
}

export interface GraphicsCard {
}