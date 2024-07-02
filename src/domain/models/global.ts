
export interface GlobalData<T> {
    data: T;
    message?: string;
    totalItems: number;
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