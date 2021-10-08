import {Modal, Button} from 'reactstrap';
import AddCustomer from '../../customers/add';

const CustomerAddModal = (props) => {
    return (
        <Modal isOpen={props.isModalOpen} size='lg' centered={true}>
            <AddCustomer toggleModal={props.toggleModal} callback={props.callback}/>
            <Button outline color='danger' onClick={props.toggleModal}><i className='fa fa-close'></i></Button>
        </Modal>
    )
}

export default CustomerAddModal;