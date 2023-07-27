import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthCheck = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    useEffect(() => {
      if (username !== "admin") {
        navigate('/login');
      }
    }, [username, navigate]);

    if (username !== "admin") {
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAuthCheck;
