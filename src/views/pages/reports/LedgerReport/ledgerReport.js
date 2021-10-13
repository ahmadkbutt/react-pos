import React, { Component } from 'react'
import { Card, CardBody} from 'reactstrap';
import API from 'src/utils/api';
import { formatDate } from 'src/helper/helper';
import LedgerForm from './components/ledgerForm';

class LedgerReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            customer: {
                name: 'Enter Customer Name',
                id: 0
            },
            startDate: formatDate(),
            endDate: formatDate()
        }
    }

    componentDidMount() {
        this.getCustomers();
    }

    getCustomers = async () => {
        const api = new API("customers");
        const customers = await api.get();
        this.setState({
            customers
        })
    }

    handleChange = (e) => {
        const {value, name} = e.target;
        this.setState({
            [name]: value
        }, () => {
            
        })
    }

    render() {
        return <>
            <Card>
                <CardBody>
                    <LedgerForm {...this.state} handleChange={this.handleChange}/>
                </CardBody>
            </Card>
        </>
    }
}

export default LedgerReport;