import React from "react";
import {ListGroup, ListGroupItem, Table} from "react-bootstrap";

class Sale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sale: {},
            loading: true,
        };
    }

    componentDidMount() {
        fetch(
            `${process.env.API}/api/sales/${this.props.id}`
        )
            .then((res) => res.json())
            .then((value) => {
                if (value._id) {
                    this.props.viewedSale(value._id);
                }
                this.setState({sale: value});
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.setState({loading: true});
        }
        fetch(
            `${process.env.API}/api/sales/${this.props.id}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data._id) {
                    this.props.viewedSale(data._id);
                }
                this.setState({sale: data, loading: false});
            });
    }

    itemsTotal(value) {
        let total = 0.0;
        value.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    }

    render() {
        if (this.state.loading) {
            return null; // NOTE: This can be changed to render a <Loading /> Component for a better user experience
        } else {
            if (this.state.sale._id) {
                return (
                    <div>
                        <h1>Sale: {this.state.sale._id}</h1>
                        <h2>Customer</h2>
                        <ListGroup>
                            <ListGroupItem>
                                <strong>email:</strong> {this.state.sale.customer.email}{" "}
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>age:</strong> {this.state.sale.customer.age}{" "}
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>satisfaction:</strong>{" "}
                                {this.state.sale.customer.satisfaction} / 5
                            </ListGroupItem>
                        </ListGroup>
                        <h2>
                            {" "}
                            Items: ${this.itemsTotal(this.state.sale.items).toFixed(2)}
                        </h2>
                        <Table>
                            <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.sale.items.map((value, index) => (
                                <tr key={index}>
                                    <td>{value.name}</td>
                                    <td>{value.quantity}</td>
                                    <td>${value.price}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                );
            } else {
                return (
                    <div>
                        <h1>Unable to find Sale</h1>
                        <p>id: {this.props.id}</p>
                    </div>
                );
            }
        }
    }
}

export default Sale;
