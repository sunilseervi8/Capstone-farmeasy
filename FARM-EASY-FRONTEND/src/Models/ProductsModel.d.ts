export interface Product {
    productName: string;
    productDescription: string;
    productPrice: string;
    sellerId: string;
    productDatePosted: string;
    productImageUrl: string;
    productCategory: string;
    ProductStock: number;
}
export interface Crop {
    price: any;
    currency: any;
    name: string;
    quantity: string;
    unit: string;
    imageUrl: string;
    category: string;
    user_id: any;
}
export interface Rental {
    rentalId: string;
    rentalTitle: string;
    rentalDescription: string;
    rentalPrice: number;
    image: string;
}
export interface FormData {
    cropName: any;
    unit: any;
    frequency: any;
    sendToOtherSuppliers: boolean;
    quantity: string;
    orderValue: string;
    selectedCurrency: any;
    supplierEmail: string;
    sellerName: string;
}
export interface CropFormData {
    cropName: string;
    unit: string;
    frequency: string;
    sendToOtherSuppliers: boolean;
    quantity: string;
    orderValue: string;
    selectedCurrency: string;
    email: string;
}
export interface RentalData {
    rentalTitle: string;
    rentalDescription: string;
    rentalPrice: number;
    image: string;
    rentalId: string;
    userId: string;
}
