import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    BrowserRouter as Router, 
    Route, 
    Switch, 
    Link 
} 
from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import NotFound from './components/NotFound';

function App() {

    const [users, setUsers] = useState([]);

    const onLoad = () => {
        const getUser = async () => {
            try {

                const { data } = await axios.get('/users');
                setUsers(data.users);

            } catch(err) {
                console.log(err);
            }
        }
        getUser();
    }

    useEffect(onLoad);

    return (
       <Router>
            <header>
                <h2>
                    CrudApp.com
                </h2>
                <Link to="/add">Add user</Link>
            </header>
            <div className="container">
                <Switch>
                    <Route exact path="/" component={() => <Home users={users} />} />
                    <Route exact path="/add" component={AddUser} />
                    <Route exact path="/edit/:id" component={EditUser} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );  
}

export default App;
