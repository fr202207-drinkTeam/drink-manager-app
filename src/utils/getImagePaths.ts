import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Firebase";

const getImagePaths = (imagesFile: File[]) => {
  return new Promise<string[]>((resolve) => {
    const imagePaths: string[] = [];
    imagesFile.forEach((image) => {
      const storageRef = ref(storage, `/${Math.random()}`);
      const uploadImage = uploadBytesResumable(storageRef, image);
      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (err) => {},
        () => {
          getDownloadURL(storageRef)
            .then((url: string) => {
              imagePaths.push(url);
            })
            .then(() => {
              if (imagePaths.length === imagesFile.length) {
                resolve(imagePaths);
              }
            });
        }
      );
    });
  });
};

export default getImagePaths;
