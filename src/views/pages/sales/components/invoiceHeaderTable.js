import { Col, Row, Table } from "reactstrap"

const InvoiceHeaderTable = (props) => {
    return (
        <>
            <Row>
                <Col className='border p-2 text-center' tag='h4' style={{ backgroundColor: 'slategray', color: 'white' }}>
                    <div tag='h3'><strong>SALE INVOICE</strong></div>
                </Col>
            </Row>
            <Table bordered responsive>
                <tbody>
                    <tr>
                        <td>
                            P.O# <strong>{props.poNumber}</strong>
                        </td>
                        <td>PAYMENT TERM <strong>CREDIT/ ONE MONTH</strong></td>
                        <td>Delivery Date</td>
                        <td><strong>{props.deliveryDate}</strong></td>
                    </tr>
                    <tr>
                        <td>Company Name</td>
                        <td><strong>{props.customer}</strong></td>
                        <td>INV.AMOUNT</td>
                        <td><strong>{props.total}</strong></td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default InvoiceHeaderTable