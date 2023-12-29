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

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop-now" element={<ShopNow />} />
        <Route path="/shop-now/:category" element={<OneCategoryItems />} />
        <Route path="/shop-now/:category/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  );
}


export default App;
