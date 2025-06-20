export interface Iproductreview {
    message: string;
    data: Datum[];
}

export interface Datum {
    Review_ID: number;
    Buyer_Name: string;
    Rating: number;
    Comment: string;
    Created_At: string;
}