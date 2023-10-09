import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom"
import Wrapper from '../assets/wrappers/Dashboard';
import SmallSideBar from "../components/SmallSideBar";
import BigSideBar from "../components/BigSideBar";
import Navbar from "../components/Navbar";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
    try {
        const {data} = await customFetch.get('/users/current-user')
        return data
    } catch (error) {
        return redirect('/')
    }
}
const DashboardContext = createContext()



const DashboardLayout = () => {
    const { user } = useLoaderData()

    const navigate = useNavigate()
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
        navigate('/')
        await customFetch.get('/auth/logout')
        toast.success('Loggining out...')
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
                            <Outlet context={{ user }}/>
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