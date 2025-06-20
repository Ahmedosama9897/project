export interface iGetuserorder {
    message: string;
    data: Datum[];
}

export interface Datum {
    IDFromPaymob: number;
    Total_Price: number;
    Status: string;
    Delivery_Date: string;
    Book_Date: string;
    Addess: number;
    Street: string;
    City: string;
    Building: string;
    Floor: string;
    Apartment: string;
    Buyer_Name: string;
    PhoneNumber: string;
    Buyer_ID: number;
}