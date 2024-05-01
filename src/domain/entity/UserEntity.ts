

export class UserEntity {

    constructor(
        public id: string,
        public name: string,
        public firstName: string,
        public email: string,
        public status: boolean,
        public phone?: string,
        public roles?: string[],
        public img?: string,
    ) { }



}