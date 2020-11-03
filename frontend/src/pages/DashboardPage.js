import React from 'react';

import UserNavBar from '../components/UserNavBar';
import UserDashboard from '../components/UserDashboard';

const DashboardPage = () =>
{

    return(
      <div id="dashboardPage" class="backgroundPage">
        <UserNavBar />
        <div class="backgroundPage"></div>
      </div>
    );
};

export default DashboardPage;