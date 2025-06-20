export interface Iprofile {
    UserProfile: UserProfile;
    Adresses: Adresses;
    advNumbers: AdvNumbers;
}

export interface AdvNumbers {
    OrderCount: string;
    ProductCount: string;
    TotalSales: string;
}

export interface Adresses {
    Id: string;
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    Country: string;
    State: string;
    City: string;
    PostalCode: string;
    Street: string;
    Building: string;
    Floor: string;
    Apartment: string;
    ShippingMethod: string;
    UserId: string;
}

export interface UserProfile {
    Buyer_ID: number;
    Buyer_Image: string;
    Buyer_Name: string;
    Email: string;
    phone: string;
}