import { storage } from "../Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";

type Props = {
  imgFiles: File[];
};

const ImgPathConversion = async (props: Props) => {
  const promises = props.imgFiles.map((imgFile) => {
    // 更新時(firebaseUrl変換が既にされているものの場合)
    if (imgFile.size === 0) {
      return imgFile.name;
    }
    return new Promise((resolve, reject) => {
      // uuidで画像登録用文字列生成
      const uniqueId = uuidv4();
      const storageRef = ref(storage, `/${uniqueId}`);
      const uploadImage = uploadBytesResumable(storageRef, imgFile);

      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          reject(err);
        },
        () => {
          getDownloadURL(storageRef).then((url) => {
            resolve(url);
          });
        }
      );
    });
  });

  const imagePaths = await Promise.all(promises);
  return imagePaths;
};

export default ImgPathConversion;
