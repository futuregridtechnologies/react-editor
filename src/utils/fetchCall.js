const fetchCall = async body => {
	const response = await fetch(process.env.REACT_APP_GRAPHQL_URI, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: body,
	})
	const data = await response.json()
	return await data
}

export default fetchCall
