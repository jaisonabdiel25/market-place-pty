import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { giveCurrentDateTime } from "./utils";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authFirebase } from "./firebase.config";
import { envs } from './envs';

export class UploadImages {
    constructor() { }

    static uploadMultiple = async (files: Express.Multer.File[]) => {
        try {
            let urls: string[] = [];
            await signInWithEmailAndPassword(authFirebase, envs.FIREBASE_AUTH_USER, envs.FIREBASE_AUTH_PASSWORD)
            files.map(async (file, index) => {
                const dateTime = giveCurrentDateTime();
                const storage = getStorage();
                const storageRef = ref(storage, `products/${file.originalname}_${index}_${dateTime}`);
                const metadata = {
                    contentType: files[0].mimetype,
                };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const url = await getDownloadURL(snapshot.ref);
                urls.push(url);
            })

            return urls;

        } catch (error) {
            throw error;
        }
    }


}