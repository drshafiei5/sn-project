import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { FaArrowRight } from 'react-icons/fa';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { authService } from '../../../services/api/auth.service';
import { setUser } from '../../../redux/reducers/user/user.reducer';
import './index.scss';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [setStoredUsername] = useLocalStorage('username', 'set');
    const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set');

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const result = await authService.signIn({
                username,
                password,
            });

            setLoggedIn(true);
            setStoredUsername(username);
            setAlertType('alert-success');

            const { token, user } = result.data;
            dispatch(setUser({ token, profile: user }));
            navigate('/app/social/streams');
        } catch (error) {
            setLoading(false);
            setHasError(true);
            setAlertType('alert-error');
            setErrorMessage(error?.response?.data?.message);
        }
    };

    return (
        <div className="auth-inner">
            {hasError && errorMessage && (
                <div className={`alerts ${alertType}`} role="alert">
                    {errorMessage}
                </div>
            )}
            <form className="auth-form" onSubmit={loginUser}>
                <div className="form-input-container">
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        labelText="Username"
                        placeholder="Enter Username"
                        style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
                        handleChange={(event) => setUsername(event.target.value)}
                    />
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        labelText="Password"
                        placeholder="Enter Password"
                        style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
                        handleChange={(event) => setPassword(event.target.value)}
                    />

                    <label className="checkmark-container" htmlFor="checkbox">
                        <Input
                            id="checkbox"
                            name="checkbox"
                            type="checkbox"
                            value={keepLoggedIn}
                            handleChange={() => setKeepLoggedIn(!keepLoggedIn)}
                        />
                        Keep me signed in
                    </label>
                </div>

                <Button
                    label={`${loading ? 'SIGNIN IN PROGRESS...' : 'SIGNIN'}`}
                    className="auth-button button"
                    disabled={!username || !password}
                />

                <Link to="/forgot-password">
                    <span className="forgot-password">
                        Forgot password? <FaArrowRight className="arrow-right" />
                    </span>
                </Link>
            </form>
        </div>
    );
};

export default Login;
