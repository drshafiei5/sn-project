import Button from '../../../components/button/Button';
import Input from '../../../components/input/Input';
import './index.scss';
import { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [hasError, setHasError] = useState(false);

    return (
        <div className="auth-inner">
            {hasError && errorMessage && (
                <div className={`alerts ${alertType}`} role="alert">
                    {errorMessage}
                </div>
            )}
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
