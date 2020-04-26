import React, { Component, useEffect }  from 'react';
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {domain: ''};
    this.state = {emails: ''}
    this.state = {mail: []}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    is_ask: false,
    is_baidu: false,
    is_bing: false,
    is_dogpile: false,
    is_exalead: false,
    is_google: false,
    is_pgp: false,
    is_pwned: false,
    is_shodan: false,
    is_yahoo: false
};
on_change_ask = () => {
  this.setState(prevState => ({
    is_ask: !prevState.is_ask,
  }));
}

on_change_baidu = () => {
  this.setState(prevState => ({
    is_baidu: !prevState.is_baidu,
  }));
}

on_change_bing = () => {
  this.setState(prevState => ({
    is_bing: !prevState.is_bing,
  }));
}

on_change_dogpile = () => {
  this.setState(prevState => ({
    is_dogpile: !prevState.is_dogpile,
  }));
}

on_change_exalead = () => {
  this.setState(prevState => ({
    is_exalead: !prevState.is_exalead,
  }));
}

on_change_pgp = () => {
  this.setState(prevState => ({
    is_pgp: !prevState.is_pgp,
  }));
}

on_change_pwned = () => {
  this.setState(prevState => ({
    is_pwned: !prevState.is_pwned,
  }));
}

on_change_shodan = () => {
  this.setState(prevState => ({
    is_shodan: !prevState.is_shodan,
  }));
}

on_change_yahoo = () => {
  this.setState(prevState => ({
    is_yahoo: !prevState.is_yahoo,
  }));
}


on_change_google = () => {
  console.log(this.state)
  this.setState(prevState => ({
    is_google: !prevState.is_google,
  }));
}
  handleChange = (event) => {
    this.setState({
      domain : event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log(this.state)

    const d = {
      domain: this.state.domain,
      is_ask: this.state.is_ask,
      is_bing: this.state.is_bing,
      is_pwned: this.state.is_pwned,
      is_pgp: this.state.is_pgp,
      is_yahoo: this.state.is_yahoo,
      is_baidu: this.state.is_baidu,
      is_exalead: this.state.is_exalead,
      is_google: this.state.is_google,
      is_dogpile: this.state.is_dogpile,
      is_shodan: this.state.is_shodan
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
            <div className="form-check">
              <label className="form-check-label">
                <input type="checkbox"
                  defaultChecked={this.state.is_ask}
                  onChange={this.on_change_ask}
                  className="form-check-input"
                />
                Ask
              </label>
            </div>

            <div className="form-check">
              <label className="form-check-label">
                <input type="checkbox"
                  defaultChecked={this.state.is_baidu}
                  onChange={this.on_change_baidu}
                  className="form-check-input"
                />
                Baidu
              </label>
            </div>

            <div className="form-check">
              <label className="form-check-label">
                <input type="checkbox"
                  defaultChecked={this.state.is_bing}
                  onChange={this.on_change_bing}
                  className="form-check-input"
                />
                Bing
              </label>
            </div>

            <div className="form-check">
              <label className="form-check-label">
                <input type="checkbox"
                  defaultChecked={this.state.is_dogpile}
                  onChange={this.on_change_dogpile}
                  className="form-check-input"
                />
                Dogpile
              </label>
            </div>

            <div className="form-check">
              <label className="form-check-label">
                <input type="checkbox"
                  defaultChecked={this.state.is_exalead}
                  onChange={this.on_change_exalead}
                  className="form-check-input"
                />
                Exalead
              </label>
            </div>
            <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox"
                    defaultChecked={this.state.is_google}
                    onChange={this.on_change_google}
                    className="form-check-input"
                  />
                  Google
                </label>
            </div>

                <div className="form-check">
                  <label className="form-check-label">
                    <input type="checkbox"
                      defaultChecked={this.state.is_pwned}
                      onChange={this.on_change_pwned}
                      className="form-check-input"
                    />
                    Pwned
                  </label>
            </div>
                <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox"
                        defaultChecked={this.state.is_shodan}
                        onChange={this.on_change_shodan}
                        className="form-check-input"
                      />
                      Shodan
                    </label>
            </div>

            <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox"
                    defaultChecked={this.state.is_yahoo}
                    onChange={this.on_change_yahoo}
                    className="form-check-input"
                  />
                  Yahoo
                </label>
            </div>

            <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox"
                    defaultChecked={this.state.is_pgp}
                    onChange={this.on_change_pgp}
                    className="form-check-input"
                  />
                  PGP (this may take some time)
                </label>
            </div>
            <input type="submit" value="Submit" />
            <p>list of emails found: {this.state.mail}</p>
            <LoadingIndicator/>
          </div>
        </form>
      )
    }
}
export default Form
