export const getMessageCount = (message) => {  
	return {  
		type: 'GET_MESSAGE_COUNT',
		message
	}
}

export const setMessageCount = (message, count) => {  
	return {  
		type: 'SET_MESSAGE_COUNT',
		message,
		count
	}
}