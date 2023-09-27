import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import useOnceCall from '../../hooks/useOnceCall';
import { userService } from '../../services/api/user.service';
import { clearUser, setUser } from '../../redux/user/user.reducer';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const { profile, token } = useSelector((state) => state.user);
    const [userData, setUserData] = useState(null);
    const [tokenIsValid, setTokenIsValid] = useState(false);

    const keepLoggedIn = useLocalStorage('keepLoggedIn', 'get');
    const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set');
    const [deleteStorageUsername] = useLocalStorage('username', 'delete');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkUser = useCallback(async () => {
        try {
            const res = await userService.checkCurrentUser();
            const { token, user } = res.data;
            setUserData(user);
            setTokenIsValid(true);
            dispatch(setUser({ token, profile: user }));
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
    }, [deleteStorageUsername, dispatch, navigate, setLoggedIn]);

    useOnceCall(() => {
        checkUser();
    });

    if (keepLoggedIn || (!keepLoggedIn && userData) || (profile && token)) {
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
