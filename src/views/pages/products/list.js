import React, { Component, Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import { Card, CardBody, Button, CardHeader, Row, Col, Badge } from 'reactstrap';
 
class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isLoading: true
        }
    }

    componentDidMount = () => {
        const {api} = window;
        api.get('products').then(res => {
            const {data} = res;
            this.setState({
                products: data,
                isLoading: false
            })
        })
    }
 
    render() {
        const columns = [
            {
                key: "id",
                text: "Id",
                className: "name",
                align: "left",
                sortable: true,
            },
            {
                key: "name",
                text: "Name",
                className: "name",
                align: "left",
                sortable: true,
            },
            {
                key: "price",
                text: "Price",
                className: "price",
                align: "left",
                sortable: true,
            },
            {
                key: "categories",
                text: "categories",
                className: "categories",
                align: "left",
                sortable: true,
                cell: record => {
                    const {categories} = record;
                    const categoriesBadges = categories.map((category, i) => {
                        return <h4 key={i}><Badge color="dark">{category.name}</Badge></h4>
                    })
                    return <div>{categoriesBadges}</div>
                }
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 200,
                align: "left",
                sortable: false,
                cell: record => { 
                    return (
                        <Fragment>
                            <Button
                                color = "info"
                                size = "sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                                Edit
                            </Button>
                            <Button 
                                color = "danger"
                                size = "sm"
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                                Delete
                            </Button>
                        </Fragment>
                    );
                }
            }
        ];
        const config = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            button: {
                excel: true,
                print: true,
                csv: true,
                filename: "products",
            }
        }
        
        return (
            <Card>
                <CardHeader>
                    <Row >
                        <Col>Products</Col>
                        <Col className="text-right">
                            <Button color = "success">Add Record</Button>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                <ReactDatatable
                    config={config}
                    records={this.state.products}
                    columns={columns}
                    extraButtons={[]}
                    loading = {this.state.isLoading}
                />
                </CardBody>
            </Card>
        )
    }
}

export default ProductsList;