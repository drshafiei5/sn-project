import { useRoutes } from 'react-router-dom';

import Social from './pages/social';
import Streams from './pages/social/streams/Streams';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthTabs, ForgotPassword, ResetPassword } from './pages/auth';

export const AppRouter = () => {
    const routes = useRoutes([
        { path: '/', element: <AuthTabs /> },
        {
            path: '/forgot-password',
            element: <ForgotPassword />
        },
        {
            path: '/reset-password',
            element: <ResetPassword />
        },
        {
            path: '/app/social',
            element: (
                <ProtectedRoute>
                    <Social />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: 'streams',
                    element: <Streams />
                }
            ]
        }
    ]);

    return routes;
};
