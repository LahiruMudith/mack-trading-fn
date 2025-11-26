import {BrowserRouter, Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";
import Layout from "../Layout/Layout.tsx";

export default function Router(){

    const Home = lazy(() => import("../pages/home.tsx"))
    const About = lazy(() => import("../pages/about.tsx"))
    const Contact = lazy(() => import("../pages/contact.tsx"))
    const Gallery = lazy(() => import("../pages/gallery.tsx"))
    const Shop = lazy(() => import("../pages/shop.tsx"))

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
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    )
}