import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import './App.css';

import { MainRouter } from './router/MainRouter';

export const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
