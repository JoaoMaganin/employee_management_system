/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { LoginService } from '@/service/LoginService';
import { Toast } from 'primereact/toast';

const NewUserPage = () => {
    let emptyUser: Project.User = {
        id: null,
        name: '',
        password: '',
        email: '',
        login: ''
    };

    const [user, setUser] = useState<Project.User>(emptyUser);
    const loginService = useMemo(() => new LoginService(), []);

    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    const toast = useRef<Toast>(null);
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${name}`] = val;

        setUser(_user);
    };

    const newUser = () => {

        loginService.newUser(user).then((response) => {
            setUser(emptyUser);
            toast.current?.show({
                severity: 'info',
                summary: 'Success',
                detail: 'User registered successfull'
            });
        }).catch((error) => {
            console.log(error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error
            });
        })
    }

    return (
        <div className={containerClassName}>
            <Toast ref={toast} />
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">New user</div>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-900 text-xl font-medium mb-2">
                                Name
                            </label>
                            <InputText id="name" type="text" placeholder="Your name" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }}
                                value={user.name}
                                onChange={(e) => onInputChange(e, 'name')}
                            />

                            <label htmlFor="login" className="block text-900 text-xl font-medium mb-2">
                                Login
                            </label>
                            <InputText id="login" type="text" placeholder="Your login" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }}
                                value={user.login}
                                onChange={(e) => onInputChange(e, 'login')}
                            />

                            <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password inputId="password" placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem" value={user.password}
                                onChange={(e) => onInputChange(e, 'password')}></Password>

                            <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText id="email" type="text" placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }}
                                value={user.email}
                                onChange={(e) => onInputChange(e, 'email')}
                            />


                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }} onClick={() => router.push('/auth/login')}>
                                    I already have an account!
                                </a>
                            </div>
                            <Button label="Sign In" className="w-full p-3 text-xl" onClick={() => newUser()}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewUserPage;
