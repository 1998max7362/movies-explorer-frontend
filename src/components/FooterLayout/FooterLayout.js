import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';

export const FooterLayout = () => {
    return <>
        <Outlet />
        <Footer />
    </>
}
