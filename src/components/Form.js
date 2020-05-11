import React, { Component, useEffect }  from 'react';
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';
import '../App.css';
import glass from '../glass.PNG';
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {domain: '',
                  emails:[],
                  mail:[{}],
                  isLoaded:false,
                  isEmpty:true,
                  is_ask: true,
                  is_baidu:true,
                  is_bing: true,
                  is_dogpile:true,
                  is_exalead:true,
                  is_google:true,
                  is_yahoo:true,
                  is_php:false
                }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
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
    is_dogpile: !prevState.is_dogpile,            // <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
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
    this.setState({
      isLoaded: false
    });
    const d = {
      domain: this.state.domain,
      is_ask: this.state.is_ask,
      is_bing: this.state.is_bing,
      is_pgp: this.state.is_pgp,
      is_yahoo: this.state.is_yahoo,
      is_baidu: this.state.is_baidu,
      is_exalead: this.state.is_exalead,
      is_google: this.state.is_google,
      is_dogpile: this.state.is_dogpile,
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
          emails: data.emails,
          isLoaded: true,
        });
        var mail = []
        if (this.state.emails !== undefined || this.state.emails.length != 0) {
          for (let i = 0; i < this.state.emails.length; i++) {

                var table_elements = {
                  Email:this.state.emails[i].email,
                  Pwn_Details:this.state.emails[i].pwn_details,
                  Pwn_Length:this.state.emails[i].pwn_length
                  }
                mail.push(table_elements)


          }
          this.setState({
            mail: mail
          });
        }
        this.setState({
          isEmpty: mail.length==0
        });
      });
  }

  renderTableData() {
   return this.state.mail.map((row, index) => {
      const { Email,Pwn_Length,Pwn_Details} = row //destructuring
      return (
         <tr key={Email}>
         <td>{Email}</td>
          <td title = {Pwn_Details}>Pwned on {Pwn_Length} sites</td>
         </tr>
      )
   })
}

    render(){
      const LoadingIndicator = props => {
        const { promiseInProgress } = usePromiseTracker();
        return (promiseInProgress &&
            <img src={glass} className="App-logo"/>
        );
      }
      return(
        <form onSubmit={this.handleSubmit}>
          <div>
          <div class = "element">
            <label>Domain</label>
            <input title= "Enter domain to search for leaks/breaches" type='text' value={this.state.domain} onChange={this.handleChange} />
            </div>
            <div class="checkboxes">
              <label className="form-check-label">
                <input title= "Search Ask" type="checkbox"
                  defaultChecked={this.state.is_ask}
                  onChange={this.on_change_ask}
                  className="form-check-input"
                />
                Ask
              </label>

              <label className="form-check-label">
                <input title= "Search Baidu" type="checkbox"
                  defaultChecked={this.state.is_baidu}
                  onChange={this.on_change_baidu}
                  className="form-check-input"
                />
                Baidu
              </label>

              <label className="form-check-label">
                <input title= "Search Bing" type="checkbox"
                  defaultChecked={this.state.is_bing}
                  onChange={this.on_change_bing}
                  className="form-check-input"
                />
                Bing
              </label>

              <label className="form-check-label">
                <input title= "Search Dogpile" type="checkbox"
                  defaultChecked={this.state.is_dogpile}
                  onChange={this.on_change_dogpile}
                  className="form-check-input"
                />
                Dogpile
              </label>

              <label className="form-check-label">
                <input title= "Search Exalead" type="checkbox"
                  defaultChecked={this.state.is_exalead}
                  onChange={this.on_change_exalead}
                  className="form-check-input"
                />
                Exalead
              </label>
                <label className="form-check-label">
                  <input title= "Search Google" type="checkbox"
                    defaultChecked={this.state.is_google}
                    onChange={this.on_change_google}
                    className="form-check-input"
                  />
                  Google
                </label>
                <label className="form-check-label">
                  <input title= "Search Yahoo" type="checkbox"
                    defaultChecked={this.state.is_yahoo}
                    onChange={this.on_change_yahoo}
                    className="form-check-input"
                  />
                  Yahoo
                </label>

                <label className="form-check-label">
                  <input title="Search PGP (disabled by default due to long runtime)" type="checkbox"
                    defaultChecked={this.state.is_pgp}
                    onChange={this.on_change_pgp}
                    className="form-check-input"
                  />
                  PGP
                </label>
                </div>
            <div class = "element">
            <button type="submit">Search</button>
            </div>
            <center>
            {this.state.isLoaded
              ? this.state.isEmpty
                ? <p>No Emails Found</p>
                :
                <p>

                     <h3 id='title'>List of Emails found (hover for PWNED details)</h3>
                    <div  className="divScroll">
                     <table id='emails'>
                                          <tr>
  <th>Email</th>
  <th>Pwned?</th>
</tr>
                        <tbody>
                           {this.renderTableData()}
                        </tbody>
                     </table>

                  </div></p>

              :  <p></p>
            }
            </center>
            <LoadingIndicator/>
          </div>
        </form>
      )
    }
}
export default Form
