import Header from "../component/Header.tsx";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <div  className={"bg-gray-50"}>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;