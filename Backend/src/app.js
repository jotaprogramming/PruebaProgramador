// Modules
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const methodOverride = require('method-override');
const cors = require('cors');

// Import routes
const productRoutes = require('./routes/productRoutes.js');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
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
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cors());

// Routes
app.use('/', productRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Export
module.exports = app;
