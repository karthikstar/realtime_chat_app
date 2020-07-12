import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom';

import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

const App = () => (
    <Router>
        <Route path = "/" exact component={Join} /> 
        <Route path = "/chat" component = {Chat} />

    </Router>
)


// when the user first comes to the page (root url /), he will see the join component 

export default App;

