import React, { Component } from 'react'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import API from 'src/utils/api'
import WidgetsDropdown from './components/widgetsDropdown';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      customers: [],
    }
  }
  componentDidMount() {
    this.getCategories();
    this.getProducts();
    this.getCustomers();
  }
  getCategories = async () => {
    const api = new API("products/categories");
    const categories = await api.get();
    this.setState({
      categories,
    });
  }
  getProducts = async () => {
    const api = new API("products");
    const products = await api.get();
    this.setState({
      products,
    });
  }
  getCustomers = async () => {
    const api = new API("customers");
    const customers = await api.get();
    this.setState({
      customers,
    });
  }

  render() {
    const {categories, products, customers} = this.state;
    return (
      <>
        <Card >
          <CardHeader className='text-center' style={{ backgroundImage: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(97,186,255,1) 0%, rgba(166,239,253,1) 90.1% )' }}>
            <CardTitle tag='h3'>
              Welcome to P.O and Inventory Management
            </CardTitle>
          </CardHeader>
          <CardBody className='text-center'>
            <WidgetsDropdown categories={categories.length} products={products.length} customers={customers.length}/>
          </CardBody>
        </Card>
      </>
    )
  }
}

export default Dashboard
