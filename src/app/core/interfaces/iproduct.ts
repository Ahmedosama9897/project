export interface Iproduct {
  Data: Data;
  images: Images;
  Brand: Brand;
  Detilas: Detilas;
}

interface Detilas {
  Item_ID: string;
  RAM: string;
  Memory: string;
  CPU: string;
  Color: string;
  Screen_Size: string;
}

interface Brand {
  Brand_ID: string;
  Brand_Name: string;
  Brand_Image: string;
}

interface Images {
}

interface Data {
  Item_ID: string;
  Image_Cover: string;
  Item_Name: string;
  Description: string;
  Price_in: number;
  Price_out: number;
  Quantity: number;
  Discount: number;
  Rate: number;
  Category_Name: string;
  Sub_Category_Name: string;
  seller_Name: string;
  View_Count: number;
  Sold_Count: number;
  Crate_Date: string;
  Brand_ID: number;
}