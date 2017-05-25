export const addCart = (cart) => {  
	return {  
		type: 'ADD_CART',
		cart
	}
}

export const showLoading = () => {  
	return {  
		type: 'SHOW_LOADING'
	}
}

export const hideLoading = () => {  
	return {  
		type: 'HIDE_LOADING'
	}
}