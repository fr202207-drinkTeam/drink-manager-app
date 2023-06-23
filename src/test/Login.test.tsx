import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import LoginForm from '../components/organisms/LoginForm';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { MainRouter } from '../router/MainRouter';
import Top from '../components/pages/Top';
import EmailInput from '../components/atoms/login/EmailInput';
import { FocusEvent } from 'react';

// yarn test src/components/LoginForm.test.js

describe('LoginForm', () => {
  test('title表示', () => {
    const loginTitle = 'Login';
    render(
      <RecoilRoot>
        <BrowserRouter>
          <LoginForm loginTitle={loginTitle} />
        </BrowserRouter>
      </RecoilRoot>
    );
    const titleElement = screen.getByText(loginTitle);
    expect(titleElement).toBeInTheDocument();
  });

  test('存在しないユーザのバリデーション表示', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <LoginForm loginTitle='Login' />
        </BrowserRouter>
      </RecoilRoot>
    );
    const emailInput = screen.getByPlaceholderText('example@rakus-partners.co.jp');
    const passwordInput = screen.getByPlaceholderText('パスワード');
    const submitButton = screen.getByRole('button', { name: 'ログイン' });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.click(submitButton);
    const errorMessage = await screen.findByText('ユーザーが存在しません');
    expect(errorMessage).toBeInTheDocument();
  });

  test('emailinputが空の場合のエラー', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <LoginForm loginTitle='Login' />
        </BrowserRouter>
      </RecoilRoot>
    );
    const emailInput = screen.getByPlaceholderText('example@rakus-partners.co.jp');
    fireEvent.blur(emailInput);
    const errorUserMessage = screen.getByText('メールアドレスを入力してください');
    expect(errorUserMessage).toBeVisible();
  });

  test('emailinputに@が入っていない場合のエラー', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
           <LoginForm loginTitle='Login' />
        </BrowserRouter>
      </RecoilRoot>
    );
    const emailInput = screen.getByPlaceholderText('example@rakus-partners.co.jp') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'email' } });
    fireEvent.blur(emailInput); 
    expect(emailInput.value).toBe('email');
    const errorText = screen.queryByText('＠を含んだ40文字以内で入力してください');
    expect(errorText).toBeInTheDocument();
  });

  test('passwordinputが空の場合のエラー', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <LoginForm loginTitle='Login' />
        </BrowserRouter>
      </RecoilRoot>
    );
    const passwordInput = screen.getByPlaceholderText('パスワード');
    fireEvent.blur(passwordInput);
    const errorUserMessage = screen.getByText('パスワードを入力してください');
    expect(errorUserMessage).toBeVisible();//表示されているか
  });

  test('passwordinputのその他エラーメッセージ表示', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <LoginForm loginTitle='Login' />
        </BrowserRouter>
      </RecoilRoot>
    );
    // パスワード入力要素を取得
    const passwordInput = screen.getByPlaceholderText('パスワード')as HTMLInputElement;
  
    // パスワードを入力
    fireEvent.change(passwordInput, { target: { value: 'pass123' } });
    fireEvent.blur(passwordInput); 
    expect(passwordInput.value).toBe('pass123');
    const errorMessage = screen.getByText(/半角英字大文字、小文字、数字の3種類を1つ必ず使用/);
    expect(errorMessage).toBeInTheDocument();
  
    fireEvent.blur(passwordInput);
  
    fireEvent.focus(passwordInput);
  
    const elements = screen.getAllByText(/8文字以上16文字以内/);
    const errorTextElement = elements[0];
    expect(errorTextElement).toBeInTheDocument();
    const elements2 = screen.getAllByText(
      /半角英字大文字、小文字、数字の3種類を1つ必ず使用/
    );
    const errorTextElement2=elements2[0];
    expect(errorTextElement2).toBeInTheDocument();
  });

  test('正常なログイン処理', async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <RecoilRoot>
        <LoginForm loginTitle='Login' />
        <Top/>
        </RecoilRoot>
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText('example@rakus-partners.co.jp')as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('パスワード')as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'ログイン' })as HTMLButtonElement;
    fireEvent.change(emailInput, { target: { value: 'example2@rakus-partners.co.jp' } });
    fireEvent.change(passwordInput, { target: { value: 'Example2' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'ログアウト' })).toBeInTheDocument();
    });
  });
})

