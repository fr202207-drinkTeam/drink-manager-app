import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Poll from '../../components/pages/Poll';
import PostPoll from '../../utils/PostPoll';

describe('投票画面', () => {
  test('タイトル初期表示', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Poll/>
        </BrowserRouter>
      </RecoilRoot>
    );
    const titleElement = screen.getByText("投票");
      expect(titleElement).toBeInTheDocument();
  });
  
  test('開催中の投票が存在しない場合', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Poll/>
        </BrowserRouter>
      </RecoilRoot>
    );
    const titleElement = screen.getByText("開催中の投票はありません");
      expect(titleElement).toBeInTheDocument();
  });

  const data = {
      questionnaireId: 1,
      userId: 2,
      category: 1,
      result: 1,
  };

  test('投票が正常に行えるか', async() => {
    const result: Boolean = await PostPoll(data);
    jest.spyOn(console, "error").mockImplementation();
    expect(result).toBe(true);
  });

});


