const defaultController = require('./defaultController.js');

const controller = {};
const table = 'product';

// Display a listing of the resource.
controller.index = (req, res) => {
	req.getConnection((err, conn) => {
		if (err) {
			res.status(400).json(err);
		} else {
			conn.query(`SELECT t.*, s.description AS supplied FROM ${table} AS t JOIN supplied AS s ON s.id = t.id_supplied`, (err, data) => {
				if (err) {
					res.status(400).json(err);
					return
				} 
				res.json(data);
			});
		}
	});
};
// Display the specified resource.
controller.show = (req, res) => {
	const { id } = req.params;
	req.getConnection((err, conn) => {
		if (err) {
			res.status(400).json(err);
		} else {
			conn.query(
				`SELECT * FROM ${table} WHERE id = ?`,
				[id],
				(err, data) => {
					if (err) {
						res.status(400).json(err);
						return;
					}
					res.json(data);
				}
			);
		}
	});
};
// Store a newly created resource in storage.
controller.store = (req, res) => {
	defaultController.Store(req, res, table);
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
