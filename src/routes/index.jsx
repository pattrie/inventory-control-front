import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Products } from "../pages/products";
import { PrivateRoutes } from "./privateRoutes";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<PrivateRoutes />}>
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </Router>
  );
};
