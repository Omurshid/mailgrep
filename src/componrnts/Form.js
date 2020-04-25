import React, { Component, useEffect }  from 'react';
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {domain: 'cat.com'};
    this.state = {emails: ''}
    this.state = {mail: []}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange = (event) => {
    this.setState({
      domain : event.target.value
    })
  }
  
  handleSubmit = async event => {
    event.preventDefault();
    
    const d = {
      domain: this.state.domain
    }
    var emails = this.state.emails
    

      trackPromise(fetch('/api/get_mail', {
        method:"POST",
        cache: "no-cache",
        headers:{
            "content_type":"application/json",
        },
        body:JSON.stringify(d)
        }
      ).then(res => res.json())).then(data => {
        this.setState({
          emails: data.emails
        });
        var mail = []
        for (let i = 0; i < this.state.emails.length; i++) {
          for (let j = 0; j < this.state.emails[i].email.length; j++) {
            mail.push(this.state.emails[i].email[j])
          }
        }
        this.setState({
          mail: mail
        });
      });
   
    
  }
  
     
    
    render(){
      const LoadingIndicator = props => {
        const { promiseInProgress } = usePromiseTracker();
        return (promiseInProgress && 
            <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" /> 
        );
      }
      return(
        <form onSubmit={this.handleSubmit}>
          <div> 
            <label>Domain</label>
            <input type='text' value={this.state.domain} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
            <p>list of emails found: {this.state.mail}</p>
            <LoadingIndicator/>
          </div>
        </form>
      )
    }
}
export default Form