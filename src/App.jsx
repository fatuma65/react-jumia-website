import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Form from "./routes/Form";
import Home from "./routes/Home";
import Login from "./routes/Login";
import UserAccount from "./routes/UserAccount";
import ProductDetailsPage from "./routes/ProductDetailPage";

const App = () => {
  const { isLoggedIn} = useSelector((state) => state.user)
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/product/details/:id" element={<ProductDetailsPage />}></Route>

        {isLoggedIn && (
          <>
            <Route path="/account/:UserId" element={<UserAccount />}></Route>
            <Route path='/:UserId' element={<Home />}></Route>
          </>
        )}
      </Routes>
    </>
  );
};
export default App;
