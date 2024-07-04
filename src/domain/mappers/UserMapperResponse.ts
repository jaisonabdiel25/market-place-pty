import { UserEntity } from "../entity/UserEntity";

export class UserMapperResponse {

    static userMapperResponse(object: { [key: string]: any }) {

        const { id, name, email, active, phone, img, firstName, roles, description } = object;
        return new UserEntity(
            id,
            name,
            firstName,
            email,
            active,
            phone,
            roles,
            img,
            undefined,
            description
        )
    }
}