import React, { Component } from "react";
import { Badge } from "reactstrap";
import DataTable from "src/utils/dataTable";
import API from "src/utils/api";
class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.api = new API("products");
        this.state = {
            products: [],
            isLoading: true,
        };
    }

    componentDidMount = () => {
        this.getProducts();
    };

    getProducts = async () => {
        const products = await this.api.get();
        this.setState({
            products,
            isLoading: false
        });
    }

    render() {
        const { products, isLoading } = this.state;
        const columns = [
            {
                key: "id",
                text: "#",
            },
            {
                key: "name",
                text: "Name",
            },
            {
                key: "price",
                text: "Price",
            },
            {
                key: "categories",
                text: "category",
                cell: (record) => {
                    const { categories } = record;
                    const categoriesBadges = categories.map((category, i) => {
                        return (
                            <h5 key={i}>
                                <Badge color="info" pill>{category.name}</Badge>
                            </h5>
                        );
                    });
                    return <div>{categoriesBadges}</div>;
                },
            },
        ];

        return (
            <DataTable columns={columns} isLoading={isLoading} records={products}
                endpoint={"products"} callback={this.getProducts} />
        );
    }
}

export default ProductsList;
