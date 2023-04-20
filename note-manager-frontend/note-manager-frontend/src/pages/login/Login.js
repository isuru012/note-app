import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import {Link} from "react-router-dom";
import {email} from "auth0-lock/lib/field";

function Login() {
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');




        if (storedUsername && storedPassword) {
            setUserName(storedUsername);
            setPassword(storedPassword);
            const signIn = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/login/login?username=${storedUsername}&password=${storedPassword}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const data = await response.json();

                    if (response.ok) {
                        navigate('/dashboard');
                    } else {
                        alert(data.message);
                    }
                } catch (error) {
                    console.error(error);
                    alert('An error occurred while logging in. Please try again later.');
                }
            }
            signIn();
        }


    },[] );

    const [justifyActive, setJustifyActive] = useState('tab1');
    ;

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };


    const usernameRegex = /^[a-zA-Z0-9._-]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const [email1, setEmail] = useState('');
    const [password1, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const [isChecked, setIsChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const navigate = useNavigate();

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleUsernameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!isChecked) {
            setErrorMessage('Please check the box to agree to the terms');

            return;
        }
        if (!usernameRegex.test(userName)) {
            setErrorMessage('Invalid username format');

            return;
        }
        if (!emailRegex.test(email1)) {
            setErrorMessage('Invalid email format');

            return;
        }
        if (!passwordRegex.test(password1)) {
            setErrorMessage(
                'Invalid password! Please enter a password that is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, one number and one special character'
            );

            return;
        }
        // handle form submission
        setErrorMessage("");
        const data = {userName, email1, password1};

        const requestBody = {
            userName: data.userName,
            email: data.email1,
            password: data.password1
        };
        try {


            const response = await fetch('http://localhost:8080/api/login/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)

            });
            const data = await response.json();

            if (response.ok) {
               handleJustifyClick('tab1');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while logging in. Please try again later.');
        }

    };


    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const rememberMe = document.getElementById('flexCheckDefault').checked;
            const response = await fetch(`http://localhost:8080/api/login/login?username=${userName}&password=${password1}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                if (rememberMe) {
                    localStorage.setItem('username', userName);
                    localStorage.setItem('password', password1);
                } else {
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');
                }
                navigate('/dashboard');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while logging in. Please try again later.');
        }
    };

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Login
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Register
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>

                <MDBTabsPane show={justifyActive === 'tab1'}>

                    <div className="text-center mb-3">
                        <p>Sign in with:</p>

                        <div className='d-flex justify-content-center mx-auto' style={{width: '40%'}}>

                            <MDBBtn tag='a' color='none' className='m-1 ' style={{color: '#1266f1'}}>
                                <MDBIcon fab icon='google' size="sm"/>
                            </MDBBtn>

                        </div>

                        <p className="text-center mt-3">or:</p>
                    </div>

                    <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text'
                              value={userName} onChange={(e) => setUserName(e.target.value)}
                              pattern={emailRegex}
                              required
                              validate
                              error='Invalid Email format'
                    />
                    <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'
                              value={password1} onChange={(e) => setPassword(e.target.value)}
                              pattern={passwordRegex}
                              required
                              validate
                              error='Invalid password! Please enter a password that is at least 8 characters long and contains at least one letter and one number.'

                    />

                    <div className="d-flex justify-content-between mx-4 mb-4">
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me'/>

                    </div>

                    <MDBBtn className="mb-4 w-100" onClick={handleSignIn}>Sign in</MDBBtn>


                    <p className="text-center">Not a member? <a href="#" onClick={() => handleJustifyClick('tab2')}>Register</a></p>

                </MDBTabsPane>

                <MDBTabsPane show={justifyActive === 'tab2'}>

                    <div className="text-center mb-3">
                        <p>Sign up with:</p>

                        <div className='d-flex justify-content-center mx-auto' style={{width: '40%'}}>

                            <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                <MDBIcon fab icon='google' size="sm"/>
                            </MDBBtn>

                        </div>

                        <p className="text-center mt-3">or:</p>
                    </div>

                    <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text'
                              pattern={usernameRegex}
                              required
                              validate
                              error='Invalid username format'
                              value={userName}
                              onChange={handleUsernameChange}

                    />
                    <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'
                              pattern={emailRegex}
                              required
                              validate
                              error='Invalid Email format'
                              value={email1}
                              onChange={handleEmailChange}

                    />
                    <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'
                              pattern={passwordRegex}
                              required
                              validate
                              error='Invalid password! Please enter a password that is at least 8 characters long and contains at least one letter and one number.'
                              value={password1}
                              onChange={handlePasswordChange}
                    />

                    <div className='d-flex justify-content-center mb-4'>
                        <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms'
                                     checked={isChecked}
                                     onChange={handleCheckboxChange}
                        />
                    </div>

                    <MDBBtn className="mb-4 w-100" onClick={handleSignup}>Sign up</MDBBtn>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                </MDBTabsPane>

            </MDBTabsContent>

        </MDBContainer>
    );
}

export default Login;