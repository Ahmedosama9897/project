export interface Irecommend_list {
    message: string;
    products: Product[];
}

export interface Product {
    Brand: Brand;
    Data: Data;
    Detilas: BrandID;
    Rating: Rating;
    images: BrandID;
}

export interface Rating {
    AverageRating: number;
    FirstReviewDate: null | string;
    LastReviewDate: null | string;
    TotalReviews: number;
}

export interface Data {
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

export interface Brand {
    Brand_ID: BrandID | number;
    Brand_Image: string;
    Brand_Name: string;
}

export interface BrandID {
}