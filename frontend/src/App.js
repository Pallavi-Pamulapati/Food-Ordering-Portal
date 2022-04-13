import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import BProfile from "./components/users/BProfile";
import VProfile from "./components/users/VProfile";
import Login from "./components/users/Login";
import Welcomeb from "./components/users/Bwelcome";
import Welcomev from "./components/users/Vwelcome";
import FoodMenu from "./components/users/Food";
import FoodItems from "./components/users/Bfood";
import MyOrders from "./components/users/MyOrders";
import OrdersPlaced from "./components/users/OrdersPlaced";
import Statistics from "./components/users/Statistics";
import MyFav from "./components/users/BFav";
import MyWallet from "./components/users/Wallet";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path = "login" element = {<Login/>}/>
          {/* <Route path="profile" element={<Profile />} /> */}
          {/* <Route path = "buyerwelcome" element={<Welcomeb/>}/>
          <Route path = "vendorwelcome" element={<Welcomev/>}/> */}
        </Route>
        <Route path = "buyerwelcome" element={<Welcomeb/>}/>
          <Route path = "vendorwelcome" element={<Welcomev/>}/>
          <Route path="bprofile" element={<BProfile />} />
          <Route path = "vprofile" element={<VProfile/>} />
          <Route path = "food" element = {<FoodMenu />} />
          <Route path = "fooditems" element = {<FoodItems />} />
          <Route path = "myorders" element = {<MyOrders />} />
          <Route path = "ordersplaced" element = {<OrdersPlaced />} />
          <Route path = "statistics" element = {<Statistics/>}/>
          <Route path = "myfav" element = {<MyFav/>}/>
          <Route path = "mywallet" element = {<MyWallet/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
