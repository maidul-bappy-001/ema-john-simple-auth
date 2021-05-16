import React, { useContext, useState } from 'react'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createNewUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFrame, signInUserWithEmailAndPassword } from './LoginManager';


function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });

    initializeLoginFrame()

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(res => {
            handleResponse(res, true)
        })
    }

    const signOut = () => {
        handleSignOut()
        .then(res => {
           handleResponse(res, false)
        })
    }

    const fbSignIn = () => {
        handleFbSignIn()
        .then(res => {
            handleResponse(res, true)
        })
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res)
        if (redirect) {
            history.replace(from);
        }
    }
 
    const handleBlur = (e) => {
        let isFieldValid = true;

        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }

    // input form submit handle
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
          createNewUserWithEmailAndPassword(user.email, user.password, user.name)
          .then(res => {
            handleResponse(res, true)
          })
        }

        if (!newUser && user.email && user.password) {
            signInUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                handleResponse(res, true)
            })
        }

        e.preventDefault();
    }


    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Google Sign In Method</h1>
            {
                user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
                    <button onClick={googleSignIn}>Sign In</button>
            }

            <h1>External Email Authentication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUesr" id="" />
            <label htmlFor="newUesr">New User Sign Up</label>
            <br />
            <form onSubmit={handleSubmit}>
                {
                    newUser && <input type="text" onBlur={handleBlur} name='name' placeholder='Write your name' />
                }
                <br />
                <input type="text" onBlur={handleBlur} name="email" placeholder="Write your Email Address" required /> <br />
                <input type="password" onBlur={handleBlur} name="password" placeholder="Write your Email Password" required /><br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
            </form>
            <h1 style={{ color: 'red' }}>{user.error}</h1>
            {
                user.success && <h1 style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</h1>
            }

            <h1>Facebook Sign In Method</h1>
            <button onClick={fbSignIn}>Log In With Facebook</button>
        </div>
    );
}

export default Login;
