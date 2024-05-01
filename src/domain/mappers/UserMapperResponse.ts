import { User } from "@prisma/client";
import { UserEntity } from "../entity/UserEntity";

export class UserMapperResponse {

    static userMapperResponse(object: { [key: string]: any }) {

        const { id, name, email, active, phone, img, firstName } = object;
        return new UserEntity(
            id,
            name,
            firstName,
            email,
            img,
            active,
            phone,
        )
    }
}