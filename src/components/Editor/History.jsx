import React from 'react'
import PropTypes from 'prop-types'

import GET_COMMIT_FETCH from '../../queries/getCommit'

import fetchCall from '../../utils/fetchCall'

const History = props => {
	const [commits, setCommits] = React.useState([])
	React.useEffect(() => {
		if (props.commits.length > 0) {
			let bodies = []
			for (let commit of props.commits) {
				bodies.push(
					JSON.stringify({
						query: GET_COMMIT_FETCH,
						variables: {
							path: props.path
								.split('/')
								.slice(0, 6)
								.join('/'),
							id: commit,
						},
					})
				)
			}
			bodies.forEach(async body => {
				await fetchCall(body).then(({ data }) =>
					setCommits(commits => [...commits, data.getCommit])
				)
			})
		}
	}, [props.commits, props.path])
	return (
		<div id="history__panel">
			<header>
				<h3>History</h3>
			</header>
			<main>
				{commits
					.sort(
						(a, b) => b.committer.timestamp - a.committer.timestamp
					)
					.map((commit, index) => (
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
