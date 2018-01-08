import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from '../Home'

const App = () => (
    <Switch>
        <Redirect exact from='/' to='/home'/>
        <Route path="/" component={Home}/>
    </Switch>
)

export default App
