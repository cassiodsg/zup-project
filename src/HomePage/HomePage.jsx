import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {SearchBar} from './SearchBar'

const API_URL = 'http://jsonplaceholder.typicode.com';


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: [],
            store: [],
        };
    }

    componentDidMount() {
        const url = `${API_URL}/users/`;
        axios.get(url).then(response => response.data)
        .then((data) => {
            this.setState({ users: data, store: data })
            console.log(this.state.users)
        })

    }

    filterNames(e){
        this.setState({users: this.state.store.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))})
    }

    render() {
        // const { user, users } = this.state;
        
        return (
            <div className="container">
               <div className="wrapper-list">
                   <div className="logout">
                        <button type="button" className="btn btn-primary btn-logout">
                            <Link to="/login">Logout</Link>
                        </button>
                   </div>
                   
                   
                   <SearchBar searchFunc={(e) => this.filterNames(e)}/>
                    {this.state.users.map((user, index) =>
                    
                        <div className="card card-user"  key={user.id}>
                        
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                {user.email}
                                </h6>  
                                <h6 className="card-subtitle mb-2 text-muted">
                                {user.website}             
                                </h6>
                                <h6 className="card-subtitle mb-2 text-muted">
                                {user.address.city}             
                                </h6>
                            </div>
                        
                        </div>
                       
                    )}
               
                </div>
            </div>
        );
    }
}

export { HomePage };