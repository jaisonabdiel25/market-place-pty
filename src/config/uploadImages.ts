import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { giveCurrentDateTime } from "./utils";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authFirebase } from "./firebase.config";
import { envs } from './envs';
import { CustomError } from "./errors";

export class UploadImages {
    constructor() { }

    static uploadMultiple = async (files: Express.Multer.File[]) => {
        try {
            await signInWithEmailAndPassword(authFirebase, envs.FIREBASE_AUTH_USER, envs.FIREBASE_AUTH_PASSWORD)
            const uploadImages = files.map(async (file, index) => {
                const dateTime = giveCurrentDateTime();
                const storage = getStorage();
                const storageRef = ref(storage, `products/${file.originalname}_${index}_${dateTime}`);
                const metadata = {
                    contentType: file.mimetype,
                };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                return await getDownloadURL(snapshot.ref);
            })

            return await Promise.all(uploadImages);

        } catch (error) {
            throw CustomError.internal(JSON.stringify(error, null, 2));
        }
    }
}