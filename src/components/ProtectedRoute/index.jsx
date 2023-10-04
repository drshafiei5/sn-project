import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import useOnceCall from '../../hooks/useOnceCall';
import { userService } from '../../services/api/user.service';
import { clearUser, setUser } from '../../redux/reducers/user/user.reducer';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.user);
    const [userData, setUserData] = useState(null);
    const [tokenIsValid, setTokenIsValid] = useState(false);

    const keepLoggedIn = useLocalStorage('keepLoggedIn', 'get');
    const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set');
    const [deleteStorageUsername] = useLocalStorage('username', 'delete');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkUser = useCallback(async () => {
        try {
            setTokenIsValid(true);
            setUserData(user);

            if (user.token.length === 0) {
                const res = await userService.checkCurrentUser();
                const { token, user } = res.data;
                dispatch(setUser({ token, profile: user }));
            }
        } catch (error) {
            setTokenIsValid(false);
            setTimeout(async () => {
                dispatch(clearUser());
                // dispatch(clearNotification());
                deleteStorageUsername();
                setLoggedIn(false);
                await userService.logoutUser();
                navigate('/');
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteStorageUsername, dispatch, navigate, setLoggedIn]);

    useOnceCall(() => {
        checkUser();
    });

    if (keepLoggedIn || (!keepLoggedIn && userData) || (user.profile && user.token)) {
        if (!tokenIsValid) {
            return <></>;
        } else {
            return <>{children}</>;
        }
    } else {
        return <Navigate to="/" />;
    }
};

export default ProtectedRoute;
