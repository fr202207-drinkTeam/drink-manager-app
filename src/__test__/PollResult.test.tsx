import { render, screen, fireEvent, act, waitFor, Matcher, renderHook } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import PollResult from '../components/pages/PollResult';
import useGetAnQuestionnaire from '../hooks/useGetAnQuestionnaire';
import ItemCard from '../components/organisms/card/ItemCard';
import useGetAnPoll from '../hooks/useGetAnPoll';


describe('PollResult', () => {

  it('投票idごとに取得できること', async () => {
    const id = 1; 
    const pollDataMock = [{
      "id": 1,
      "questionnaireId": 1,
      "userId": 2,
      "result": 10,
      "category": 1,
      "createdAt": "2023-06-26T00:41:39.282Z"
    },];

    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(pollDataMock),
    } as unknown as Response);

    const { result } = renderHook(() => useGetAnPoll(id));
    console.log(result)

    await waitFor(() => {
      return result.current.length > 0;
    });

    expect(result.current).toEqual(pollDataMock);
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