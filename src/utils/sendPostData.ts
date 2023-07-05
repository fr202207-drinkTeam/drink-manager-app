import axios, { AxiosError } from "axios";
import ImgPathConversion from "./ImgPathConversion";
import { Post } from "../types/type";

//  投稿送信処理
const sendPostData = async (
  content: string,
  itemId: string,
  inputImages: File[],
  userId: number | null,
  setPostError: React.Dispatch<React.SetStateAction<string | null>>,
  setEditPostData: React.Dispatch<React.SetStateAction<Post | null>>,
  editPostData: Post | null
) => {
  // 投稿のバリデーションチェック
  if (content.length < 20 || content.length > 256) {
    setPostError("投稿内容は20文字以上255文字以内で入力してください");
    return;
  }

  // 画像ファイルをfirebaseUrlに変換
  const imagePaths = await ImgPathConversion({ imgFiles: inputImages });

  // 投稿編集の場合
  if (editPostData) {
    const editedPost = {
      userId,
      content,
      itemId: parseInt(itemId),
      postImages: imagePaths,
      // updatedAt: new Date(),
    };
    
    axios
      .patch(`http://localhost:50000/posts/${editPostData.id}`, editedPost)
      .then(() => {
        setPostError(null);
        setEditPostData(null);
      })
      .catch((error: AxiosError) => {
        console.log(error.response?.data);
        setPostError("保存に失敗しました。お問い合わせをお願いいたします。");
      });

    return;
  }
  
  // 新規投稿の場合
  const newPost = {
    userId,
    content,
    itemId: parseInt(itemId),
    postImages: imagePaths,
  };

  axios
    .post("http://localhost:50000/posts", newPost)
    .then((res) => {
      console.log(res.data);
      setPostError(null);
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
      setPostError("保存に失敗しました。お問い合わせをお願いいたします。");
    });
};

export default sendPostData;

// const postPostData = async () => {
//   // 投稿のバリデーションチェック
//   if (
//     postForm.current![0].value.length < 20 ||
//     postForm.current![0].value.length > 256
//   ) {
//     setPostError(true);
//     return;
//   }

//   // 選択した商品のid
//   const itemId = postForm.current![2].value;

//   // 投稿のアイテム情報取得
//   const item = itemData.find((item: Items) => item.id === parseInt(itemId));
//   // 投稿内容の装飾
//   let hashtagItem = "";
//   if (item) {
//     hashtagItem = `/itemS/${item.itemName}/itemE/`;
//   }
//   const userName = `/nameS/${loginUser.firstName} ${loginUser.lastName}/nameE/`;

//   // 入力した投稿内容
//   const content = postForm.current![0].value + hashtagItem + userName;
//   // 画像ファイルをfirebaseUrlに変換
//   const imagePaths = await ImgPathConversion({ imgFiles: inputImages });

//   // 投稿編集の場合
//   if (editPostData) {
//     const editedPost = {
//       userId: loginUser.id,
//       content: content,
//       itemId: parseInt(itemId),
//       postImages: imagePaths,
//       // updatedAt: new Date(),
//     };

//     // fetch(`http://localhost:8880/posts/${editPostData.id}`, {
//     //   method: "PATCH",
//     //   headers: { "Content-Type": "application/json" },
//     //   body: JSON.stringify(editedComment),
//     // })
//     axios
//       .patch(`http://localhost:50000/posts/${editPostData.id}`, editedPost)
//       .then(() => {
//         setPostError(false);
//         setEditPostData(null);
//         setReloadPost(!reloadPost);
//         postForm.current.reset();
//         setSelectedItemId(0);
//         setInputImages([]);
//       });

//     return;
//   }
//   // 新規投稿の場合
//   const newPost = {
//     userId: loginUser.id,
//     content: content,
//     itemId: parseInt(itemId),
//     postImages: imagePaths,
//     // createdAt: new Date(),
//     // updatedAt: new Date(),
//   };

//   axios
//     .post("http://localhost:50000/posts", newPost)
//     .then((res) => {
//       console.log(res.data);
//       setPostError(false);
//       setReloadPost(!reloadPost);
//       postForm.current.reset();
//       setSelectedItemId(0);
//       setInputImages([]);
//       setReloadPost(!reloadPost);
//     })
//     .catch((error: AxiosError) => {
//       console.log(error.response?.data);
//     });
// };
