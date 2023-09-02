const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({ extended: true }));

require("./server/config/mongoose.config");
require("./server/routes/inventory.routes")(app);
require("./server/routes/list_product.routes")(app);
require("./server/routes/list.routes")(app);
require("./server/routes/product.routes")(app);
require("./server/routes/user.routes")(app);

app.listen(8080, () => {
  console.log("The server is all fired up on port 8080")
});