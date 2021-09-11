import React from 'react'
import { Card, CardBody } from 'reactstrap';

const Dashboard = () => {
  return (
    <>
      <Card style={{ backgroundImage: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(97,186,255,1) 0%, rgba(166,239,253,1) 90.1% )' }}>
        <CardBody className='text-center'>
          <h3>Welcome to P.O and Inventory Management</h3>
        </CardBody>
      </Card>
    </>
  )
}

export default Dashboard
