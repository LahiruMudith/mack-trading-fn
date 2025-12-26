import {BrowserRouter, Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";
import Layout from "../Layout/Layout.tsx";

export default function Router(){

    const Home = lazy(() => import("../pages/home.tsx"))
    const About = lazy(() => import("../pages/about.tsx"))
    const Contact = lazy(() => import("../pages/contact.tsx"))
    const Gallery = lazy(() => import("../pages/gallery.tsx"))
    const Shop = lazy(() => import("../pages/shop.tsx"))
    const Cart = lazy(() => import("../pages/cart.tsx"))
    const Profile = lazy(() => import("../pages/profile.tsx"))
    const Login = lazy(() => import("../pages/login.tsx"))
    const Checkout = lazy(() => import("../pages/checkout.tsx"))
    const Account = lazy(() => import("../pages/account.tsx"))
    const Orders = lazy(() => import("../pages/orders.tsx"))
    const Address = lazy(() => import("../pages/address.tsx"))

    return(
        <>
            <BrowserRouter>
                <Suspense>
                    <Routes>
                        <Route path={"/"} element={<Layout/>}>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/contact" element={<Contact/>}/>
                            <Route path="/gallery" element={<Gallery/>}/>
                            <Route path="/shop" element={<Shop/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/checkout" element={<Checkout/>}/>
                            <Route path="/account" element={<Account/>}/>
                            <Route path="/orders" element={<Orders/>}/>
                            <Route path="/address" element={<Address/>}/>
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    )
}