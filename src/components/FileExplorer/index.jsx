import React from 'react'
import { useQuery } from '@apollo/react-hooks'

// State
import { Context } from '../../state'

// Components
import TreeView from '../TreeView'

// Styles
import { FileExplorerWrapper } from './styles'

// Queries
import { GET_EXPLORER_CONTENT } from '../../queries'

// Helpers
import toggleNode from '../../utils/toggleNode'

const FileExplorer = () => {
    const { state, dispatch } = React.useContext(Context)
    const [data, setData] = React.useState([])

    const {
        loading: queryLoading,
        error: queryError,
        data: queryData,
    } = useQuery(GET_EXPLORER_CONTENT, {
        variables: { path: './../apps' },
    })

    React.useEffect(() => {
        if (queryData && queryData.getFolderWithFiles) {
            setData(queryData.getFolderWithFiles.children)
            dispatch({
                type: 'SET_CURRENT_FOLDER',
                payload: queryData.getFolderWithFiles.path,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryData])

    const onToggle = node => {
        const mutated = toggleNode(data, node)
        setData(mutated)
    }

    const onSelection = node => {
        if (node.type === 'folder') onToggle(node.name)
        if (node.type === 'file')
            dispatch({
                type: 'ADD_TAB',
                payload: {
                    name: node.path.split('/').pop(),
                    path: node.path,
                },
            })
    }

    if (queryLoading) {
        return <div>Loading...</div>
    }
    if (queryError) {
        return <div>Error</div>
    }
    return (
        <FileExplorerWrapper isSidebarVisible={state.isSidebarVisible}>
            <TreeView
                data={data}
                onSelection={onSelection}
                onToggle={onToggle}
            />
        </FileExplorerWrapper>
    )
}

export default FileExplorer
