import ReactDatatable from "@ashvin27/react-datatable";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Button, CardHeader, Row, Col, CardTitle, CardFooter, Input } from "reactstrap";
import { capitalizeFirstLetter, trimFirstCharacter } from "src/helper/helper";
import API from "./api";
import { toast } from "react-toastify";
import styles from 'src/common/styles.json';

const DataTable = (props) => {
    const { columns, records, isLoading, endpoint, callback, showFilter } = props;
    const history = useHistory();
    const pageName = capitalizeFirstLetter(trimFirstCharacter(history.location.pathname));
    const config = {
        page_size: 5,
        show_pagination: true,
        pagination: 'advance',
        show_filter: showFilter ? true : false,
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
    const viewRecord = (record) => {
        const { id } = record;
        const pageName = trimFirstCharacter(history.location.pathname);
        localStorage.setItem('record', JSON.stringify(record));
        history.push({
            pathname: `${pageName}/${id}/view`,
        })
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
    const customFilter = !showFilter ?
        <CardFooter>
            <Row >
                <Col sm={{ size: 3, offset: 9 }}>
                    <Input type='text' onChange={props.handleCustomFilter} />
                </Col>
            </Row>
        </CardFooter> :
        <></>

    const columnsWithActions = [...configuredColums, {
        key: "action",
        text: "Action",
        className: "action",
        width: props.view ? 150: 120,
        align: "center",
        sortable: false,
        cell: (record) => {
            const viewBtn = props.view ? <Button
                color="success"
                size="sm"
                onClick={() => viewRecord(record)}
                style={{ marginRight: "5px" }}
            >
                <i className="fa fa-eye"></i>
            </Button> : <></>

            return (
                <Fragment>
                    {viewBtn}
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
            <CardHeader style={{
                background: styles.dataTableHeader,
                color: 'white'
            }}>
                <CardTitle>
                    <Row>
                        <Col tag='h5' className='form-inline'>{pageName}</Col>
                        <Col className="text-right">
                            <Button color="secondary" onClick={redirectToAdd} outline>
                                Add {pageName}
                            </Button>
                        </Col>
                    </Row>
                </CardTitle>
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
            {customFilter}
        </Card>
    );
}

export default DataTable