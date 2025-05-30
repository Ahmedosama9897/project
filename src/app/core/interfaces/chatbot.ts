export interface Chatbot {

    recommended_items: Recommendeditem[];
    reply: string;
}

interface Recommendeditem {
    Brand_ID: number;
    Category_ID: number;
    Crate_Date: string;
    Description: string;
    Discount: number;
    Image_Cover: string;
    Item_ID: string;
    Item_Name: string;
    Price_in: number;
    Price_out: number;
    Quantity: number;
    Rate: number;
    Seller_ID: number;
    Sold_Count: number;
    Sub_Category_ID: number;
    View_Count: number;
}

