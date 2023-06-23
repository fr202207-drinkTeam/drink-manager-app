import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/react";
import AddItem from "../pages/AddItem";
import { useState } from "react";
import { MemoryRouter } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import LoginForm from "./LoginForm";
import ItemForm from "./ItemForm";

// describe("バリデーションテスト", () => {
//   test("商品名バリデーションテスト", () => {
//     const [trigger, setTrigger] = useState(false);
//     render(
//       <MemoryRouter>
//         <RecoilRoot>
//           <BrowserRouter>
//             <AddItem trigger={trigger} setTrigger={setTrigger} />
//           </BrowserRouter>
//         </RecoilRoot>
//       </MemoryRouter>
//     );
//     const itemName = screen.getByLabelText("商品名");
//     const itemDescription = screen.getByLabelText("商品説明");
//     const itemImages = screen.getByTestId("itemImageFeild");
//     const itemCategory = screen.getByLabelText("商品カテゴリー");
//     const presenceOrAbsence = screen.getByTestId("in-the-office");

//     fireEvent.change(itemName, { target: { value: "テスト" } });
//     fireEvent.change(itemDescription, {
//       target: { value: "itemFormテスト説明" },
//     });
//     fireEvent.change(itemImages, { target: { value: "item/png" } });
//     fireEvent.change(itemCategory, { target: { value: 1 } });
//     fireEvent.change(presenceOrAbsence, { target: { value: "absence" } });

//     const duplicationError = screen.getByText(/商品名が重複しています/i);
//     expect(duplicationError).toBeInTheDocument();
//   });

// test('passwordinputが空の場合のエラー', async () => {
//   render(
//     <RecoilRoot>
//       <BrowserRouter>
//         <LoginForm loginTitle='Login' />
//       </BrowserRouter>
//     </RecoilRoot>
//   );

//   const passwordInput = screen.getByPlaceholderText('パスワード');
//   fireEvent.blur(passwordInput);
//   const errorUserMessage = screen.getByText('パスワードを入力してください');
//   expect(errorUserMessage).toBeVisible();//表示されているか
// });
// });

