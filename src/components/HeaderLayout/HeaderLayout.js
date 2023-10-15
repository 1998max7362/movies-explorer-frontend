import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export const HeaderLayout = ({loggedIn}) => {
    return <>
        <Header loggedIn={loggedIn}/>
        <Outlet />
    </>
}
