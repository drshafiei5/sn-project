import { useRoutes } from 'react-router-dom';

import Social from './pages/Social';
import Streams from './pages/Social/Streams';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthTabs, ForgotPassword, ResetPassword } from './pages/Auth';
import Profile from './pages/Social/Profile';
import Chat from './pages/Social/Chat';

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
                },
                {
                    path: 'chat/messages',
                    element: <Chat />
                },
                {
                    path: 'profile/:username',
                    element: <Profile />
                }
            ]
        }
    ]);

    return routes;
};
