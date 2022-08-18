const moment = require('moment');
const defaultController = require('./defaultController.js');

const controller = {};
const table = 'shopping_cart';

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
	const data = req.body;
	req.getConnection((err, conn) => {
		if (err) {
			res.status(400).json(err);
		} else {
			conn.query(
				`SELECT DISTINCT po.status, po.date
				FROM product_order AS po
				LEFT JOIN shopping_cart AS sc ON sc.id_order = po.id
				WHERE sc.id_order = ${data.id_order}`,
				(err, rows) => {
					if (rows.length) {
						const DATE = moment(rows[0].date);
						if (rows[0].status == 1) {
							defaultController.Store(req, res, table);
						} else {
							res.status(200).json({
								msg: `It was not possible to continue because the order ended`,
								date: `${DATE.format('YYYY-MM-DD')}`,
							});
						}
					} else {
						conn.query(
							`INSERT INTO product_order SET date = ?, status = ?`,
							[new Date(), 1],
							(err, rows) => {
								if (err) {
									console.log(err);
								} else {
									console.log({
										msg: 'saved',
										table: `${table}`,
										data: data,
									});
								}
							}
						);
						defaultController.Store(req, res, table);
					}
				}
			);
		}
	});
};
// Display the specified resource.
controller.show = (req, res) => {
	const {status} = req.params;
	req.getConnection((err, conn) => {
		if (err) {
			res.status(400).json(err);
		} else {
			conn.query(`SELECT p.id AS product_id, p.image_path, p.price, p.summary, p.id_iva, sc.*, po.date, po.status
			FROM ${table} AS sc
			JOIN product_order AS po ON po.id = sc.id_order
			JOIN product AS p ON p.id = sc.id_product
			WHERE po.status = ${status}`, (err, data) => {
				if (err) {
					res.status(400).json(err);
				} else if (data.length) {
					res.json(data);
				} else {
					res.json({
						msg: 'Table without records',
						table: `${table}`,
					});
				}
			});
		}
	});
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
