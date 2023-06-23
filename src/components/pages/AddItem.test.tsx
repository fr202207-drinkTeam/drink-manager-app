import { render, screen } from "@testing-library/react";
import AddItem from "./AddItem";
import { MemoryRouter } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

describe("商品追加画面のテスト", () => {
    global.URL.createObjectURL = jest.fn();
    test("商品追加画面が表示されているか", () => {
        const setTrigger = jest.fn();
      render(
          <RecoilRoot>
            <BrowserRouter>
              <AddItem setTrigger={setTrigger} />
            </BrowserRouter>
          </RecoilRoot>
      );
    
      const titleText = screen.getByText(/商品追加/i);
      expect(titleText).toBeInTheDocument();
    });

    // test("商品名が空白時にエラー分が表示されるか", () => {
    //     const testItemName = ""
    //     expect()
    // })
    // test("商品名が正常値でセットされるか", () => {
    //     // global.URL.createObjectURL = jest.fn();
    //     render(
    //       <RecoilRoot>
    //         <BrowserRouter>
    //           <AddItem {...props} />
    //         </BrowserRouter>
    //       </RecoilRoot>
    //     );
    //     const inputElement = screen.getByLabelText("商品名")!;
    //     fireEvent.change(inputElement, { target: { value: "ItemFormテスト商品" } });
    //     expect(setItemName).toHaveBeenCalledWith("ItemFormテスト商品");
    //   });
})
