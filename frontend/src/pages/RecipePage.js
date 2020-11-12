import React from 'react';

import UserNavBar from '../components/UserNavBar';
import FoodTable from '../components/FoodTable';

const RecipePage = () =>
{

    return(
      <div id="recipePage" className="backgroundPage fillBackground">
        <UserNavBar />
        <div className="container-fluid">
          <FoodTable crud={false} />
        </div>
      </div>
    );
};

export default RecipePage;