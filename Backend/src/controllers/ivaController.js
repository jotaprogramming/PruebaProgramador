const defaultController = require('./defaultController.js');

const controller = {};
const table = 'iva';

// Display a listing of the resource.
controller.index = (req, res) => {
	defaultController.Index(req, res, table);
};
// Show the form for creating a new resource.
controller.create = (req, res) => {
	//
};
// Store a newly created resource in storage.
controller.store = (req, res) => {
	//
};
// Display the specified resource.
controller.show = (req, res) => {
	//
};
// Show the form for editing the specified resource.
controller.edit = (req, res) => {
	//
};
// Update the specified resource in storage.
controller.update = (req, res) => {
	defaultController.Update(req, res, table);
};
// Remove the specified resource from storage.
controller.destroy = (req, res) => {
	//
};

module.exports = controller;
