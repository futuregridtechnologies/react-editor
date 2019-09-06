import React from 'react'
import PropTypes from 'prop-types'

const Templates = ({ appendCode }) => {
	const [search, setSearch] = React.useState('')
	const [templates] = React.useState([
		{
			name: 'Ingredient',
			type: 'ingredient',
			code:
				'{\n  "INDEX": 1,\n  "NAME": "",\n  "SERVING": [\n    {\n      "1": 200\n    }\n  ],\n  "MEASURE": "",\n  "SECTION": "",\n  "PROCESSING": ""\n}',
		},
	])
	return (
		<div className="templates">
			<header>
				<h3>Templates</h3>
				<input
					type="text"
					className="templates__search"
					placeholder="Search templates..."
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</header>
			<main>
				{templates
					.filter(item =>
						item.name.toLowerCase().includes(search.toLowerCase())
					)
					.map((template, index) => (
						<div className="templates__item" key={index}>
							<span>{template.name}</span>
							<button
								onClick={() =>
									appendCode(template.type, template.code)
								}
							>
								Add
							</button>
						</div>
					))}
			</main>
		</div>
	)
}

Templates.propTypes = {
	appendCode: PropTypes.func,
}

export default Templates
