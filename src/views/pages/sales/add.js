import React, { Component } from 'react';
import { toast } from "react-toastify";
import PoForm from './components/poForm';

class AddSale extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    handlePoOpen = () => {
        const { isPoOpen } = this.state;
        this.setState({
            isPoOpen: !isPoOpen
        })
    }

    render() {
        return (
            <>
                <PoForm />
            </>
        )
    }
}

export default AddSale;