// import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import PageNotFound from './pages/PageNotFound';
import Playlist from './pages/Playlist';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './pages/Search';
import Artist from './pages/Artist';
import { AppContextProvider } from './contexts/AppContext';
import Album from './pages/Album';
import SimilarTracks from './pages/SimilarTracks';
// import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <AppContextProvider>
      <GlobalStyles />
      <Toaster />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/playlist/:id" element={<Playlist />} />
              <Route path="/search" element={<Search />} />
              <Route path="/artist/:id" element={<Artist />} />
              <Route path="/album/:id" element={<Album />} />
              <Route path="/track/similar/:id" element={<SimilarTracks />} />
            </Route>
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
