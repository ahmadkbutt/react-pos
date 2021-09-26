import { Card, Row, Col, CardBody, Input, Label, CardHeader, FormGroup, Button } from 'reactstrap';
import styles from 'src/common/styles.json';

const BalanceDetails = (props) => {
    const { tax, handleTaxChange, handleSalesTaxToggle, balance, handleBalanceDetailChange, handleSubmit } = props;
    return <Card>
        <CardHeader style={{
            background: styles.invoiceBalanceHeader,
            backgroundBlendMode: 'normal, normal, screen, overlay, normal'
        }}>
            <Row>
                <Col className='form-inline'>
                    <FormGroup>
                        <Input type='checkbox' name="isSalesTaxApplied" defaultChecked={tax.isSalesTaxApplied} onChange={handleSalesTaxToggle} />
                        <Label className='pr-3'>Sales Tax</Label>
                        <Input type='number' name="salesTax" defaultValue={tax.salesTax} onChange={handleTaxChange} disabled={!tax.isSalesTaxApplied} />
                    </FormGroup>
                </Col>
            </Row>
        </CardHeader>
        <CardBody>
            <Row>
                <Col>
                    <Label>Total Amount</Label>
                    <Input disabled value={balance.total} />
                </Col>
                <Col>
                    <Label>Discount</Label>
                    <Input defaultValue={balance.discount} type='number' name="discount" onChange={handleBalanceDetailChange} />
                </Col>
                <Col>
                    <Label>Charity</Label>
                    <Input defaultValue={balance.charity} />
                </Col>
                <Col>
                    <Label>Total Balance</Label>
                    <Input disabled value={balance.totalBalance} />
                </Col>
            </Row>
            <Row>
                <Col className='text-center pt-4'>
                    <Button color='primary' onClick={handleSubmit}>Save</Button>
                </Col>
            </Row>
        </CardBody>
    </Card>
}

export default BalanceDetails