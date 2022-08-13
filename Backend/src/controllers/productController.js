const controller = {};

// Display a listing of the resource.
controller.index = (req, res) => {
	req.getConnection((err, conn) => {
		if (err) {
			res.status(500).json(err);
		}
		conn.query('SELECT * FROM product', (err, products) => {
			if (err) {
				res.status(500).json(err);
			}
			res.json(products);
		});
	});
};
// Show the form for creating a new resource.
controller.create = (req, res) => {
	res.status(202).json({ msg: 'OK' });
};
// Store a newly created resource in storage.
controller.store = (req, res) => {
	res.status(202).json({ msg: 'OK' });
};
// Display the specified resource.
controller.show = (req, res) => {
	res.status(202).json({ msg: 'OK' });
};
// Show the form for editing the specified resource.
controller.edit = (req, res) => {
	res.status(202).json({ msg: 'OK' });
};
// Update the specified resource in storage.
controller.update = (req, res) => {
	res.status(202).json({ msg: 'OK' });
};
// Remove the specified resource from storage.
controller.destroy = (req, res) => {
	res.status(202).json({ msg: 'OK' });
};

module.exports = controller;
