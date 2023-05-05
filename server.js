const express = require('express');
const dotenv = require('dotenv');
const {connect} = require('./src/utils/database');

const alergiasRoutes = require('./src/api/routes/alergias.routes');
const userRoutes = require('./src/api/routes/user.routes');
const productoRoutes = require ('./src/api/routes/productos.routes');

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
connect();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', alergiasRoutes);
app.use('/user', userRoutes);
app.use('/productos', productoRoutes)

app.listen(PORT, () => console.log(`listening on: http://localhost:${PORT}`));
