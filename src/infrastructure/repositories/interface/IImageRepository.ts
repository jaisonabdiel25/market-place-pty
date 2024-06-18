import { CreateImages } from "../../../domain/models/products";

export abstract class IImageRepository {
    abstract saveImages(files: CreateImages[]): Promise<void>;
}