describe("ItemFormテスト", () => {
  global.URL.createObjectURL = jest.fn();
  test("商品名が正常値でセットされるか", () => {
    global.URL.createObjectURL = jest.fn();
    const setItemName = jest.fn();
    const setItemDescription = jest.fn();
    const setItemImages = jest.fn();
    const setPresenceOrAbsence = jest.fn();
    const setItemCategory = jest.fn();
    const props = {
      itemName: "",
      setItemName: setItemName,
      itemDescription: "説明",
      setItemDescription: setItemDescription,
      itemCategory: 2,
      setItemCategory: setItemCategory,
      itemImages: ["/item.png"],
      setItemImages: setItemImages,
      presenceOrAbsence: false,
      setPresenceOrAbsence: setPresenceOrAbsence,
    };
    render(
      <RecoilRoot>
        <BrowserRouter>
          <ItemForm {...props} />
        </BrowserRouter>
      </RecoilRoot>
    );
    const inputElement = screen.getByLabelText("商品名")!;
    fireEvent.change(inputElement, { target: { value: "ItemFormテスト商品" } });
    expect(setItemName).toHaveBeenCalledWith("ItemFormテスト商品");
  });

  test("商品説明が正常値でセットされるか", () => {
    const setItemName = jest.fn();
    const setItemDescription = jest.fn();
    const setItemImages = jest.fn();
    const setPresenceOrAbsence = jest.fn();
    const setItemCategory = jest.fn();
    const props = {
      itemName: "ItemFormテスト",
      setItemName: setItemName,
      itemDescription: "",
      setItemDescription: setItemDescription,
      itemCategory: 2,
      setItemCategory: setItemCategory,
      itemImages: ["/item.png"],
      setItemImages: setItemImages,
      presenceOrAbsence: false,
      setPresenceOrAbsence: setPresenceOrAbsence,
    };
    render(
      <RecoilRoot>
        <BrowserRouter>
          <ItemForm {...props} />
        </BrowserRouter>
      </RecoilRoot>
    );
    const inputElement = screen.getByLabelText("商品説明")!;
    fireEvent.change(inputElement, {
      target: { value: "ItemFormテスト商品説明" },
    });
    expect(setItemDescription).toHaveBeenCalledWith("ItemFormテスト商品説明");
  });

  test("追加ボタンを押したときにset関数が呼び出されるか", () => {
    const setItemName = jest.fn();
    const setItemDescription = jest.fn();
    const setItemImages = jest.fn();
    const setPresenceOrAbsence = jest.fn();
    const setItemCategory = jest.fn();
    const props = {
      itemName: "ItemFormテスト",
      setItemName: setItemName,
      itemDescription: "",
      setItemDescription: setItemDescription,
      itemCategory: 2,
      setItemCategory: setItemCategory,
      itemImages: ["/item.png"],
      setItemImages: setItemImages,
      presenceOrAbsence: false,
      setPresenceOrAbsence: setPresenceOrAbsence,
    };
    render(
      <RecoilRoot>
        <BrowserRouter>
          <ItemForm {...props} />
        </BrowserRouter>
      </RecoilRoot>
    );
    const fileInputElement = screen.getByLabelText("追加");
    fireEvent.click(fileInputElement);
    expect(setItemImages).toHaveBeenCalled();
  });

  test("商品カテゴリーで選択された値がsetされるか", () => {
    const setItemName = jest.fn();
    const setItemDescription = jest.fn();
    const setItemImages = jest.fn();
    const setPresenceOrAbsence = jest.fn();
    const setItemCategory = jest.fn();
    const setItemCategoryMock = jest.fn();
    const props = {
      itemName: "ItemFormテスト",
      setItemName: setItemName,
      itemDescription: "",
      setItemDescription: setItemDescription,
      itemCategory: 2,
      setItemCategory: setItemCategory,
      itemImages: ["/item.png"],
      setItemImages: setItemImages,
      presenceOrAbsence: false,
      setPresenceOrAbsence: setPresenceOrAbsence,
    };
    render(
      <RecoilRoot>
        <BrowserRouter>
          <ItemForm {...props} />
        </BrowserRouter>
      </RecoilRoot>
    );
    const selectElement = screen.getByLabelText("商品カテゴリー");
    fireEvent.change(selectElement, { target: { value: '2' } });
    expect(setItemCategoryMock).toHaveBeenCalledWith(2);
    // expect(selectElement.value).toBe('2');
  });

  test("社内ありを選んだときにtrueがsetされるか", () => {
    const setItemName = jest.fn();
    const setItemDescription = jest.fn();
    const setItemImages = jest.fn();
    const setPresenceOrAbsence = jest.fn();
    const setItemCategory = jest.fn();
    const props = {
      itemName: "ItemFormテスト",
      setItemName: setItemName,
      itemDescription: "説明",
      setItemDescription: setItemDescription,
      itemCategory: 0,
      setItemCategory: setItemCategory,
      itemImages: ["/item.png"],
      setItemImages: setItemImages,
      presenceOrAbsence: false,
      setPresenceOrAbsence: setPresenceOrAbsence,
    };
    render(
      <RecoilRoot>
        <BrowserRouter>
          <ItemForm {...props} />
        </BrowserRouter>
      </RecoilRoot>
    );
    const radioGroup = screen.getByLabelText('社内あり');
    fireEvent.click(radioGroup, { target: { value: "presence" } });
    expect(radioGroup).toBe('presence');
  });

  test("社内なしを選んだときにfalseがsetされるか", () => {
    const setItemName = jest.fn();
    const setItemDescription = jest.fn();
    const setItemImages = jest.fn();
    const setPresenceOrAbsence = jest.fn();
    const setItemCategory = jest.fn();
    const props = {
      itemName: "ItemFormテスト",
      setItemName: setItemName,
      itemDescription: "説明",
      setItemDescription: setItemDescription,
      itemCategory: 0,
      setItemCategory: setItemCategory,
      itemImages: ["/item.png"],
      setItemImages: setItemImages,
      presenceOrAbsence: false,
      setPresenceOrAbsence: setPresenceOrAbsence,
    };

    render(
      <RecoilRoot>
        <BrowserRouter>
          <ItemForm {...props} />
        </BrowserRouter>
      </RecoilRoot>
    );
    const presenceRadioButton = screen.getByLabelText("absence");

    fireEvent.change(presenceRadioButton, { target: { value: "absence" } });

    expect(setPresenceOrAbsence).toHaveBeenCalledWith(false);
  });
});
