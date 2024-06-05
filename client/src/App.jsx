import styled, { ThemeProvider } from "styled-components"
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import './App.css'
import { lightTheme } from "./utils/Themes"
import ToastMessage from "./components/ToastMessage"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { useState } from "react"
import Authentication from "./pages/Authantication"
import ShopListing from "./pages/ShopListing"
import Cart from "./pages/Cart"
import ProductDetails from "./pages/ProductDetails"
import { useSelector } from "react-redux"
import Favourite from "./pages/Favourite"
import Order from "./pages/Order"
import Search from "./pages/Search"
import Profile from "./pages/Profile"

const Container = styled.div`
  // width: 100%;
  // height: 100vh;
  // display: flex;
  // flex-direction: column;
  // background: ${({ theme }) => theme.bg};
  // color: ${({ theme }) => theme.text_primary};
  // overflow-x: hidden;
  // // overflow-y: hidden;
  // transition: all 0.2s ease;
`;
function App() {
  const [openAuth,setOpenAuth] = useState(false)
  const { currentUser } = useSelector((state) => state.user);
  const { open, message, severity } = useSelector((state) => state.user);
  // console.log(open,"====")
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar  openAuth={openAuth} currentUser={currentUser} setOpenAuth={setOpenAuth} />
          <Routes>
            <Route path="/" exact element={<Home setOpenAuth={setOpenAuth} />} />
            <Route path="/shop" exact element={<ShopListing />} />
            <Route path="/favorite" exact element={<Favourite />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/Orders" exact element={<Order />} />
            <Route path="/search" exact element={<Search />} />
            <Route path="/profile" exact element={<Profile currentUser={currentUser} />} />
            <Route path="/shop/:id" exact element={<ProductDetails setOpenAuth={setOpenAuth} />} />
          </Routes>
          {openAuth && <Authentication openAuth={openAuth} setOpenAuth={setOpenAuth}/>}
          {open && (
            <ToastMessage open={open} message={message} severity={severity} />
          )}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}


export default App
