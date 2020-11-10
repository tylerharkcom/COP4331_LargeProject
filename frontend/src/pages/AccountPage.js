import React from 'react';

import MyAccount from '../components/MyAccount';
import UserNavBar from '../components/UserNavBar';

const AccountPage = () =>
{
    return(
    <div id="accountPage" className="backgroundPage fillBackground">            
        <UserNavBar />
        <MyAccount />
    </div>
    );
};

export default AccountPage;