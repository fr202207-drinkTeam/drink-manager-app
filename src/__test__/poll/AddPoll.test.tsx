import React from 'react';
import PostQuestionnair from '../../utils/PostQuestionnaire';
import { validateCategory, validateDate, validateDescription, validatePollName, validateSelectedItems } from '../../utils/AddPollValidation';

describe('AddPoll', () => {

  const data = {
    name: "テスト投票",
    description: "テスト投票の詳細",
    category: 1,
    createdAt: new Date("2023-06-01T00:41:39.283Z"),
    startDate: new Date("2023-06-01T00:41:39.283Z"),
    endDate: new Date("2023-06-26T00:41:39.283Z"),
    PolleditemsData: [{ itemId: 1 }, { itemId: 2 }],
    author: 2,
  }
  //投票名
  test('投票名が未入力の場合エラーは出るか', async () => {
    const result = validatePollName("");
    expect(result).toBe("投票名を入力してください");
  });
  test('投票名が5文字以上で入力されていない場合エラーは出るか', async () => {
    const result = validatePollName("テスト");
    expect(result).toBe("5文字以上の入力が必要です");
  });
  test('投票名が正常入力されている', async () => {
    const result = validatePollName("テスト投票");
    expect(result).toBe("");
  });
  //投票詳細
  test('投票詳細が未入力の場合エラーは出るか', async () => {
    const result = validateDescription("");
    expect(result).toBe("投票詳細を入力してください");
  });
  test('投票詳細が5文字以上で入力されているか', async () => {
    const result = validateDescription("テスト");
    expect(result).toBe("5文字以上の入力が必要です");
  });
  test('投票詳細が正常入力されている', async () => {
    const result = validateDescription("テストです");
    expect(result).toBe("");
  });
  //投票期間
  test('投票期間が未入力の場合エラーは出るか', async () => {
    const result = validateDate(0, 0, "", "", false, false);//未入力
    expect(result).toBe("投票期間を入れてください");
  });
  test('投票期間が1ヶ月を超えている場合エラーは出るか', async () => {
    const result = validateDate(5011200000, 2592000000, "2023-06-01T00:41:39.283Z", "2023-06-26T00:41:39.283Z", false, false);
    expect(result).toBe("投票期間は1ヶ月以内で設定してください。");
  });
  test('投票期間が逆転している場合エラーは出るか', async () => {
    const result = validateDate(2505600000, 2592000000, "2023-06-26T00:41:39.283Z", "2023-06-01T00:41:39.283Z", false, false);
    expect(result).toBe("投票期間が正しくありません。");
  });
  test('投票期間が被っている場合エラーは出るか', async () => {
    const result = validateDate(2505600000, 2592000000, "2023-06-01T00:41:39.283Z", "2023-06-26T00:41:39.283Z", true, true);
    expect(result).toBe("投票期間が被っています。投票期間を再度確認してください。");
  });
  test('投票期間が正常入力', async () => {
    const result = validateDate(2505600000, 2592000000, "2023-06-01T00:41:39.283Z", "2023-06-26T00:41:39.283Z", false, false);
    expect(result).toBe("");
  });
  //投票カテゴリー
  test('投票カテゴリーが未入力の場合エラーは出るか', async () => {
    const result = validateCategory("投票種別を選択してください", false, false);//未入力
    expect(result).toBe("投票種別を選択してください");
  });
  test('人気投票が同一期間で重複する場合エラーは出るか', async () => {
    const result = validateCategory("1", true, false);
    expect(result).toBe("人気投票が同一期間で重複するため登録できません");
  });
  test('その他投票が同一期間で重複する場合エラーは出るか', async () => {
    const result = validateCategory("2", false, true);
    expect(result).toBe("その他投票が同一期間で重複するため登録できません");
  });
  test('投票カテゴリーが正常入力されているか', async () => {
    const result = validateCategory("2", false, false);
    expect(result).toBe("");
  });
  //投票選択商品
  test('投票商品が未入力の場合エラーは出るか', async () => {
    const result = validateSelectedItems([]);//未入力
    expect(result).toBe("投票に追加する商品を選択してください");
  });
  test('投票商品が1件しかない場合エラーは出るか', async () => {
    const result = validateSelectedItems([1]);
    expect(result).toBe("投票商品が1件の状態では登録できません");
  });
  test('投票商品が16件以上登録された場合エラーは出るか', async () => {
    const result = validateSelectedItems([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
    expect(result).toBe("投票に追加できる商品は15件までです");
  });
  test('投票商品が正常選択', async () => {
    const result = validateSelectedItems([1, 2, 3]);
    expect(result).toBe("");
  });

  test('投票登録が正常に行えるか', async () => {
    const result: Boolean = await PostQuestionnair(data);
    jest.spyOn(console, "error").mockImplementation();
    expect(result).toBe(true);
  });

  const MockPostQuestionnair = async (data:any) => {
    let success = false;
    await fetch("http://localhost:50000/q", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        success = true;
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error) {
          success = false;
        }
      });
  return success;
};
  test('投票登録ができないこと', async () => {
    const result = await MockPostQuestionnair(data);
    jest.spyOn(console, "error").mockImplementation();
    expect(result).toBe(false);
  });
});

