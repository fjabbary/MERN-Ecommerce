import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from './components/NotFound';
import ShopNow from './components/ShopNow';
import OneCategoryItems from './components/OneCategoryItems';
import ProductDetails from './components/ProductDetails';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import SearchResult from './components/SearchResult';
import CheckoutSuccess from './components/CheckoutSuccess';
import MyFavorites from './components/MyFavorites';
import Footer from './components/Footer';
import useIdleLogout from './components/useIdleLogout';
import { logoutUser } from './features/authSlice';
import { useDispatch, useSelector } from 'react-redux';



const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth)

  const handleLogout = () => {
    if (token) {
      dispatch(logoutUser());
      alert('Logged out');
    }
  };

  const resetIdleTimer = useIdleLogout(5 * 60 * 1000, handleLogout);


  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop-now" element={<ShopNow />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search-result" element={<SearchResult />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/my-favorites" element={<MyFavorites />} />
        <Route path="/shop-now/:category" element={<OneCategoryItems />} />
        <Route path="/shop-now/:category/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}


export default App;
