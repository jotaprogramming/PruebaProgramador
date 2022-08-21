const defaultController = require('./defaultController.js');

const controller = {};
const table = 'iva';

// Display a listing of the resource.
controller.index = (req, res) => {
	defaultController.Index(req, res, table);
};
// Update the specified resource in storage.
controller.update = (req, res) => {
	defaultController.Update(req, res, table);
};
module.exports = controller;
