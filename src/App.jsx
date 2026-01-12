import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Collections from "./Pages/Collections";
import WatchDetails from "./Pages/Watch_details";
import AboutUs from "./Pages/About_Us";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Search from "./components/Search";
import Login from "./Pages/Login";
import Filter from "./components/Filter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Collections />} />
        <Route path="/watch/:id" element={<WatchDetails />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
