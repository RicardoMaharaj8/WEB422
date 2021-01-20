import React from "react";
import {Table, Pagination} from "react-bootstrap";
import {withRouter} from "react-router-dom";

class Sales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            currentPage: 1,
        };
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    getData(page) {
        return new Promise((resolve, reject) => {
            fetch(
                `${process.env.API}/api/sales?page=${page}&perPage=10`
            )
                .then((res) => res.json())
                .then((data) => resolve(data));
        });
    }

    componentDidMount() {
        this.getData(this.state.currentPage).then((value) => {
            this.setState({sales: value});
        });
    }

    previousPage() {
        if (this.state.currentPage > 1) {
            this.getData(this.state.currentPage - 1).then((value) => {
                this.setState((state, props) => {
                    return {sales: value, currentPage: state.currentPage - 1};
                });
            });
        }
    }

    nextPage() {
        this.getData(this.state.currentPage + 1).then((value) => {
            this.setState((state, props) => {
                return {sales: value, currentPage: state.currentPage + 1};
            });
        });
    }

    render() {
        if (this.state.sales.length > 0) {
            return (
                <div>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Store Location</th>
                            <th>Number of Items</th>
                            <th>Sale Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.sales.map((value) => (
                            <tr
                                key={value._id}
                                onClick={() => {
                                    this.props.history.push(`/Sale/${value._id}`);
                                }}
                            >
                                <td>{value.customer.email}</td>
                                <td>{value.storeLocation}</td>
                                <td>{value.items.length}</td>
                                <td>{new Date(value.saleDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.Prev onClick={this.previousPage}/>
                        <Pagination.Item> {this.state.currentPage} </Pagination.Item>
                        <Pagination.Next onClick={this.nextPage}/>
                    </Pagination>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default withRouter(Sales);