// const testItemData = [
//   {
//     "itemName": "ポテトチップスのりしお",
//     "description": "ふわっと香る「青のり」が、じゃがいものおいしさをいっそう引き立てます。",
//     "image": [
//       "https://firebasestorage.googleapis.com/v0/b/drink-manager-app-4df85.appspot.com/o/8b4f2c9d-a9d6-45f0-bf8f-b5bd96ec4461?alt=media&token=96f2cbda-a7ba-45e5-aba7-70cfe8fbcd5f"
//     ],
//     "itemCategory": 7,
//     "createdAt": new Date("2023-05-12T03:01:31.537Z"),
//     "intheOffice": false,
//     "author": null,
//     "otherItem": true,
//     "id": 25
//   },
//   {
//     "itemName": "ビスコ",
//     "description": "ふわっと香る「青のり」が、じゃがいものおいしさをいっそう引き立てます。",
//     "image": [
//       "https://firebasestorage.googleapis.com/v0/b/drink-manager-app-4df85.appspot.com/o/8b4f2c9d-a9d6-45f0-bf8f-b5bd96ec4461?alt=media&token=96f2cbda-a7ba-45e5-aba7-70cfe8fbcd5f"
//     ],
//     "itemCategory": 7,
//     "createdAt": new Date("2023-05-12T03:01:31.537Z"),
//     "intheOffice": false,
//     "author": null,
//     "otherItem": true,
//     "id": 26
//   }
// ];
// test('pollNameInput空文字エラー', async () => {
//   render(
//     <RecoilRoot>
//       <BrowserRouter>
//         <AddPoll />
//       </BrowserRouter>
//     </RecoilRoot>
//   );
//   const pollNameInput = screen.getByPlaceholderText('投票タイトル') as HTMLInputElement;

//   const submitButton = screen.getByRole('button', { name: '投票登録' }) as HTMLButtonElement;
//   fireEvent.click(submitButton);
//   expect(pollNameInput.value).toBe('');
//   const errorUserMessage = screen.queryAllByText('投票名を入力してください');
//   errorUserMessage.forEach(element => {
//     expect(element).toBeVisible();
//   });
// });
// test('pollDescriptionInput空文字エラー', async () => {
//   render(
//     <RecoilRoot>
//       <BrowserRouter>
//         <AddPoll />
//       </BrowserRouter>
//     </RecoilRoot>
//   );
//   const pollDetailInput = screen.getByPlaceholderText('投票詳細') as HTMLInputElement;

//   const submitButton = screen.getByRole('button', { name: '投票登録' }) as HTMLButtonElement;
//   fireEvent.click(submitButton);
//   expect(pollDetailInput.value).toBe('');
//   const errorUserMessage = screen.queryAllByText('投票詳細を入力してください');
//   errorUserMessage.forEach(element => {
//     expect(element).toBeVisible();
//   });
// });
// test('pollDateInput空文字エラー', async () => {
//   render(
//     <RecoilRoot>
//       <BrowserRouter>
//         <AddPoll />
//       </BrowserRouter>
//     </RecoilRoot>
//   );
//   const pollDateInput = screen.getByPlaceholderText('日付') as HTMLInputElement;
//   const pollDateInput2 = screen.getByPlaceholderText('日付2') as HTMLInputElement;

//   const submitButton = screen.getByRole('button', { name: '投票登録' }) as HTMLButtonElement;
//   fireEvent.click(submitButton);
//   expect(pollDateInput.value).toBe('');
//   expect(pollDateInput2.value).toBe('');
//   const errorUserMessage = screen.queryAllByText('投票期間を入れてください');
//   errorUserMessage.forEach(element => {
//     expect(element).toBeVisible();
//   });
// });

// test('pollcategory未選択エラー', async () => {
//   render(
//     <RecoilRoot>
//       <BrowserRouter>
//         <AddPoll />
//       </BrowserRouter>
//     </RecoilRoot>
//   );
//   const submitButton = screen.getByRole('button', { name: '投票登録' }) as HTMLButtonElement;
//   fireEvent.click(submitButton);
//   const errorUserMessage = screen.queryAllByText('投票種別を選択してください');
//   errorUserMessage.forEach(element => {
//     expect(element).toBeVisible();
//   });
// });