const defaultController = require('./defaultController.js');

const controller = {};
const table = 'product_order';

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
	
};
// Show the form for editing the specified resource.
controller.edit = (req, res) => {
	//
};
// Update the specified resource in storage.
controller.update = (req, res) => {
	defaultController.Update(req, res, table);
	if (!req.body.status) {
		const { id } = req.params;
		// console.log(req.body.status);
		req.getConnection((err, conn) => {
			conn.query(
				`SELECT p.id, p.stock, sc.quantity
				FROM product AS p
				JOIN shopping_cart AS sc ON p.id = sc.id_product
				JOIN product_order AS po ON po.id = sc.id_order
				WHERE po.id = ${id} AND po.status = 0 AND p.stock > 0`,
				(err, data) => {
					data.forEach((product) => {
						let newStock =
							parseInt(product.stock) -
							parseInt(product.quantity);
						conn.query(
							`UPDATE product SET stock = ${newStock} WHERE id = ${product.id}`
						);
					});
				}
			);
		});
	}
};
// Remove the specified resource from storage.
controller.destroy = (req, res) => {
	//
};

module.exports = controller;
