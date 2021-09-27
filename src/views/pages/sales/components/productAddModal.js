import {Modal, Button} from 'reactstrap';
import AddProduct from '../../products/add';

const ProductAddModal = (props) => {
    return (
        <Modal isOpen={props.isModalOpen} size='lg' centered={true}>
            <AddProduct toggleModal={props.toggleModal} callback={props.callback}/>
            <Button outline color='danger' onClick={props.toggleModal}><i class='fa fa-close'></i></Button>
        </Modal>
    )
}

export default ProductAddModal;