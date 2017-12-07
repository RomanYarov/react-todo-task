import React, { Component } from 'react';

import TaskForm from '../component/Form';
import TaskList from '../component/List';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className='container'>
                <TaskForm />
                <TaskList />
            </div>
        );
    }
}

export default App;
