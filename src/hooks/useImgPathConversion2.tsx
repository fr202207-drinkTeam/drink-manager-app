import { useState, useEffect, useRef } from "react";
import { storage } from "../Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";

type Props = {
  imgFiles: File[];
  addItem: number;
};

const useImgPathConversion = (props: Props) => {
  const [imagePath, setImagePath] = useState<string[]>([]);
  const imagesPathsArr: string[] = [];
  useEffect(() => {
    (async () => {
      console.log("start", props);
      if (props.imgFiles.length === 0) {
        return;
      }

      new Promise((resolve) => {
        props.imgFiles.map((imgFile) => {
          // uuidで画像登録用文字列生成
          const uniqueId = uuidv4();
          const storageRef = ref(storage, `/${uniqueId}`);
          const uploadImage = uploadBytesResumable(storageRef, imgFile);

          uploadImage.on(
            "state_changed",
            (snapshot) => {},
            (err) => {},
            () => {
              getDownloadURL(storageRef).then((url) => {
                imagesPathsArr.push(url);
                console.log(imagesPathsArr);
                resolve(imagesPathsArr);
              });
            }
          );

          if (imagesPathsArr.length === props.imgFiles.length) {
            // resolve(imagesPathsArr);
          }
        });
      })
        .then((imagePaths: any) => {
          setImagePath(imagePaths);
          console.log("processing", imagePath)
        })
        .then(() => {
          // console.log("processing", imagePath);
        });
    })();
  }, [props.addItem]);
};

export default useImgPathConversion;
