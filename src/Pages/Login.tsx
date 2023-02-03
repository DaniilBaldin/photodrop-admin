import React, { useState } from 'react';

export const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const loginChangeHandler = (event: { target: { value: React.SetStateAction<string> } }) => {
        setLogin(event.target.value);
    };
    const passwordChangeHandler = (event: { target: { value: React.SetStateAction<string> } }) => {
        setPassword(event.target.value);
    };

    const formSubmitHandler = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const userData = {
            login: login,
            password: password,
        };
        console.log(userData);
        setLogin('');
        setPassword('');
    };

    return (
        <section className='main_login_page'>
            <div>
                <form
                    className='login_form'
                    onSubmit={formSubmitHandler}
                >
                    <h1 className='text_title'>Please, log in.</h1>
                    <label
                        className='login_label'
                        htmlFor='login'
                    >
                        Login
                        <input
                            type='text'
                            id='login'
                            className='login_input'
                            autoComplete='off'
                            minLength={4}
                            maxLength={16}
                            value={login}
                            // pattern='[a-fA-F_]'
                            onChange={loginChangeHandler}
                            required
                        />
                    </label>
                    <label
                        className='login_label'
                        htmlFor='password'
                    >
                        Password
                        <input
                            type='password'
                            id='password'
                            className='login_input'
                            autoComplete='off'
                            autoCorrect='off'
                            minLength={6}
                            maxLength={16}
                            onChange={passwordChangeHandler}
                            value={password}
                            // pattern='[0-9a-fA-F]'
                            required
                        />
                    </label>
                    <button
                        type='submit'
                        className='login_button'
                    >
                        {' '}
                        Log in
                    </button>
                </form>
            </div>
        </section>
    );
};
