// GoogleLoginButton.js
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {

  const clientId = '163730107252-h941v2jmp8plhiq46fuv81lbpe3ips03.apps.googleusercontent.com'; 

  const onSuccess = async (response: any) => {
    console.log('Login Success:', response);
    try {
       const res = await fetch('http://localhost:3001/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: response.credential }),
        })
        console.log(res.json(),'res google');
        
    } catch (error) {
        console.log('error login');
        
    }
        
  };

  const onError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
