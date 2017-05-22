export const addCart = (cart) => {  
	return {  
		type: 'ADD_CART',
		cart
	}
}

export const showLoading = (isLoading) => {  
	return {  
		type: 'SHOW_LOADING',
		isLoading
	}
}

export const hideLoading = (isLoading) => {  
	return {  
		type: 'HIDE_LOADING',
		isLoading
	}
}