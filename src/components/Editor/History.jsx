import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'

import GET_COMMITS from '../../queries/getCommits'

const History = props => {
	const { loading, data: commits } = useQuery(GET_COMMITS, {
		variables: {
			path: props.path
				.split('/')
				.slice(0, 6)
				.join('/'),
			commits: props.commits,
		},
	})
	if (loading)
		return (
			<div id="history__panel">
				<header>
					<h3>History</h3>
				</header>
				<main>Loading</main>
			</div>
		)
	return (
		<div id="history__panel">
			<header>
				<h3>History</h3>
			</header>
			<main>
				{commits.getCommits.map((commit, index) => (
					<div className="commit" key={index}>
						<span>{commit.message}</span>
						<span>
							{new Intl.DateTimeFormat('en-US', {
								month: 'short',
								day: 'numeric',
								hour: 'numeric',
								minute: 'numeric',
							}).format(commit.committer.timestamp * 1000)}
						</span>
					</div>
				))}
			</main>
		</div>
	)
}

History.propTypes = {
	commits: PropTypes.array,
}

export default History
