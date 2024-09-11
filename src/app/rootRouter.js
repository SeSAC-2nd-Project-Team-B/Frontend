import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import RegisterContainer from '../features/User/Register/container/RegisterContainer';
import { LoginContainer } from '../features/User/login/container/LoginContainer';
import UserEditContainer from '../features/User/mypage/container/UserEditContainer';
import MyPageContainer from '../features/User/mypage/container/MyPageContainer';
import PaymentPage from '../pages/Payment/PaymentPage';
import ChatPage from '../pages/Chat/ChatPage';
import AdminPage from '../pages/Admin/AdminPage';
import Header from '../shared/Header';
import PostProductContainer from '../features/Product/PostProduct/container/PostProductContainer';
import ProductDetailPage from '../pages/Product/ProductDetail/ProductDetailPage.jsx';
import PageNotFound from '../pages/PageNotFound.jsx';
import ChatButton from '../shared/ChatButton';

export const RootRouter = () => {
  const location = useLocation();

  const showHeaderPaths = ['/', '/mypage', '/postproduct', '/productdetail'];
  const showChatButtonPaths = ['/'];

  return (
    <>
      {showHeaderPaths.includes(location.pathname) && <Header />}
      {showChatButtonPaths.includes(location.pathname) && <ChatButton />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="/mypage" element={<MyPageContainer />} />
        <Route path="/mypageEdit" element={<UserEditContainer />} />
        <Route path="/product/write" element={<PostProductContainer />} />
        <Route path="/productdetail" element={<ProductDetailPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:roomId" element={<ChatPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </>
  );
};
