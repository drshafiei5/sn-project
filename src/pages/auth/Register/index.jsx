import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { authService } from '../../../services/api/auth.service';
import { Utils } from '../../../services/utils/utils.service';
import { setUser } from '../../../redux/user/user.reducer';
import './index.scss';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [setStoredUsername] = useLocalStorage('username', 'set');
    const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set');

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const avatarColor = Utils.avatarColor();
            const avatarImage = Utils.generateAvatar(username.charAt(0).toUpperCase(), avatarColor);
            const result = await authService.signUp({
                username,
                email,
                password,
                avatarColor,
                avatarImage
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
            <form className="auth-form" onSubmit={registerUser}>
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
                        id="email"
                        name="email"
                        type="text"
                        value={email}
                        labelText="Email"
                        placeholder="Enter Email"
                        style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
                        handleChange={(event) => setEmail(event.target.value)}
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
                </div>
                <Button
                    label={`${loading ? 'SIGNUP IN PROGRESS...' : 'SIGNUP'}`}
                    className="auth-button button"
                    disabled={!username || !email || !password}
                />
            </form>
        </div>
    );
};

export default Register;
