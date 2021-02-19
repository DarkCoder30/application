const {Router} = require('express')
const router = Router()
const Product = require('../models/product')

router.get('/', async (req, res) => {
	const products = await Product.getAll()
	res.render('products', {
		title: 'Наши товары',
		isProducts: true,
		products
	})
})
router.get('/:id', async (req, res) => {
	const product = await Product.getById(req.params.id)
	res.render('product', {
		layout: 'empty',
		title: `${product.title}`,
		product
	})
})
router.get('/:id/edit', async (req, res) => {
	if (!req.query.allow) {
		return res.redirect('/')
	}
	const product = await Product.getById(req.params.id)
	
	res.render('product-edit', {
		title: 'Редактирование товара',
		product
	})
})
router.post('/edit', async (req, res) => {
	await Product.update(req.body)
	res.redirect('/products')
})

module.exports = router