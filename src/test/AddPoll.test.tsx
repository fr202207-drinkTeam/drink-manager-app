import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AddPoll from '../components/pages/AddPoll';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AdminHome from '../components/pages/AdminHome';
import AddPollCard from '../components/organisms/card/AddPollCard';

describe('AddPoll', () => {
  const testItemData = [
    {
      "itemName": "ポテトチップスのりしお",
      "description": "ふわっと香る「青のり」が、じゃがいものおいしさをいっそう引き立てます。",
      "image": [
        "https://firebasestorage.googleapis.com/v0/b/drink-manager-app-4df85.appspot.com/o/8b4f2c9d-a9d6-45f0-bf8f-b5bd96ec4461?alt=media&token=96f2cbda-a7ba-45e5-aba7-70cfe8fbcd5f"
      ],
      "itemCategory": 7,
      "createdAt": new Date("2023-05-12T03:01:31.537Z"),
      "intheOffice": false,
      "author": null,
      "otherItem": true,
      "id": 25
    },
    {
      "itemName": "ビスコ",
      "description": "ふわっと香る「青のり」が、じゃがいものおいしさをいっそう引き立てます。",
      "image": [
        "https://firebasestorage.googleapis.com/v0/b/drink-manager-app-4df85.appspot.com/o/8b4f2c9d-a9d6-45f0-bf8f-b5bd96ec4461?alt=media&token=96f2cbda-a7ba-45e5-aba7-70cfe8fbcd5f"
      ],
      "itemCategory": 7,
      "createdAt": new Date("2023-05-12T03:01:31.537Z"),
      "intheOffice": false,
      "author": null,
      "otherItem": true,
      "id": 26
    }
  ];
  test('pollNameInput空文字エラー', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <AddPoll />
        </BrowserRouter>
      </RecoilRoot>
    );
    const pollNameInput = screen.getByPlaceholderText('投票タイトル') as HTMLInputElement;

    const submitButton = screen.getByRole('button', { name: '投票登録' }) as HTMLButtonElement;
    fireEvent.click(submitButton);
    expect(pollNameInput.value).toBe('');
    const errorUserMessage = screen.queryAllByText('投票名を入力してください');
    errorUserMessage.forEach(element => {
      expect(element).toBeVisible();
    });
  });
  test('pollDescriptionInput空文字エラー', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <AddPoll />
        </BrowserRouter>
      </RecoilRoot>
    );
    const pollDetailInput = screen.getByPlaceholderText('投票詳細') as HTMLInputElement;

    const submitButton = screen.getByRole('button', { name: '投票登録' }) as HTMLButtonElement;
    fireEvent.click(submitButton);
    expect(pollDetailInput.value).toBe('');
    const errorUserMessage = screen.queryAllByText('投票詳細を入力してください');
    errorUserMessage.forEach(element => {
      expect(element).toBeVisible();
    });
  });
  test('pollDateInput空文字エラー', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <AddPoll />
        </BrowserRouter>
      </RecoilRoot>
    );
    const pollDateInput = screen.getByPlaceholderText('日付') as HTMLInputElement;
    const pollDateInput2 = screen.getByPlaceholderText('日付2') as HTMLInputElement;

    const submitButton = screen.getByRole('button', { name: '投票登録' }) as HTMLButtonElement;
    fireEvent.click(submitButton);
    expect(pollDateInput.value).toBe('');
    expect(pollDateInput2.value).toBe('');
    const errorUserMessage = screen.queryAllByText('投票期間を入れてください');
    errorUserMessage.forEach(element => {
      expect(element).toBeVisible();
    });
  });
  test('pollcategory未選択エラー', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <AddPoll />
        </BrowserRouter>
      </RecoilRoot>
    );
    const submitButton = screen.getByRole('button', { name: '投票登録' }) as HTMLButtonElement;
    fireEvent.click(submitButton);
    const errorUserMessage = screen.queryAllByText('投票種別を選択してください');
    errorUserMessage.forEach(element => {
      expect(element).toBeVisible();
    });
  });
  test('pollCard未選択エラー', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <AddPoll />
        </BrowserRouter>
      </RecoilRoot>
    );
    const submitButton = screen.getByRole('button', { name: '投票登録' }) as HTMLButtonElement;
    fireEvent.click(submitButton);
    const errorUserMessage = screen.queryAllByText('投票に追加する商品を選択してください');
    errorUserMessage.forEach(element => {
      expect(element).toBeVisible();
    });
  });

  test('投票登録ボタンがクリックされたとき入力が正常であれば投票情報が登録される', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <AddPoll />
          <AdminHome />
        </BrowserRouter>
      </RecoilRoot>
    );

    // 必要な要素を取得
    const pollNameInput = screen.getByPlaceholderText('投票タイトル') as HTMLInputElement;
    const pollDescriptionInput = screen.getByPlaceholderText('投票詳細') as HTMLInputElement;
    // const pollCategorySelect = screen.getByRole('combobox', { name: '投票種別を選択してください' });
    const startDateInput = screen.getByPlaceholderText('日付') as HTMLInputElement;
    const endDateInput = screen.getByPlaceholderText('日付2') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: '投票登録' });

    fireEvent.change(pollNameInput, { target: { value: 'テスト投票' } });
    expect(pollNameInput.value).toBe('テスト投票');
    fireEvent.change(pollDescriptionInput, { target: { value: 'テスト投票の詳細' } });
    // fireEvent.change(pollCategorySelect, { target: { value: '1' } });
    fireEvent.change(startDateInput, { target: { value: '2023-06-1' } });
    fireEvent.change(endDateInput, { target: { value: '2023-06-30' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const titleElement = screen.getByText("- 管理者MENU -");
      expect(titleElement).toBeInTheDocument();
    });
  });

  test("テストデータのカードが表示できるか", () => {

    render(
      <RecoilRoot>
        <BrowserRouter>
          <AddPollCard data={testItemData} selectedItems={[]} setSelectedItems={[26]}/>
        </BrowserRouter>
      </RecoilRoot>
    );
    const item1 = screen.getByText((content, element) => {
      return content.startsWith("ポテトチップスのりしお");
    });
    expect(item1).toBeInTheDocument();

    const item2 = screen.getByText((content, element) => {
      return content.startsWith("ビスコ");
    });
    expect(item2).toBeInTheDocument();
  });
});

