import Header from "../component/Header.tsx";
import {Outlet} from "react-router-dom";
import Footer from "../component/footer.tsx";

function Layout() {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <div className="sticky top-0 z-10">
                <Header/>
            </div>
            <main className="flex-grow">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
}

export default Layout;