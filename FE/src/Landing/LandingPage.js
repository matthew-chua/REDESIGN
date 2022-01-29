import React from 'react';
import Button from '../Common/Button';

import { useNavigate } from 'react-router-dom';

export default function LandingPage() {

  const navigate = useNavigate();

  const loginPageHandler = () => {
    const path = '/login'
    navigate(path)
  }
  
  return <div>
      <h1>Sup bro</h1>
      <h3>Think you needa login</h3>
      <Button onClickHandler={loginPageHandler}>Login</Button>
  </div>;
}
