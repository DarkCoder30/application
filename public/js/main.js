const toCurrency = price => {
	return new Intl.NumberFormat('ru-RU', {
		currency: 'rub',
		style: 'currency'
	}).format(price)
}

document.querySelectorAll('.price').forEach(node => {
	node.textContent = toCurrency(node.textContent)
})

const card = document.querySelector('#card')
if (card) {
	card.addEventListener('click', event => {
		if (event.target.classList.contains('js-remove')) {
			const id = event.target.dataset.id
			console.log(id);
			fetch('/card/remove/' + id, {
					method: 'delete'
				}).then(res => res.json())
				.then(card => {
					if (card.products.length) {
						const html = card.products.map(p => {
							return `
				<tr>
					<th scope="row">${p.title}}</th>
					<td>${p.count}</td>
					<td>
						<button class="btn btn-danger js-remove" data-id="${p.id}">Удалить</button>
					</td>
						`
						}).join('')
						document.querySelector('tbody').innerHTML = html
						document.querySelector('.price').textContent = toCurrency(card.price)
					} else {
						document.querySelector('#card').innerHTML = '<p class="lead"><span class="text-danger">Корзина пуста.</span></p>'
					}
				})
		}

	})
}