// 入力した画像ファイルのstate管理
const previewImages = (
  event: React.ChangeEvent<HTMLInputElement>,
  imageFiles: File[],
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>,
  changeImageIndex?: number
) => {
  // 画像が見つからない場合、処理を終了
  if (!event.target.files![0]) {
    return;
  }
  // 入力した画像に重複がないか判別
  const preventSameImage = imageFiles.some(
    (image: File) => image.name === event.target.files![0].name
  );
  // 重複があった場合は処理を終了
  if (preventSameImage) {
    return;
  }

  // 画像変更の場合
  if (typeof changeImageIndex === "number") {
    setImageFiles(() => {
      imageFiles.splice(changeImageIndex, 1, event.target.files![0]);
      return [...imageFiles];
    });
    return;
  }

  // 画像追加の場合
  // 画像ファイルが3つ以上の場合、古い画像を削除して新しい3つを追加
  if (imageFiles.length >= 3) {
    setImageFiles((imageFiles: File[]) => {
      const limitedImages = [...imageFiles, event.target.files![0]];
      limitedImages.shift();
      return limitedImages;
    });
  }
  // 画像ファイルが３つ未満の場合、通常の画像追加
  else {
    setImageFiles((imageFiles: File[]) => [
      ...imageFiles,
      event.target.files![0],
    ]);
  }
};

export default previewImages;
