import Header from "../component/Header.tsx";
import {Outlet} from "react-router-dom";
import Footer from "../component/footer.tsx";
import ChatBot from "../component/ui/chatBot.tsx";

function Layout() {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <div className="sticky top-0 z-10">
                <Header/>
            </div>
            <main className="flex-grow">
                <ChatBot />
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
}

export default Layout;