import React, { Component } from "react";
import "./signUp.css";
import firebase from "../../utils/firebase";
import {Link, withRouter} from "react-router-dom";

import {store }from "react-notifications-component";
import "animate.css";
import 'react-notifications-component/dist/theme.css';


 class SignUp extends Component {
    constructor(props){
        super(props);

        this.state={
            firstName:"",
            lastName:"",
            email:"",
            password:""
        }
    }
     handleChange=(event)=>{
        const {name,value} = event.target;
        this.setState({
            [name]: value
        })
        }

     handleSubmit= async (event)=>{
         event.preventDefault();
         const {email, password} = this.state;
         var tag = "no error"

        
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(async function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode,errorMessage);

                await store.addNotification({
                    title: '',
                    width: 250,
                    message: errorMessage,
                    type: 'warning',                         // 'default', 'success', 'info', 'warning'
                    container: 'top-left',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                      duration: 3000 
                    }
                  })
                tag = "error";
              });
                      
         if(tag ==="no error"){
            this.setState({
                firstName:"",
                lastName:"",
                email:"",
                password:"" 
              })

              await store.addNotification({
                title: '',
                width: 250,
                message: "Sign up successful",
                type: 'success',                         // 'default', 'success', 'info', 'warning'
                container: 'top-left',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                  duration: 3000 
                }
              })

              this.props.history.push("/login");
        }
        
       
     }   
    
    render() {
        return (
            <form className="sign-up-form-container">
                <h3 className="header-signUp">Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input name="firstName" value={this.state.firstName} type="text" onChange={ this.handleChange} className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input name="lastName" value={this.state.lastName}  type="text" onChange={ this.handleChange} className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input name="email" value={this.state.email}  type="email" onChange={ this.handleChange} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" value={this.state.password} type="password"  onChange={ this.handleChange}className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-block">Create Account</button>
                <p className="forgot-password text-right">
                    Already registered <Link to="/login">sign in?</Link>
                </p>
                
                <p className="home-button-container-signup">
          <Link to="/">
          <button
          className="btn btn-success home-button-signup btn-block"
          >
         Home
        </button></Link></p>
            </form>
        );
    }
}
export default withRouter(SignUp);