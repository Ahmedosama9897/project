export interface IAddress {
    message: string;
    data: Datum[];
}

export interface Datum {
    message?: string;
    Id?: number;
    FirstName?: string;
    LastName?: string;
    Email?: string;
    PhoneNumber?: string;
    Country?: string;
    State?: string;
    City?: string;
    PostalCode?: string;
    Street?: string;
    Building?: string;
    Floor?: string;
    Apartment?: string;
    ShippingMethod?: string;
    UserId?: number;
}