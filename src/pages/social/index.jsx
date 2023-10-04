import { Outlet } from 'react-router-dom';
import './index.scss';
import Sidebar from '../../components/Sidebar';

const Social = () => {
    return (
        <>
            {/* <Header /> */}
            <div className="dashboard">
                <div className="dashboard-sidebar">
                    <Sidebar />
                </div>
                <div className="dashboard-content">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Social;
