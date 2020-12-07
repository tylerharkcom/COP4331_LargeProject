import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import UserNavBar from '../components/UserNavBar';
import FoodTable from '../components/FoodTable';
import Feed from '../components/Feed';
import Row from 'react-bootstrap/Row';

const DashboardPage = () =>
{

    return(
      <div id="dashboardPage" className="backgroundPage fillBackground">
        <UserNavBar />
        <Container fluid>
          <Row>
            <Col xs={7}>
              <FoodTable />
            </Col>
            <Col>
              <div id="feedDiv">
                <div id="feedWrapper">
                  <h2 className="feedTitle">What's Cookin'?</h2>
                  <Feed />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
};

export default DashboardPage;