const defaultController = require('./defaultController.js');

const controller = {};
const table = 'supplied';

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
	defaultController.Store(req, res, table);
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
	defaultController.Destroy(req, res, table);
};

module.exports = controller;
