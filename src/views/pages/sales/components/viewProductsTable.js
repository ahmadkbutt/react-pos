import { Table } from "reactstrap";

const ViewProductsTable = (props) => {
    const { products } = props;
    let totalQuantity = 0;
    let totalSalesTax = 0.00;
    let totalAmount = 0.00;
    let totalAmountIncSalesTax = 0.00;
    products.forEach(product => {
        totalQuantity = product.quantity + totalQuantity;
        totalSalesTax = parseFloat(parseFloat(product.salesTax) + parseFloat(totalSalesTax)).toFixed(2);
        totalAmount = parseFloat(parseFloat(product.amount) + parseFloat(totalAmount)).toFixed(2);
        totalAmountIncSalesTax = parseFloat(parseFloat(product.amountIncSalesTax) + parseFloat(totalAmountIncSalesTax)).toFixed(2);
    })
    const productRows = products.map((product, i) => {
        return (
            <tr key={i}>
                <th scope="row">{product.id}</th>
                <td>{product.category}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.salesTax}</td>
                <td>{product.amount}</td>
                <td>{product.amountIncSalesTax}</td>
            </tr>
        )
    })
    return (
        <Table size="sm" bordered responsive>
            <thead>
                <tr>
                    <th>S#</th>
                    <th>Item Type</th>
                    <th>Item Name</th>
                    <th>Qty</th>
                    <th>@</th>
                    <th>S.Tax</th>
                    <th>Amount</th>
                    <th>Amount Inc.</th>
                </tr>
            </thead>
            <tbody>
                {productRows}
                <tr>
                <th scope="row"></th>
                <td></td>
                <td><strong>TOTAL</strong></td>
                <td><strong>{totalQuantity}</strong></td>
                <td></td>
                <td><strong>{totalSalesTax}</strong></td>
                <td><strong>{totalAmount}</strong></td>
                <td><strong>{totalAmountIncSalesTax}</strong></td>
            </tr>
            </tbody>
        </Table>
    )
}

export default ViewProductsTable;