import { useState, useEffect } from "react";
import { storage } from "../Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";

type Props = {
  imgFile: any;
};

const useImgPathConversion = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imagePath, setImagePath] = useState<string | null>(null);

  useEffect(() => {
    if (props.imgFile) {
      const storageRef = ref(storage, `/${props.imgFile.name}`);
      const file = props.imgFile instanceof File ? props.imgFile : new File([], props.imgFile);
      const uploadImage = uploadBytesResumable(storageRef, file);

      uploadImage.on(
        "state_changed",
        () => {
          setLoading(true);
        },
        (err) => {
          console.log("Error:" + err);
        },
        () => {
          setLoading(false);
          setIsUploaded(true);
    
          getDownloadURL(storageRef).then((url) => {
            setImagePath(url);
          });
        }
      );
    }
  }, [props.imgFile]);

  return { imagePath, loading, isUploaded };
};

export default useImgPathConversion;
