module.exports = function(app) {
    const { Auth } = require("../middleware/auth");
    const { Customer } = require("../middleware/customer");

    const CustomerController = require("../controllers/CustomerController");
    

    app.post("/search_services", [Auth, Customer], CustomerController.searchServices);
    app.post("/create appoinment", [Auth, Customer], CustomerController.createAppoinment);
};