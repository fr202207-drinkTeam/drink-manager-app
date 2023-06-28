import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Poll from '../components/pages/Poll';

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

})

