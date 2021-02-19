//!	EXSPORDS MODULES
const express = require('express'),
	app = express(),
	path = require('path'),
	PORT = process.env.PORT || 3000,
	exphbs = require('express-handlebars'),
//TODO	EXSPORDS ROUTERS 
	homeRouter = require('./routes/home')
	addRouter = require('./routes/add')
	productsRouter = require('./routes/products')
	aboutRouter = require('./routes/about')
	contactsRouter = require('./routes/contacts')
	cardRouter = require('./routes/card')
//TODO	EXSPORDS ROUTERS END
//!	EXSPORDS MODULES END

//TODO	EXSPORDS HBS ENGINE
const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs'
})
//TODO	EXSPORDS HBS ENGINE END

//?	SET HBS ENGINE
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
//?	SET HBS ENGINE END

//?	USE STATIC DIRECTORY PUBLIC
app.use(express.static(path.join(__dirname, 'public')))
//?	USE STATIC DIRECTORY PUBLIC END

//TODO	MIDLLEWARE (прием данных)
app.use(express.urlencoded({
	extended: true
}))
//TODO	MIDLLEWARE (прием данных) END


//? 	 ROUTES GET and title layout
app.use('/', homeRouter)
app.use('/add', addRouter)
app.use('/products', productsRouter)
app.use('/about', aboutRouter)
app.use('/contacts', contactsRouter)
app.use('/card', cardRouter)
//?	ROUTES GET END

//TODO	START SERVER
app.listen(PORT, () => {
	console.log(`Server is working on ${PORT}...`);
})
//TODO	START SERVER END