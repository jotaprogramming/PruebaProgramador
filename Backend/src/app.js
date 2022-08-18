// Modules
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const methodOverride = require('method-override');
const cors = require('cors');

// Import routes
const indexRoutes = require('./routes/indexRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const ivaRoutes = require('./routes/ivaRoutes.js');
const suppliedRoutes = require('./routes/suppliedRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
/* A middleware that allows us to connect to the database. */
app.use(
	myConnection(
		mysql,
		{
			host: 'localhost',
			user: 'root',
			password: '',
			port: '3306',
			database: 'healthcare',
		},
		'single'
	)
);
/* This is a middleware that parses the body of the HTTP request. */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
/* A middleware that allows us to use the HTTP verbs PUT and DELETE. */
app.use(methodOverride('_method'));
/* A middleware that allows us to make requests from a different domain. */
app.use(cors());

// Routes
app.use('/', indexRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/iva', ivaRoutes);
app.use('/api/v1/supplied', suppliedRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/cart', cartRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Export
module.exports = app;
