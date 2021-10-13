import { Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import Select from 'react-select';

const LedgerForm = (props) => {
    const { customers, customer, startDate, endDate, handleChange} = props;
    const customerDefaultName = {
        label: customer.name,
        value: customer.name,
        target: {
            name: "customer",
            value: {
                name: customer.name,
                id: customer.id,
            }
        }
    }
    const customersList = customers ? customers.map(customer => {
        return {
            name: `${customer.first_name} ${customer.last_name}`,
            label: `${customer.first_name} ${customer.last_name}`,
            target: {
                name: "customer",
                value: {
                    name: `${customer.first_name} ${customer.last_name}`,
                    id: customer.id
                }
            }
        }
    }) : [];
    return <>
        <Row>
            <Col>
                <FormGroup>
                    <Label for="customers">Customers</Label>
                    <Select name="customers" options={customersList} value={customerDefaultName}
                        onChange={(e) => handleChange(e)}
                    ></Select>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="deliveryDate">Start Date</Label>
                    <Input
                        type="date"
                        name="startDate"
                        id="startDate"
                        placeholder="Enter Start Date"
                        onChange={(e) => handleChange(e)}
                        defaultValue={startDate}
                    />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="endDate">End Date</Label>
                    <Input
                        type="date"
                        name="endDate"
                        id="endDate"
                        placeholder="Enter End Date"
                        onChange={(e) => handleChange(e)}
                        defaultValue={endDate}
                    />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Button color='primary' size='md' block>Submit</Button>
            </Col>
        </Row>
    </>
}

export default LedgerForm