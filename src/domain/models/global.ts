
export interface GlobalData<T> {
    data: T;
    message: string;
}



export interface TokenDecoded {
    id: string;
    name: string;
    firstName: string;
    email: string;
    active: boolean;
    phone?: string;
    img?: string;
}