/* This controller has general queries */

const { validationResult } = require('express-validator');

const defaultController = {};

defaultController.Index = (req, res, table) => {
	req.getConnection((err, conn) => {
		if (err) {
			res.status(400).json(err);
		} else {
			conn.query(`SELECT * FROM ${table}`, (err, data) => {
				if (err) {
					res.status(400).json(err);
					return
				} 
				res.json(data);
			});
		}
	});
};

defaultController.Store = (req, res, table) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
	}
	const data = req.body;
	req.getConnection((err, conn) => {
		if (err) {
			res.status(400).json(err);
		} else {
			conn.query(`INSERT INTO ${table} SET ?`, [data], (err, rows) => {
				if (err) {
					res.status(400).json(err);
				} else {
					res.status(202).json({
						msg: 'saved',
						table: `${table}`,
						data: data,
					});
				}
			});
		}
	});
};

defaultController.Update = (req, res, table) => {
	const { id } = req.params;
	const data = req.body;
	req.getConnection((err, conn) => {
		if (err) {
			res.status(400).json(err);
		} else {
			conn.query(
				`UPDATE ${table} SET ? WHERE id = ?`,
				[data, id],
				(err, rows) => {
					if (err) {
						res.status(400).json(err);
					} else if (rows.affectedRows == 0) {
						res.status(200).json({
							msg: 'Record not found',
							query: `UPDATE ${table} SET ${Object.keys(
								data
							)} WHERE id = ${id}`,
						});
					} else {
						res.status(202).json({
							msg: 'updated',
							table: `${table}`,
							id: id,
							data: data,
						});
					}
				}
			);
		}
	});
};

defaultController.Destroy = (req, res, table) => {
	const { id } = req.params;
	req.getConnection((err, conn) => {
		if (err) {
			res.status(400).json(err);
		} else {
			conn.query(
				`DELETE FROM ${table} WHERE id = ?`,
				[id],
				(err, rows) => {
					if (err) {
						res.status(400).json(err);
					} else if (rows.affectedRows == 0) {
						res.status(200).json({
							msg: 'Record not found',
							query: `DELETE FROM ${table} WHERE id = ${id}`,
						});
					} else {
						res.status(202).json({
							msg: 'destroy',
							table: `${table}`,
							id: id,
						});
					}
				}
			);
		}
	});
};

module.exports = defaultController;
