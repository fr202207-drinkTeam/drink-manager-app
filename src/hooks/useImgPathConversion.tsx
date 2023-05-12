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
  const isFirstRender = useRef(true);
  console.log("imgFiles", props.imgFiles)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const imagesPathsArr: string[] = [];

    props.imgFiles.forEach((imgFile) => {
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
          });
        }
      );
      return imagesPathsArr;
    });

      console.log("set")
      setImagePath(imagesPathsArr);

  }, [props.addItem]);

  console.log("imagePathsArr", imagePath);
  if(imagePath.length === props.imgFiles.length) {
    return { imagePath };
  }
  return {}
};

export default useImgPathConversion;
