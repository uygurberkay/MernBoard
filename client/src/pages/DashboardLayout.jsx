import { Outlet } from "react-router-dom"
import Wrapper from '../assets/wrappers/Dashboard';
import SmallSideBar from "../components/SmallSideBar";
import BigSideBar from "../components/BigSideBar";
import Navbar from "../components/Navbar";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App";

const DashboardContext = createContext()



const DashboardLayout = () => {
    
    /* Temp */
    const user = {name : 'Berkay'}
    const [showSidebar, setShowSidebar] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [isDarkTheme , setIsDarkTheme] = useState(checkDefaultTheme());
    
    const toggleDarkTheme = () => {
        // console.log('toggle dark theme');
        const newDarkTheme = !isDarkTheme
        setIsDarkTheme(newDarkTheme)
        document.body.classList.toggle('dark-theme', newDarkTheme)
        localStorage.setItem('darkTheme', newDarkTheme)
    };
    
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };
    
    const logoutUser = async () => {
        console.log('logout user');
    };

    return (
        <DashboardContext.Provider
            value={{
                user,
                showSidebar,
                isDarkTheme,
                toggleDarkTheme,
                toggleSidebar,
                logoutUser,
            }}
        >
            <Wrapper>
                <main className="dashboard">
                    <SmallSideBar />
                    <BigSideBar />
                    <div>
                        <Navbar/>
                        <div className="dashboard-page">
                            <Outlet/>
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
    )
}

/* Custom React Hook */
export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout