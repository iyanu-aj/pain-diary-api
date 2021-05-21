require("dotenv").config();
const app = require("./app");
const sequelize = require("./connection/db");
const PORT = process.env.PORT || 3000;

app.listen(`${PORT}`, async () => {
    console.log(`Server started, listening on PORT ${PORT}`);
    await sequelize.authenticate();
    
});
