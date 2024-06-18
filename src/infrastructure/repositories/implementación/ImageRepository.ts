import { Image } from "@prisma/client";
import { CreateImages } from "../../../domain/models/products";
import { IImageRepository } from "../interface/IImageRepository";
import { prisma } from "../../../client";
import { CustomError } from "../../../config/errors";


export class ImageRepository implements IImageRepository {
    constructor() { }

    async saveImages(files: CreateImages[]): Promise<void> {

        try {
            await prisma.image.createMany({ data: files });

        } catch (error) {
            throw CustomError.internal();
        }
    }
}