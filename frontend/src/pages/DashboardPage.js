import React from 'react';

import UserNavBar from '../components/UserNavBar';
import FoodTable from '../components/FoodTable';

const DashboardPage = () =>
{

    return(
      <div id="dashboardPage" className="backgroundPage fillBackground">
        <UserNavBar />
        <div className="container-fluid">
          <FoodTable />
        </div>
      </div>
    );
};

export default DashboardPage;