import React, { Component } from 'react';
import {
    Card, CardHeader, CardBody, Row, Col, Input, Label,
    Form, FormGroup, Button
} from 'reactstrap';
import ProductInvoiceTable from './components/productInvoiceTable';
import Select from 'react-select';


class AddSales extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            products: [],
            invoice: {
                invoiceNumber: Math.floor(Math.random() * 90000) + 10000,
                customerName: '',
                poNumber: Math.floor(Math.random() * 90000) + 10000,
                poStatus: 'completed',
                orderGivenBy: '',
                orderDate: new Date().toISOString().split('T')[0],
                deliveryDate: new Date().toISOString().split('T')[0],
                billStatus: 'added',
            },
            salesTax: 17,
            invoiceProducts: [],
            totalAmount: 0,
            discount: 0,
            charity: 0,
            totalBalance: 0,
            isSubmitButtonDisabled: true
        }
    }

    componentDidMount = () => {
        this.getCustomers();
        this.getProducts();
        this.addInvoiceProduct();
    }

    getCustomers = () => {
        const { api } = window;
        api.get('customers').then(res => {
            const { data } = res;
            this.setState({
                customers: data,
            })
        })
    }

    getProducts = () => {
        const { api } = window;
        api.get("products").then((res) => {
            const { data } = res;
            this.setState({
                products: data,
            });
        });
    }

    addInvoiceProduct = () => {
        const { invoiceProducts } = this.state;
        const invoiceProduct = {
            id: invoiceProducts.length + 1,
            productId: '',
            name: '',
            type: '',
            quantity: 1,
            rate: 0,
            salesTax: 0,
            amount: 0,
            amountIncSalesTax: 0,
            isQuantityDisabled: true
        }
        this.setState({
            invoiceProducts: [...invoiceProducts, invoiceProduct]
        })
    }

    setTotalAmount = () => {
        const { invoiceProducts } = this.state;
        let totalAmount = 0;
        invoiceProducts.forEach(product => {
            totalAmount = totalAmount + product.amountIncSalesTax
        })
        this.setState({
            totalAmount,
            totalBalance: totalAmount
        }, () => {
            this.setTotalBalance();
        })
    }

    handleProductChange = (e) => {
        const { id, value } = e.target;
        if (value) {
            const { invoiceProducts } = this.state;
            const productObj = this.state.products.filter(product => product.name === value)[0];

            invoiceProducts.forEach(product => {
                if (product?.id === parseInt(id)) {
                    product.productId = productObj.id
                    product.name = productObj.name
                    product.type = productObj.categories[0].name
                    product.isQuantityDisabled = false
                    product.rate = productObj.price;
                    product.amount = product.quantity * product.rate;
                    product.salesTax = (parseInt(this.state.salesTax) * parseInt(product.amount)) / 100
                    product.amountIncSalesTax = product.salesTax + product.amount;
                }
            });

            this.setState({
                invoiceProducts
            }, () => {
                this.setTotalAmount()
            })
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }, () => {
            this.setTotalBalance();
        })
    }

    handleInvoiceInputChange = (e) => {
        const { name, value } = e.target;
        const { invoice } = this.state;
        invoice[name] = value;
        console.log(invoice)
        this.setState({
            invoice
        })
    }

    setTotalBalance = () => {
        let { charity, discount, totalBalance, totalAmount } = this.state;
        totalBalance = totalAmount - charity - discount;
        this.setState({ totalBalance }, () => {
            const { totalBalance } = this.state;
            let isSubmitButtonDisabled = false;
            if (!totalBalance) {
                this.setState({
                    isSubmitButtonDisabled: !isSubmitButtonDisabled
                })
            } else this.setState({ isSubmitButtonDisabled: isSubmitButtonDisabled })
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }, () => {
            const { invoiceProducts } = this.state;
            invoiceProducts.forEach(product => {
                product.salesTax = (parseInt(this.state.salesTax) * parseInt(product.amount)) / 100
                product.amountIncSalesTax = product.salesTax + product.amount;
            })
            this.setState({
                invoiceProducts
            }, () => {
                this.setTotalAmount()
            })
        })
    }

    handleQuantityChange = (e) => {
        const { id, value } = e.target;
        const { invoiceProducts } = this.state;
        invoiceProducts.forEach(product => {
            if (product.id === parseInt(id)) {
                product.quantity = value;
                product.amount = product.quantity * product.rate;
                product.salesTax = (parseInt(this.state.salesTax) * parseInt(product.amount)) / 100
                product.amountIncSalesTax = product.salesTax + product.amount;
            }
        })
        this.setState({
            invoiceProducts
        }, () => {
            this.setTotalAmount();
        })
    }

    deleteProduct = (row) => {
        const filteredInvoiceProducts = this.state.invoiceProducts.filter(product => product.id !== row.id);
        this.setState({
            invoiceProducts: filteredInvoiceProducts
        }, () => {
            this.setTotalAmount()
        })
    }

    render() {
        const { customers, totalAmount, totalBalance, discount, charity, invoice, isSubmitButtonDisabled } = this.state;
        const { invoiceNumber, customerName, poNumber, poStatus, orderGivenBy, orderDate, deliveryDate, billStatus } = invoice;
        const customersList = customers.map((customer, i) => {
            return {
                value: customer.first_name + ' ' + customer.last_name,
                label: customer.first_name + ' ' + customer.last_name,
                target: {
                    name: 'customerName',
                    value: customer.first_name + ' ' + customer.last_name,
                }
            }
        })

        return (
            <>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col className='form-inline'>Add P.O</Col>
                            <Col className='text-right form-inline' sm="12" md={{ size: 4, offset: 2 }}>
                                <Label className='mr-sm-auto'>Sales Tax %</Label>
                                <Input type='number' name='salesTax' defaultValue={this.state.salesTax} onChange={this.handleChange}>
                                </Input>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="invoiceNumber">Invoice No</Label>
                                        <Input
                                            type="number"
                                            name="invoiceNumber"
                                            id="invoiceNumber"
                                            placeholder="Enter Invoice Number"
                                            value={invoiceNumber}
                                            onChange={(e) => this.handleInvoiceInputChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="invoiceNumber">Customer Name</Label>
                                        <Select 
                                        options={customersList} 
                                        onChange={(e) => this.handleInvoiceInputChange(e)} 
                                        name="customerName"
                                        id="customerName"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="poNumber">P.O No</Label>
                                        <Input
                                            type="number"
                                            name="poNumber"
                                            id="poNumber"
                                            placeholder="Enter P.O Number"
                                            value={poNumber}
                                            onChange={(e) => this.handleInvoiceInputChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="poStatus">P.O Status</Label>
                                        <Input
                                            type="select"
                                            name="poStatus"
                                            id="poStatus"
                                            defaultValue='completed'
                                            value={poStatus}
                                            onChange={(e) => this.handleInvoiceInputChange(e)}
                                        >
                                            <option value='completed' selected>Completed</option>
                                            <option value='pending'>Pending</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="orderGivenBy">Order Given By</Label>
                                        <Input
                                            type="text"
                                            name="orderGivenBy"
                                            id="orderGivenBy"
                                            placeholder="Enter Order Given By"
                                            value={orderGivenBy}
                                            onChange={(e) => this.handleInvoiceInputChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="orderDate">Order Date</Label>
                                        <Input
                                            type="date"
                                            name="orderDate"
                                            id="orderDate"
                                            placeholder="Enter Order Date"
                                            value={orderDate}
                                            onChange={(e) => this.handleInvoiceInputChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="orderDate">Delivery Date</Label>
                                        <Input
                                            type="date"
                                            name="deliveryDate"
                                            id="deliveryDate"
                                            placeholder="Enter Delivery Date"
                                            value={deliveryDate}
                                            onChange={(e) => this.handleInvoiceInputChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="billStatus">BillStatus</Label>
                                        <Input
                                            type="select"
                                            name="billStatus"
                                            id="billStatus"
                                            value={billStatus}
                                            onChange={(e) => this.handleInvoiceInputChange(e)}
                                        >
                                            <option value='completed' selected>Added</option>
                                            <option value='pending'>Pending</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
                <ProductInvoiceTable products={this.state.products}
                    invoiceProducts={this.state.invoiceProducts} salesTax={this.state.salesTax}
                    handleProductChange={this.handleProductChange} handleQuantityChange={this.handleQuantityChange}
                    addProduct={this.addInvoiceProduct} deleteProduct={this.deleteProduct}
                ></ProductInvoiceTable>
                <Card>
                    <CardBody>
                        <Form>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="totalAmount">Total Amount</Label>
                                        <Input
                                            type="number"
                                            name="totalAmount"
                                            id="totalAmount"
                                            value={totalAmount}
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="discount">Discount</Label>
                                        <Input
                                            type="number"
                                            name="discount"
                                            id="discount"
                                            placeholder="Enter Discount"
                                            value={discount}
                                            onChange={(e) => this.handleInputChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="discount">Charity</Label>
                                        <Input
                                            type="number"
                                            name="charity"
                                            id="charity"
                                            placeholder="Enter Charity Amount"
                                            value={charity}
                                            onChange={(e) => this.handleInputChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="totalBalance">Total Balance</Label>
                                        <Input
                                            type="number"
                                            name="totalBalance"
                                            id="totalBalance"
                                            value={totalBalance}
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='text-center'>
                                    <Button color='primary' disabled={isSubmitButtonDisabled}>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </>
        )
    }
}

export default AddSales;