import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export const HeaderLayout = () => {
    return <>
        <Header/>
        <Outlet />
    </>
}
