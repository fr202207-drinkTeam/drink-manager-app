import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Register from '../components/pages/Register';
import userEvent from '@testing-library/user-event';

describe('Registerコンポーネント', () => {
  test('フォームの必須項目が正しく表示されること', async() => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByText('会員登録')).toBeInTheDocument();
    expect(screen.getByLabelText('社員ID*')).toBeInTheDocument();
    expect(screen.getByLabelText('名 *')).toBeInTheDocument();
    expect(screen.getByLabelText('姓 *')).toBeInTheDocument();
    expect(screen.getByLabelText('メールアドレス *')).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード *')).toBeInTheDocument();
    expect(screen.getByLabelText('確認用パスワード *')).toBeInTheDocument();
    expect(screen.getByText('登録')).toBeInTheDocument();
  });

  test('必須項目が入力されていない場合、登録ボタンが無効になっていること', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </RecoilRoot>
    );

    const registerButton = screen.getByText('登録');
    expect(registerButton).toBeDisabled();
  });

  test('必須項目が入力されている場合、登録ボタンが有効になっていること', async() => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </RecoilRoot>
    );

    const userIdInput = screen.getByLabelText('社員ID*');
    const firstNameInput = screen.getByLabelText('名 *');
    const lastNameInput = screen.getByLabelText('姓 *');
    const emailInput = screen.getByLabelText('メールアドレス *');
    const passwordInput = screen.getByLabelText('パスワード *');
    const confirmPasswordInput = screen.getByLabelText('確認用パスワード *');
    const registerButton = screen.getByText('登録');

    fireEvent.change(userIdInput, { target: { value: '1845' } });
    fireEvent.change(firstNameInput, { target: { value: '花子' } });
    fireEvent.change(lastNameInput, { target: { value: 'テスト' } });
    fireEvent.change(emailInput, { target: { value: 'test123456@rakus-partners.co.jp' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123' } });

    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
 
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'ログアウト' })).toBeInTheDocument();
    });
  });

});