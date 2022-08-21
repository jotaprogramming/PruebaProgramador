const moment = require('moment');

// Import controllers
const defaultController = require('./defaultController.js');
const orderController = require('./orderController.js');

const controller = {};
const table = 'shopping_cart';

// Display a listing of the resource.
controller.index = (req, res) => {
	defaultController.Index(req, res, table);
};
// Verify that there is an active order, and if there is not, create it.
controller.status = (req, res) => {
	const data = req.body;
	req.getConnection((err, conn) => {
		if (err) {
			res.status(400).json(err);
			return;
		}
		conn.query(
			`SELECT id FROM product_order WHERE status = 1`,
			(err, rows) => {
				if (err) {
					res.status(400).json(err);
					return;
				}
				if (rows.length) {
					let body = Object.assign(data, {
						id_order: rows[0].id,
					});
					controller.VerifyQuantityStock(req, res, data);
				} else {
					const orderCreate = orderController.create(req, res, {
						date: new Date(),
						status: true,
					});
					if (orderCreate) {
						controller.status(req, res);
					}
				}
			}
		);
	});
};
controller.VerifyQuantityStock = (req, res, data) => {
	req.getConnection((err, conn) => {
		if (err) {
			res.status(400).json(err);
			return;
		}
		conn.query(
			`SELECT stock FROM product WHERE id = ${data.id_product}`,
			(err, rows) => {
				if (err) {
					res.status(400).json(err);
					return;
				}
				const stock = parseInt(rows[0].stock);
				const quantity = parseInt(data.quantity);
				if (quantity <= stock) {
					controller.store(req, res, data);
				} else {
					res.status(400).json({
						error: 'Quantity exceeds product stock',
					});
				}
			}
		);
	});
};
// Store a newly created resource in storage.
controller.store = (req, res, data) => {
	req.getConnection((err, conn) => {
		if (err) {
			res.status(400).json(err);
			return;
		}
		conn.query(`INSERT INTO ${table} SET ?`, [data], (err, rows) => {
			if (err) {
				res.status(400).json(err);
				return;
			}
			res.status(202).json({
				msg: 'saved',
				table: `${table}`,
				data: data,
			});
		});
	});
};
// Display the specified resource.
controller.show = (req, res) => {
	const { status } = req.params;
	req.getConnection((err, conn) => {
		if (err) {
			res.status(400).json(err);
		} else {
			conn.query(
				`SELECT sc.id_product, sc.id_order, SUM(sc.quantity) AS quantity, p.summary, p.image_path, p.price, po.date, po.status
				FROM shopping_cart AS sc
				JOIN product AS p ON p.id = sc.id_product
				JOIN product_order AS po ON po.id = sc.id_order
				WHERE status = ${status}
				GROUP BY id_product`,
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
// Update the specified resource in storage.
controller.update = (req, res) => {
	defaultController.Update(req, res, table);
};
// Remove the specified resource from storage.
controller.destroy = (req, res) => {
	defaultController.Destroy(req, res, table);
};

module.exports = controller;
