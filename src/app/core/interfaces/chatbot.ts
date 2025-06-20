
export interface Chatbot {
    message: string;
    pageNumber: number;
    pageSize: number;
    products: Product[];
    reply: string;
    totalItems: number;
    totalPages: number;
}

export interface Product {
    Brand: Brand;
    Data: Data;
    Detilas: Detilas;
    Rating: Rating;
    images: Detilas;
}

interface Rating {
    AverageRating: number;
    FirstReviewDate: null | string;
    LastReviewDate: null | string;
    TotalReviews: number;
}

interface Detilas {
}

interface Data {
    Brand_ID: null | number;
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
    SoftDelete: boolean;
    Sold_Count: number;
    Sub_Category_ID: number;
    View_Count: number;
}

interface Brand {
    Brand_ID: string;
    Brand_Image: string;
    Brand_Name: string;
}