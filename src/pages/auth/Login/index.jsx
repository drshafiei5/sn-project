import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import './index.scss';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);

    return (
        <div className="auth-inner">
            <form className="auth-form" onSubmit={() => {}}>
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

                <Link to={'/forgot-password'}>
                    <span className="forgot-password">
                        Forgot password? <FaArrowRight className="arrow-right" />
                    </span>
                </Link>
            </form>
        </div>
    );
};

export default Login;
