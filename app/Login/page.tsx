"use client";
import styles from './Login.module.css';
import React, { useState}  from "react";

export const Login = () =>{
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        console.log(email);

    }
    return (
        <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
        <div className={styles.logoContainer}>
          {/* Logo or title; replace with your actual logo image */}
          <h1 className={styles.title}>CalPal</h1>
          </div>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                
                <input
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email or Username"
                    id="email"
                    name="email"
                />
                
                <input
                    className={styles.input}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                />
                <div className={styles.forgotPassword}>
                    {/* Forgot Password link */}
                    <a href="/forgot-password" className={styles.forgotPasswordLink}>Forgot Password?</a>
                </div>
                <button type="submit" className={styles.loginButton}>Login</button>
            </form>
            <div className={styles.orSeparator}>______________________or______________________</div>
            <button className={styles.signUpButton}>Sign Up</button>
        </div>
    </div>
);

    
    };
    export default Login; 