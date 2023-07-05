import { render, screen, fireEvent, act, waitFor, Matcher, renderHook } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import PollResult from '../../components/pages/PollResult';
import useGetAnQuestionnaire from '../../hooks/useGetAnQuestionnaire';
import ItemCard from '../../components/organisms/card/ItemCard';
import useGetAnPoll from '../../hooks/useGetAnPoll';


describe('PollResult', () => {

  test('useGetAnPoll初期値は空', async () => {

    const { result}= renderHook(() => useGetAnPoll(1));

    // useState の初期値は空の配列
    expect(result.current).toEqual([]);

  });

  test('useGetAnPollにquestionnaireIdごとの期待通りの値が入る', async () => {
    const mockedData = [{
      "id": 1,
      "questionnaireId": 1,
      "userId": 2,
      "result": 9,
      "category": 1,
      "createdAt": "2023-06-26T00:41:39.283Z"
    }];
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockedData),
    });
  
    const { result } = renderHook(() => useGetAnPoll(1));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0)); // 非同期の状態変更が完了するまで待つ
    });
  
    expect(result.current).toEqual(mockedData);
  });

  


  beforeEach(() => {
    jest.resetModules();
    jest.mock('../hooks/useGetAnQuestionnaire', () => ({
      useGetAnQuestionnaire: jest.fn((id) => (
        {
          "id":id,
          "name": "テストテスト",
          "description": "テストです。",
          "createdAt": "2023-06-26T00:41:39.253Z",
          "category": 1,
          "startDate": "2023-05-10T08:16:34.851Z",
          "endDate": "2023-05-30T08:16:34.851Z",
          "author": 1
        })),
    }));
    jest.mock('../hooks/useGetAllItems', () => ({
      useGetAllItems: jest.fn(() => [{
        "id": 1,
        "itemName": "ブライトブレンド",
        "description": "ミディアムローストの豆をブレンドしたブライトブレンドは、キャラメル、ベリー、はちみつのバランスのとれたほんのり甘い香りが楽しめる一杯です。",
        "itemCategory": 2,
        "createdAt": "2023-06-26T00:41:39.302Z",
        "inTheOffice": true,
        "author": 1,
        "approval": true,
        "manufacturer": null,
        "purchaseLocation": null,
        "pollItem": false,
        "isDiscontinued": false
      },
      {
        "id": 2,
        "itemName": "LAVAZZA CLASSICO",
        "description": "しっかりとした珈琲感とドライフルーツの風味が特徴のミディアムローストコーヒー。バランスのとれたリッチな味わいがお好みの方へオススメです。",
        "itemCategory": 2,
        "createdAt": "2023-06-26T00:41:39.313Z",
        "inTheOffice": false,
        "author": 1,
        "approval": true,
        "manufacturer": null,
        "purchaseLocation": null,
        "pollItem": false,
        "isDiscontinued": false
      },
      {
        "id": 3,
        "itemName": "LAVAZZA INTENSO",
        "description": "スモーキーで香ばしい力強いフレーバーのダークローストコーヒー。キャラメリゼしたような風味と濃厚な味わいはリアルミルクフロスとも相性抜群です。",
        "itemCategory": 1,
        "createdAt": "2023-06-26T00:41:39.316Z",
        "inTheOffice": false,
        "author": 1,
        "approval": true,
        "manufacturer": null,
        "purchaseLocation": null,
        "pollItem": false,
        "isDiscontinued": false
      },]),
    }));
    jest.mock('../hooks/useGetAnPoll', () => ({
      useGetAnPoll: jest.fn(() => [{
        "id": 3,
        "questionnaireId": 1,
        "userId": 2,
        "result": 10,
        "category": 1,
        "createdAt": "2023-06-26T00:41:39.282Z"
      },
      {
        "id": 4,
        "questionnaireId": 1,
        "userId": 2,
        "result": 9,
        "category": 1,
        "createdAt": "2023-06-26T00:41:39.283Z"
      }]),
    }));
  });

  it('投票結果を正しく表示', () => {
    render(
      <RecoilRoot>
      <BrowserRouter>
      <PollResult />
      </BrowserRouter>
    </RecoilRoot>
    );
    expect(screen.getByText('たくさんのご投票ありがとうございました!!')).toBeInTheDocument();
    expect(screen.getByText('またのご参加お待ちしております!')).toBeInTheDocument();
    expect(screen.getByText('1票')).toBeInTheDocument();
  });

  it('投票結果がない場合', () => {
    jest.mock('../hooks/useGetAnPoll', () => ({
      ...jest.requireActual('../hooks/useGetAnPoll'),
      useGetAnPoll: jest.fn(() => []),
    }));
    render(
      <RecoilRoot>
        <BrowserRouter>
          <PollResult />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(screen.getByText('今回の投票結果はありませんでした。')).toBeInTheDocument();
  });

  
});
