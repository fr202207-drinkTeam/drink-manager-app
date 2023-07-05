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
  
  const data = {
      questionnaireId: 1,
      userId: 2,
      category: 1,
      result: 1,
  };
  const MockPostPoll = async (data:any) => {
    let success = false;
    await fetch("http://localhost:50000/p", {
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

  test('投票が正常に行えるか', async() => {
    const result = await PostPoll(data);
    jest.spyOn(console, "error").mockImplementation();
    expect(result).toBe(true);
  });
  test('投票ができないこと', async() => {
    const result: Boolean = await MockPostPoll(data);
    jest.spyOn(console, "error").mockImplementation();
    expect(result).toBe(false);
  });

});
