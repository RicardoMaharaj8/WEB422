//  starting variables and intalization
let saleData = [];
let page = 1;
let perPage = 10;

// lodash template for inital table
let saleTableTemplate = _.template(
    `
    <% _.forEach(sales, (sale) => { %>
        <tr data-id=<%- sale._id %>>
            <td><%- sale.customer.email %></td>
            <td><%- sale.storeLocation %></td>
            <td><%- sale.items.length %></td>
            <td><%- moment.utc(sale.saleDate).local().format('LLLL') %></td>
        </tr>
    <% }) %>
    `
);

// lodash template for modals
let saleModalBodyTemplate = _.template(
    `
    <h4>Customer</h4>
    <strong>Email:</strong> <%- sale.customer.email %> <br>
    <strong>Ege:</strong> <%- sale.customer.age %> <br>
    <strong>Satisfaction:</strong> <%- sale.customer.satisfaction %> / 5 <br>
    <br>
    <h4>Items: $<%- sale.total.toFixed(2) %> </h4>
    <table class="table">
        <thead>
            <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            <% _.forEach(sale.items, (item) => { %>
                <tr>
                    <td><%- item.name %></td>
                    <td><%- item.quantity %></td>
                    <td>$<%- item.price %></td>
                </tr>
            <% }) %>
        </tbody>
    </table>
    `
);

// fetch MonogoDB data from assignment one api on heroku
let loadSaleData = function () {
    fetch(
        `${process.env.API}/api/sales?page=${page}&perPage=${perPage}`
    )
        .then((res) => res.json())
        .then((data) => {
            saleData = data;
            $("#sale-table tbody").html(saleTableTemplate({sales: data}));
            $("#current-page").html(page);
        });
};

// when document is loaded
$(function () {
    // load data from MongoDB + inject into table
    loadSaleData();
    // add modal functionality to table rows on click
    $("#sale-table tbody").on("click", "tr", function (e) {
        // get current html element #data-id value
        let id = $(this).attr("data-id");
        // get the matching sale based on the elements #data-id
        let selectedSale = _.find(saleData, (sale) => sale._id == id);
        // create a total property in the selected sale object and initalize it
        selectedSale.total = 0;
        // add up the total for every item
        selectedSale.items.forEach((item) => {
            selectedSale.total += item.price * item.quantity;
        });
        // insert the sale id into the modal title
        $("#sale-modal .modal-title").html(`Sale: ${selectedSale._id}`);
        // load the modal with the template function
        $("#sale-modal .modal-body").html(
            saleModalBodyTemplate({sale: selectedSale})
        );
        // set modal properties
        $("#sale-modal").modal({backdrop: "static", keyboard: false});
    });

    // page number decrement until 1
    $(".pagination").on("click", "#previous-page", function (e) {
        if (page > 1) {
            page--;
            loadSaleData();
        }
    });

    // page number increment
    $(".pagination").on("click", "#next-page", function (e) {
        page++;
        loadSaleData();
    });
});
