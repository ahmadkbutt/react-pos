import React, { Component } from 'react';
import {
    Card, CardHeader, CardBody, Row, Col, Input, Label,
    Form, FormGroup, Button, Collapse,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';
import ProductInvoiceTable from './components/productInvoiceTable';
import Select from 'react-select';
import { toast } from "react-toastify";
import AddProduct from '../products/add';

class AddSale extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPoOpen: true,
            isSalesTaxApplied: true,
            isProductAddModalOpen: false,
            customers: [],
            products: [],
            orders: [],
            invoice: {
                invoiceNumber: `${new Date().toISOString().split('T')[0]} -- 1`,
                customerName: '',
                customerId: '',
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
        this.getOrders();
        this.addInvoiceProduct();
    }

    handleProductAdd = () => {

    }

    getOrders = () => {
        const { api } = window;
        api.get("orders")
            .then((response) => {
                if (response?.data) {
                    this.setState({
                        orders: response.data,
                    }, () => {
                        const lastOrder = this.state.orders.shift();
                        if (lastOrder) {
                            const { meta_data } = lastOrder
                            const { invoiceNumber } = JSON.parse(meta_data[0].value);
                            let [lastOrderDate, lastOrderNumber] = invoiceNumber.split('--');
                            lastOrderDate = new Date(lastOrderDate).toDateString();
                            const currentDate = new Date().toDateString();
                            if (lastOrderDate === currentDate) {
                                const newInvoiceNumber = `${new Date().toISOString().split('T')[0]} -- ${Number(lastOrderNumber) + 1}`;
                                const { invoice } = this.state;
                                invoice.invoiceNumber = newInvoiceNumber;
                                this.setState({
                                    invoice
                                }, () => {
                                    console.clear()
                                })
                            }
                        }
                    })
                }
            }).catch((error) => {
                console.log(error);
            });
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

    handleProductChange = (e) => {
        const { id, value } = e.target;
        if (value) {
            const { invoiceProducts } = this.state;
            const productArr = this.state.products.filter(product => product.name === value);
            const productObj = productArr[0];
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
        if (e.target.customerId) {
            invoice.customerId = e.target.customerId;
        }
        invoice[name] = value;
        this.setState({
            invoice
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }, () => {
            this.setSalesTax();
        })
    }

    setSalesTax = () => {
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

    setTotalBalance = () => {
        let { discount, totalBalance, totalAmount } = this.state;
        totalBalance = totalAmount - ((totalAmount * discount) / 100);
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

    deleteProduct = (row) => {
        const filteredInvoiceProducts = this.state.invoiceProducts.filter(product => product.id !== row.id);
        this.setState({
            invoiceProducts: filteredInvoiceProducts
        }, () => {
            this.setTotalAmount()
        })
    }

    handleSubmit = () => {
        const { invoice, invoiceProducts, totalAmount, discount, charity, totalBalance, salesTax } = this.state;
        const { api } = window;
        const productItems = invoiceProducts.map(product => {
            return {
                product_id: product.productId,
                quantity: parseInt(product.quantity)
            }
        })
        const data = {
            customer_id: invoice.customerId,
            line_items: [...productItems],
            meta_data: [
                {
                    key: 'invoice',
                    value: JSON.stringify(invoice)
                },
                {
                    key: 'charity',
                    value: charity
                },
                {
                    key: 'totalAmount',
                    value: totalAmount
                },
                {
                    key: 'totalBalance',
                    value: totalBalance
                },
                {
                    key: 'discount',
                    value: discount
                },
                {
                    key: 'salesTax',
                    value: salesTax
                },
                {
                    key: 'invoiceProducts',
                    value: JSON.stringify(invoiceProducts)
                }
            ],
        }

        api.post("orders", data).then((res) => {
            if (res?.data) {
                toast.success("Order Added Successfully");
                this.props.history.push("/sales");
            }
        });
    }

    handlePoOpen = () => {
        const { isPoOpen } = this.state;
        this.setState({
            isPoOpen: !isPoOpen
        })
    }

    handleSalesTaxAppliedChange = (e) => {
        const { isSalesTaxApplied } = this.state;
        this.setState({
            isSalesTaxApplied: !isSalesTaxApplied
        }, () => {
            const { isSalesTaxApplied } = this.state;
            if (!isSalesTaxApplied) {
                const { salesTax } = this.state;
                localStorage.setItem('salesTax', salesTax);
                this.setState({
                    salesTax: 0
                }, () => {
                    this.setSalesTax();
                })

            } else if (isSalesTaxApplied) {
                const previousSalesTax = localStorage.getItem('salesTax');
                this.setState({
                    salesTax: previousSalesTax
                }, () => {
                    localStorage.removeItem('salesTax');
                    this.setSalesTax();
                })
            }
        })
    }

    handleModalToggle = () => {
        this.setState({
            isProductAddModalOpen: !this.state.isProductAddModalOpen
        }, () => {
            this.getProducts()
        })
    }

    render() {
        const { customers, totalAmount, totalBalance, discount, charity, invoice,
            isSubmitButtonDisabled, isPoOpen, isSalesTaxApplied, isProductAddModalOpen } = this.state;
        const { invoiceNumber, poNumber, poStatus, orderGivenBy, orderDate, deliveryDate, billStatus } = invoice;
        const customersList = customers.map((customer, i) => {
            return {
                value: customer.first_name + ' ' + customer.last_name,
                label: customer.first_name + ' ' + customer.last_name,
                target: {
                    name: 'customerName',
                    value: customer.first_name + ' ' + customer.last_name,
                    customerId: customer.id
                }
            }
        })

        return (
            <>
                <Modal isOpen={isProductAddModalOpen} centered={true} size='lg'>
                    <ModalHeader >
                        <Button onClick={this.handleModalToggle} color='danger'>x</Button>
                    </ModalHeader>
                    <ModalBody>
                        <AddProduct modal={true} handleModalToggle={this.handleModalToggle}/>
                    </ModalBody>
                </Modal>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col className='form-inline'>Add P.O</Col>

                            <Col className='form-inline' >
                                <FormGroup>
                                    <Label className='p-2'>Sales Tax %</Label>
                                    <Input type='checkbox' defaultChecked={!isSalesTaxApplied} onChange={this.handleSalesTaxAppliedChange}></Input>
                                    <Input disabled={!isSalesTaxApplied} type='number' name='salesTax' defaultValue={this.state.salesTax} onChange={this.handleChange}>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col className='text-right'>
                                <Button color='success' onClick={this.handleModalToggle}>Add Product</Button>
                            </Col>
                            <Col className='text-right'>
                                <Button color='primary' onClick={this.handlePoOpen}>Toggle</Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <Collapse isOpen={isPoOpen}>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="invoiceNumber">Invoice No</Label>
                                            <Input
                                                type="text"
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
                    </Collapse>
                </Card>
                <ProductInvoiceTable products={this.state.products}
                    invoiceProducts={this.state.invoiceProducts} salesTax={this.state.salesTax}
                    handleProductChange={this.handleProductChange} handleQuantityChange={this.handleQuantityChange}
                    addProduct={this.addInvoiceProduct} deleteProduct={this.deleteProduct}
                    handleModalToggle={this.handleModalToggle}
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
                                    <Button color='primary' disabled={isSubmitButtonDisabled} onClick={this.handleSubmit}>
                                        Save
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

export default AddSale;