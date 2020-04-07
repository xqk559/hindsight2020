import React, { Component } from 'react';
import './App.css';
import './doge2.jpg';
import jsonData from './output.json';
import axios from 'axios';
import Spinner from './spinner';

const reactStringReplace = require('react-string-replace')

class App extends Component {
  state = {
    data: jsonData,
    Investment: 0,
    Date1: null,
    loading: false,
    Historicdate: 0,
    percent: null,
    RounderState: null
  }

  // componentDidMount () {
  //   axios.get('https://udemy-react-60d5e.firebaseio.com/date.json')
  //     .then(response => {
  //       this.setState({Historicdate: response.data})
  //     });
  // }

  investHandler = (event) => {
    this.setState({
      Investment: event.target.value
    })
  }

  dateHandler = (event) => {
    this.setState({
      Date1: event.target.value
    })
  }

  textReplacer = () => {
    let jsn = this.state.data.title;
    let replacedText = reactStringReplace(jsn, "\n", (match, i) => (
      <a></a>
    ));
  }

  render() {
    let jsn = this.state.data.title;
    const reactStringReplace = require('react-string-replace')

    let replacedText = reactStringReplace(jsn, "\n", (match, i) => (
      <a></a>
    ));

    let str = this.state.data.title;
    let searchAlt = str.search(this.state.Date1);

    let k = str.slice(searchAlt+13,searchAlt+19);

    let coins = this.state.Investment/k;
    let rounder = coins.toFixed(5);

    let string1 = replacedText.toString();

    let todayValue;
    todayValue = rounder * replacedText[24];
    let tvRound = todayValue.toFixed(2);

    let n = 24;

    let per = (100*(replacedText[24]/k)).toFixed(2);

    let uhf = null;

    let load = <div>Not Loading</div>

    if (per>1000) {
      uhf = <a href="https://www.youtube.com/watch?v=qileP4bAzek">Follow-up Link</a>;
    }

    if ( this.state.loading ) {
      load = < Spinner />;
    }

    let axioses = () => {
      this.setState({
        loading: true
      })
      const date = {
        date: this.state.Date1
        }
      axios.post('https://udemy-react-60d5e.firebaseio.com/date.json ', date)
      .then(response => {this.setState({ loading: false })})
      .catch(error => console.log(error));
      const investment = {
        investment: this.state.Investment
      }
      axios.post('https://udemy-react-60d5e.firebaseio.com/investments.json ', investment)
      .then(response => {this.setState({ loading: false })})
      .catch(error => console.log(error));
      const coins = {
        coins: rounder
      }
      axios.post('https://udemy-react-60d5e.firebaseio.com/coins.json ', coins)
      .then(response => {this.setState({ loading: false })})
      .catch(error => console.log(error));
      const valueToday = {
        valueToday: tvRound
      }
      axios.post('https://udemy-react-60d5e.firebaseio.com/valuetoday.json ', valueToday)
      .then(response => {this.setState({ loading: false })})
      .catch(error => console.log(error));
    }

    console.log(this.state.Investment)
    return (
      <div className="App">
        <h1 className="rainbow">Hindsight BC</h1>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <img src={require('./doge2.jpg')} width="200" height="200" alt="dogecoin" />
        <br></br>
        <br></br>
        <a>Date (ex: Apr 02, 2014): </a>
        <input type="text" className="date" onChange={this.dateHandler} key="date" />
        <a>  Investment (US$): </a>
        <input type="text" className="Investment" onChange={this.investHandler} key="invest" />
        <br></br>
        <p>Today, Bitcoin is worth ${replacedText[24]}.</p>
        <p>On {this.state.Date1}, Bitcoin was worth ${k}.</p>
        <p>If you invested ${this.state.Investment} on {this.state.Date1},</p>
        <p>You would have {rounder} coins, valued today at ${tvRound}.</p>
        <p>This would be a {per}% difference.</p>
        <br></br>
        <p>{uhf}</p>
        <button onClick={axioses}>Upload via AXIOS</button>
        <div>{load}</div>
        <div>{this.state.Historicdate}</div>
      </div>

    );
  }
}

export default App;
