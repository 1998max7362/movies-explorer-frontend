import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export const HeaderLayout = ({loggedIn,windowSize}) => {
    return <>
        <Header loggedIn={loggedIn} windowSize={windowSize}/>
        <Outlet />
    </>
}
