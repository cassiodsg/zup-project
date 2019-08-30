import React from 'react';
import { Link } from 'react-router-dom';

import { userService } from '../_services';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, returnUrl } = this.state;

        if (!(username && password)) {
            return;
        }

        this.setState({ loading: true });
        userService.login(username, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;
        return (
            
            <div className="container pt-3">

                <div className="row justify-content-sm-center">

                    <div className="col-sm-10 col-md-6">

                        <div className="card">

                            <div className="card-header">
                                <div>Login Form</div>
                                <div className="btn-close">
                                    <button type="button" className="close" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>

                            <div className="card-body">

                                <div className="row">

                                    <div className="col-md-12">

                                        <form className="form-signin" name="form" onSubmit={this.handleSubmit}>
                                            <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                                
                                                <input type="text" className="form-control mb-2 username" name="username" placeholder="Username" value={username} onChange={this.handleChange} required/>
                                                {submitted && !username &&
                                                    <div className="help-block">Username is required</div>
                                                }
                                            </div>
                                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                               
                                                <input type="password" className="form-control mb-2" name="password"  placeholder="Password" value={password} onChange={this.handleChange} required/>
                                                {submitted && !password &&
                                                    <div className="help-block">Password is required</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                
                                                <div className="forgot">
                                                    <button className="btn btn-primary btn-form" disabled={loading}>Sign in</button>
                                                    {loading &&
                                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                    }
                                                    <div className="wrapper-lost">
                                                        <Link to="#" className="text-center">Lost Your Password?</Link>
                                                        <div className="tooltip"><p>Username: admin | Password: 123mudar</p></div>
                                                    </div>
                                                    
                                                </div>
                                            </div>

                                            {error &&
                                                <div className={'alert alert-danger'}>{error}</div>
                                            }
                                            
                                        </form>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

export { LoginPage }; 