import { Fragment } from 'react';
import { Input, Button } from 'reactstrap';
import ProductSelect from './productSelect';
import ReactDatatable from "@ashvin27/react-datatable";

const InvoiceTable = (props) => {
    const { productData, addRow, deleteRow } = props;
    const config = {
        page_size: 100000,
        show_pagination: false,
        show_filter: false,
        show_info: false,
        show_length_menu: false
    };

    const columns = [
        {
            key: "id",
            text: "#",
            sortable: true,
            width: 10
        },
        {
            key: "category",
            text: "Category",
            sortable: true,
            width: 50
        },
        {
            key: "name",
            text: "Name",
            cell: (record) => {
                return <ProductSelect {...props} record={record} />
            }
        },
        {
            key: "price",
            text: "Price",
            sortable: true,
            width: 100,
            cell: (record) => {
                return <Input id={JSON.stringify(record)} type='number' name="price" value={record.price}
                    onChange={props.handlePropertyChange}
                />
            }
        },
        {
            key: "quantity",
            text: "Quantity",
            sortable: true,
            width: 100,
            cell: (record) => {
                return <Input id={JSON.stringify(record)} name="quantity" type='number' defaultValue={record.quantity}
                    onChange={props.handlePropertyChange}
                />
            }
        },
        {
            key: "amount",
            text: "Amount",
            sortable: true,
            width: 80,
            cell: (record) => {
                return <span>{record.amount}</span>
            }
        },
        {
            key: "salesTax",
            text: "Sales Tax",
            sortable: true,
            width: 100,
            cell: (record) => {
                return <span>{record.salesTax}</span>
            }
        },
        {
            key: "amountIncSalesTax",
            text: "Amt Inc S.T",
            sortable: true,
            width: 105,
            cell: (record) => {
                return <span>{record.amountIncSalesTax}</span>
            }
        },
        {
            key: "action",
            text: "Action",
            className: "action",
            width: 100,
            align: "center",
            sortable: false,
            cell: (record) => {
                return (
                    <Fragment>
                        <Button
                            color="success"
                            size="sm"
                            onClick={() => addRow(record)}
                            style={{ marginRight: "5px" }}
                        >
                            <i className="fa fa-plus"></i>
                        </Button>
                        <Button
                            color="danger"
                            size="sm"
                            onClick={() => deleteRow(record)}
                        >
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                );
            },
        }
    ]

    return (
        <ReactDatatable
            config={config}
            columns={columns}
            records={productData}
        />
    )
}

export default InvoiceTable