import ReactDatatable from "@ashvin27/react-datatable";
import API from 'src/utils/api';
import Select from 'react-select';

const InvoiceTable = (props) => {
    console.log(props)
    const {products, invoiceProducts} = props.defaultValues.invoiceDetails;
    const columns = [
        {
            key: "id",
            text: "#",
            className: "id",
            align: "center",
            sortable: true,
            width: 40,
        },
        {
            key: "category",
            text: "Category",
            className: "category",
            align: "center",
            sortable: true,
            width: 50,
        },
        {
            key: "name",
            text: "Name",
            className: "name",
            align: "center",
            sortable: true,
            width: 200,
            cell: (record) => {
                return <Select
                    options={products.map(product => {
                        return {
                            value: product.name,
                            label: product.name,
                            target: {
                                id: record.id,
                                name: "name",
                                value: product.name,
                                productId: product.id,
                            }
                        }
                    })}
                    onChange={(e) => props.handleProductChange(e)}
                    name="products"
                    id="products"
                    value={
                        {
                            value: record.name,
                            label: record.name,
                            target: {
                                id: record.productId,
                                value: record.name
                            }
                        }
                    }
                />
            }
        },
        {
            key: "price",
            text: "@",
            className: "price",
            align: "center",
            sortable: true,
            width: 80,
        },
    ]
    const config = {
        page_size: 5,
        show_pagination: true,
        pagination: 'advance',
        length_menu: [5, 10, 20],
        button: {
            excel: true,
            print: true,
            csv: true,
            filename: "download",
        },
    };
    return (
        <ReactDatatable
            config={config}
            columns={columns}
            records={invoiceProducts}
            extraButtons={[]}
        />
    )
}

export default InvoiceTable