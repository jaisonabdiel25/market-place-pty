
interface ICategory {
    id: string;
    description: string;
}

export interface ISeedData {
    Category: ICategory[]
}

export const initialData: ISeedData = {

    Category: [
        {
            id: '76fc6104-767b-4544-a3b5-5c5a51850d0d',
            description: 'Electronico'
        },
        {
            id: '662bd8bc-94a4-4a49-9b96-df125afa26f4',
            description: 'VideoJuegos'
        },
        {
            id: 'b323c96a-31ec-44aa-afb2-01f6cbe458b2',
            description: 'Hogar'
        }
    ]
}