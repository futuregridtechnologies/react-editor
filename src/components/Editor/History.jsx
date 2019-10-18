import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'

import GET_COMMITS from '../../queries/getCommits'
import GET_COMMIT_CONTENT_FETCH from '../../queries/getCommitContent'

import { Context } from '../../state/context'

import fetchCall from '../../utils/fetchCall'

const History = props => {
	const { dispatch } = React.useContext(Context)
	const [index, setIndex] = React.useState(null)
	const { loading, data: commits } = useQuery(GET_COMMITS, {
		variables: {
			path: props.path
				.split('/')
				.slice(0, 6)
				.join('/'),
			commits: props.commits,
		},
	})

	React.useEffect(() => {
		if (index) {
			const body = JSON.stringify({
				query: GET_COMMIT_CONTENT_FETCH,
				variables: {
					path: props.path,
					id: props.commits[index],
				},
			})
			fetchCall(body).then(({ data }) => {
				const { getCommitContent } = data
				return props.selectVersion(getCommitContent)
			})
		}
	}, [index])

	const selectCommit = index => {
		const version = commits.getCommits[index].committer.timestamp * 1000
		setIndex(index)
		dispatch({
			type: 'SET_VERSION',
			payload: {
				path: props.path,
				version: version,
			},
		})
	}

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
						<div>
							<span>{commit.message}</span>
							<button onClick={() => selectCommit(index)}>
								View
							</button>
						</div>
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
	path: PropTypes.string,
}

export default History
