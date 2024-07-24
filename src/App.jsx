// import styled from 'styled-components';
import Home from './pages/Home';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Playlist from './pages/Playlist';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/playlist" element={<Playlist />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
