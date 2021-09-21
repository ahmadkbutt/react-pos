import React, { Component, Fragment } from 'react';
import API from 'src/utils/api';
import DataTable from 'src/utils/dataTable';

class CustomersList extends Component {
    constructor(props) {
        super(props);
        this.api = new API("customers");
        this.state = {
            customers: [],
            isLoading: true
        }
    }

    componentDidMount = () => {
        this.getCustomers();
    }

    getCustomers = async () => {
        const customers = await this.api.get();
        this.setState({
            customers,
            isLoading: false
        });
    }

    render() {
        const { customers, isLoading } = this.state;
        const columns = [
            {
                key: "id",
                text: "#",
            },
            {
                key: "first_name",
                text: "First Name",

            },
            {
                key: "last_name",
                text: "Last Name",

            },
            {
                key: "email",
                text: "Email",

            },
            {
                key: "phone",
                text: "Phone No.",

                cell: record => {
                    return <Fragment>
                        {record.billing.phone}
                    </Fragment>
                }
            },
        ];

        return (
            <DataTable columns={columns} isLoading={isLoading} records={customers}
                endpoint={"customers"} callback={this.getCustomers} />
        )
    }
}

export default CustomersList;