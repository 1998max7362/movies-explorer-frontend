import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export const HeaderLayout = () => {
    return <div className="headerLayout">
        <Header/>
        <Outlet />
    </div>
}
