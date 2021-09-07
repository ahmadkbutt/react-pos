import React, { Component, Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import { Card, CardBody, Button, CardHeader, Row, Col } from 'reactstrap';
 
class CategoriesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            isLoading: true
        }
    }

    componentDidMount = () => {
        const {api} = window;
        api.get('products/categories').then(res => {
            const {data} = res;
            this.setState({
                categories: data,
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
                filename: "categories",
            }
        }
        
        return (
            <Card>
                <CardHeader>
                    <Row >
                        <Col sm="10">Categories</Col>
                        <Col sm="2">
                            <Button color = "success">Add Record</Button>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                <ReactDatatable
                    config={config}
                    records={this.state.categories}
                    columns={columns}
                    extraButtons={[]}
                    loading = {this.state.isLoading}
                />
                </CardBody>
            </Card>
        )
    }
}

export default CategoriesList;