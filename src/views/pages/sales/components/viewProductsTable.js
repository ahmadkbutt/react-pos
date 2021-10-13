import ReactDatatable from "@ashvin27/react-datatable";

const ViewProductsTable = (props) => {
    const { products } = props;
    const config = {
        show_pagination: false,
        show_filter: false,
        show_length_menu: false,
        show_info: false,
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
            width: 210
        },
        {
            key: "price",
            text: "Price",
            sortable: true,
            width: 100,
        },
        {
            key: "quantity",
            text: "Quantity",
            sortable: true,
            width: 80,
        },
        {
            key: "amount",
            text: "Amount",
            sortable: true,
            width: 80,
        },
        {
            key: "salesTax",
            text: "Sales Tax",
            sortable: true,
            width: 100,
        },
        {
            key: "amountIncSalesTax",
            text: "Amt Inc S.T",
            sortable: true,
            width: 105,
        },
    ]
    return <ReactDatatable
        config={config}
        records={products}
        columns={columns}
        extraButtons={[]}
    />
}

export default ViewProductsTable;