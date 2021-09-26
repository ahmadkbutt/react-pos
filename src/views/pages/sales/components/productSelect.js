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
    return <Select options={productsList} onChange={(e) => props.handleProductSelect(e)}></Select>
}

export default ProductSelect