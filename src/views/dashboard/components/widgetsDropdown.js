import React from 'react'
import {
    CWidgetDropdown,
    CRow,
    CCol,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
    CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from './chartLineSimple'
import ChartBarSimple from './chartBarSimple'

const WidgetsDropdown = (props) => {
    const { categories, products, customers, orders } = props
    return (
        <>
            <CRow>
                <CCol sm="6" >
                    <CWidgetDropdown
                        color="gradient-primary"
                        header={categories}
                        text="Categories"
                        footerSlot={
                            <CLink to='/categories'>
                                <ChartLineSimple
                                    pointed
                                    className="c-chart-wrapper mt-3 mx-3"
                                    style={{ height: '70px' }}
                                    dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                                    pointHoverBackgroundColor="primary"
                                    label="Members"
                                    labels="months"
                                />
                            </CLink>
                        }
                    >
                    </CWidgetDropdown>
                </CCol>

                <CCol sm="6">
                    <CWidgetDropdown
                        color="gradient-info"
                        header={products}
                        text="Products"
                        footerSlot={
                            <CLink to='/products'>
                                <ChartLineSimple
                                    pointed
                                    className="mt-3 mx-3"
                                    style={{ height: '70px' }}
                                    dataPoints={[1, 18, 9, 17, 34, 22, 11]}
                                    pointHoverBackgroundColor="info"
                                    options={{ elements: { line: { tension: 0.00001 } } }}
                                    label="Members"
                                    labels="months"
                                />
                            </CLink>
                        }
                    >
                    </CWidgetDropdown>
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="6">
                    <CWidgetDropdown
                        color="gradient-warning"
                        header={customers}
                        text="Customers"
                        footerSlot={
                            <CLink to='/customers'>
                                <ChartLineSimple
                                    className="mt-3"
                                    style={{ height: '70px' }}
                                    backgroundColor="rgba(255,255,255,.2)"
                                    dataPoints={[78, 81, 80, 45, 34, 12, 40]}
                                    options={{ elements: { line: { borderWidth: 2.5 } } }}
                                    pointHoverBackgroundColor="warning"
                                    label="Members"
                                    labels="months"
                                /></CLink>
                        }
                    >
                    </CWidgetDropdown>
                </CCol>

                <CCol sm="6">
                    <CWidgetDropdown
                        color="gradient-danger"
                        header={orders}
                        text="Orders"
                        footerSlot={
                            <ChartBarSimple
                                className="mt-3 mx-3"
                                style={{ height: '70px' }}
                                backgroundColor="rgb(250, 152, 152)"
                                label="Members"
                                labels="months"
                            />
                        }
                    >
                    </CWidgetDropdown>
                </CCol>
            </CRow>
        </>
    )
}

export default WidgetsDropdown
