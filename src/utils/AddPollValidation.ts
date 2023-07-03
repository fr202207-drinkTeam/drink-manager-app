//投票登録の際のバリデーション

//投票名
export const validatePollName = (
  pollName:string
)  => {
    if (!pollName) {
      return "投票名を入力してください";
    }
    if (pollName.length < 5) {
      return "5文字以上の入力が必要です";
    }
    return "";
  };

//投票詳細
  export const validateDescription = (
    pollDescription:string
  ) => {
    if (!pollDescription) {
      return "投票詳細を入力してください";
    }
    if (pollDescription.length < 5) {
      return "5文字以上の入力が必要です";
    }
    return "" ;
  };

  //投票期間
  export const validateDate = (
    timeDifference:number,
    oneMonthInMilliseconds:number,
    startPeriodDate:string,
    endPeriodDate:string,
    isPopularOverlapping:boolean,
    isOthersOverlapping:boolean,
  ) => {
    if (timeDifference > oneMonthInMilliseconds) {
      return "投票期間は1ヶ月以内で設定してください。";
    }
    if (!startPeriodDate || !endPeriodDate) {
      return "投票期間を入れてください";
    }
    if (startPeriodDate >= endPeriodDate) {
      return "投票期間が正しくありません。";
    }
    if (isPopularOverlapping && isOthersOverlapping) {
      return "投票期間が被っています。投票期間を再度確認してください。";
    }
    return "" ;
  };

  //投票カテゴリー
  export const validateCategory = (
    pollCategory:string,
    isPopularOverlapping:boolean,
    isOthersOverlapping:boolean,
  ) => {
    console.log(isPopularOverlapping)
    if (pollCategory === "投票種別を選択してください") {
      return "投票種別を選択してください";
    }
    if (isPopularOverlapping && pollCategory === "1") {
      return "人気投票が同一期間で重複するため登録できません";
    }
    if (isOthersOverlapping && pollCategory === "2") {
      return "その他投票が同一期間で重複するため登録できません";
    }
    return "";
  };

  ///投票選択商品
 export const validateSelectedItems = (
  selectedItems:number[]
 ) => {
    if (selectedItems.length === 0) {
      return "投票に追加する商品を選択してください";
    }
    if (selectedItems.length >= 15) {
      return "投票に追加できる商品は15件までです";
    }
    if (selectedItems.length === 1) {
      return "投票商品が1件の状態では登録できません";
    }
    return "";
  };