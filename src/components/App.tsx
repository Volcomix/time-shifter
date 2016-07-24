import * as React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import TodayTodos from '../containers/TodayTodos'

const App = () => (
    <div>
        <TodayTodos />
        <FloatingActionButton
            secondary={true}
            style={{
                position: 'absolute',
                bottom: 15,
                right: 15
            }}
        >
            <ContentAdd />
        </FloatingActionButton>
    </div>
)

export default App