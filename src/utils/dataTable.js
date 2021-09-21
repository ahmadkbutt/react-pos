import ReactDatatable from "@ashvin27/react-datatable";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Button, CardHeader, Row, Col } from "reactstrap";
import { capitalizeFirstLetter, trimFirstCharacter } from "src/helper/helper";
import API from "./api";
import { toast } from "react-toastify";

const DataTable = ({ columns, records, isLoading, endpoint, callback }) => {
    const history = useHistory();
    const pageName = capitalizeFirstLetter(trimFirstCharacter(history.location.pathname));
    const config = {
        page_size: 5,
        length_menu: [5, 10, 20],
        button: {
            excel: true,
            print: true,
            csv: true,
            filename: "download",
        },
    };
    const configuredColums = columns.map(column => {
        column.className = column.text;
        column.align = 'center';
        column.sortable = true;
        return column
    });
    const redirectToAdd = () => {
        const { pathname } = history.location;
        history.push(`${pathname}/add`);
    }
    const editRecord = (record) => {
        const { id } = record;
        const pageName = trimFirstCharacter(history.location.pathname);
        localStorage.setItem('record', JSON.stringify(record));
        history.push({
            pathname: `${pageName}/${id}/edit`,
        })
    }
    const deleteRecord = async (record) => {
        const api = new API(endpoint);
        const { id } = record;
        const isDeleted = await api.delete(id);
        if (isDeleted) {
            toast.success("Row Deleted Successfully");
            callback()
        }
    }
    const columnsWithActions = [...configuredColums, {
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
                        color="info"
                        size="sm"
                        onClick={() => editRecord(record)}
                        style={{ marginRight: "5px" }}
                    >
                        <i className="fa fa-edit"></i>
                    </Button>
                    <Button
                        color="danger"
                        size="sm"
                        onClick={() => deleteRecord(record)}
                    >
                        <i className="fa fa-trash"></i>
                    </Button>
                </Fragment>
            );
        },
    }];
    return (
        <Card>
            <CardHeader>
                <Row>
                    <Col tag="span" className='form-inline'>{pageName}</Col>
                    <Col className="text-right">
                        <Button color="success" onClick={redirectToAdd}>
                            Add {pageName}
                        </Button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <ReactDatatable
                    config={config}
                    records={records}
                    columns={columnsWithActions}
                    extraButtons={[]}
                    loading={isLoading}
                />
            </CardBody>
        </Card>
    );
}

export default DataTable