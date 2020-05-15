import { Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


export default function LogoutPage(props) {
    const { ...rest } = props;

    const [wasRemoved, setRemoved] = useState(false);

    const removeToken = () => {
        window.localStorage.removeItem('hnh-id');
        window.localStorage.removeItem('hnh-nickname');
        window.localStorage.removeItem('hnh-email');
        window.localStorage.removeItem('hnh-provider');
        window.localStorage.removeItem('hnh-token');
        setRemoved(true);
    }

    useEffect(() => {
        removeToken();
    });
    return (
        <div>
            {wasRemoved && <Redirect to='/' />}
        </div>
    );
}