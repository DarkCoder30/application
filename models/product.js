const { v4: uuidv4 } = require('uuid'),
	fs = require('fs'),
	path = require('path');

class Product {
	constructor(title, price, description, url) {
		this.title = title,
		this.price = price,
		this.description = description,
		this.url = url,
		this.id = uuidv4()
	}
	toJSON() {
		return {
			title: this.title,
			price: this.price,
			description: this.description,
			url: this.url,
			id: this.id
		}
	}
	static async update(product) {
		const products = await Product.getAll()
		const index = products.findIndex(p => p.id === product.id)
		products[index] = product
		return new Promise((resolve, reject) => {
			fs.writeFile(path.join(__dirname, '..', 'data', 'products.json'),
				JSON.stringify(products),
				(err) => {
					if (err) {
						reject(err)
					} else {
						resolve()
					}
				})
		})
	}
	async save(){
	const products = await Product.getAll()
	products.push(this.toJSON())
	return new Promise((resolve, reject) => {
		fs.writeFile(path.join(__dirname, '..', 'data', 'products.json'),
		JSON.stringify(products),
		(err) => {	
			if (err) {
				reject(err)
			} else {
				resolve()
			}
		})
	})

	}
	static getAll() {
		return new Promise((resolve, reject) => {
			fs.readFile(path.join(__dirname, '..', 'data', 'products.json'),
			'utf-8',
			(err, content) => {
				if (err) {
					reject(err)
				} else {
					resolve(JSON.parse(content))
				}
			})
		})
	}
	static async getById(id) {
		const products = await Product.getAll()
		return products.find(p => p.id === id)
	}
}
module.exports = Product