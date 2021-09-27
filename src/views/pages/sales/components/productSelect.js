import Select from 'react-select'

const ProductSelect = (props) => {
    const {products, record} = props;
    const productsList = products.map(product => {
        const {name, id} = product;
        return {
            label: name,
            value: name,
            productId: id,
            id: record.id
        }
    })
    const defaultValue = {
        label: record.name,
        value: record.name,
        productId: record.productId,
        id: record.id
    }
    return <Select options={productsList} defaultValue={defaultValue} onChange={(e) => props.handleProductSelect(e)}></Select>
}

export default ProductSelect