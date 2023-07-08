const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
// const morgan = require("morgan");
const config = require("./configs/config.json")
const fileUpload = require("express-fileupload")
require("./helpers/defaultChecker")(); // Checking default things like database tables


const app = express();

app.use(cors({
  origin: "*",
  methods: ['GET', 'POST']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(fileUpload())

// process.env.NODE_ENV == "development" && app.use(morgan("dev"));

const paymentsRoutes = require("./routes/payments")
app.use("/api/payments", paymentsRoutes)

const repairmansRoutes = require("./routes/repairmans")
app.use("/api/repairmans", repairmansRoutes)

const adminsRoutes = require("./routes/admins")
app.use("/api/admins", adminsRoutes)

const ticketsRoutes = require("./routes/tickets")
app.use("/api/tickets", ticketsRoutes)

const informationsRoutes = require("./routes/informations")
app.use("/api/informations", informationsRoutes)

const orderRoutes = require("./routes/order")
app.use("/api/orders", orderRoutes)

const listRoutes = require("./routes/list")
app.use("/api/list", listRoutes)

const routes = require("./routes");
app.use("/api/", routes);

app.listen(config.port || 3000, () => {
  console.log(`Server is running on ${config.port || 3000} mode and port ${config.port || 3000}`);
});
