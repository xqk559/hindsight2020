import React, { useState, useEffect } from 'react';
import './App.css';
import './doge2.jpg';
import jsonData from './output.json';
import axios from 'axios';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + mm + dd;

console.log(today)

const App = () => {
  const [json, setJsonData] = useState(jsonData)
  const [date, setDate] = useState(null)
  const [investment, setInvestment] = useState(0)
  const [axiosData, setAxiosData] = useState(null)

  useEffect(()=>{
    axios.get('https://cors-anywhere.herokuapp.com/https://coinmarketcap.com/currencies/bitcoin/historical-data/?start=20130428&end='+today.toString())
      .then((response)=>{if(response.data){setAxiosData(response.data)}})
      .then(()=>{if(axiosData !== null){console.log(axiosData)}})
  },[axiosData])

  const investHandler = (event) => {
    setInvestment(event.target.value)
  }

  const dateHandler = (event) => {
    setDate(event.target.value)
  }

  let jsn = json.title;
  const reactStringReplace = require('react-string-replace')

  let replacedText = reactStringReplace(jsn, "\n", (match, i) => (
    <div></div>
  ));

  let str = json.title;
  let searchAlt = str.search(date);

  let k = str.slice(searchAlt+13,searchAlt+19);

  let coins = investment/k;
  let rounder = coins.toFixed(5);

  let todayValue;
  todayValue = rounder * replacedText[24];
  let tvRound = todayValue.toFixed(2);

  let per = (100*(replacedText[24]/k)).toFixed(2);

  const updatedPage = () => {
    if(!isNaN(rounder) && investment !== 0 && date.length === 12){
      return (
        <div>
          <p>On {date}, Bitcoin was worth ${k}.</p>
          <p>If you invested ${investment} on {date},</p>
          <p>You would have {rounder} coins, valued today at ${tvRound}.</p>
          <p>This would be a {per}% difference.</p>
        </div>
      )
    }
  }

  return (
    <div className="App">
      <h1 className="rainbow">Hindsight BC</h1>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
      <img
        src={require('./doge2.jpg')}
        width="200"
        height="200"
        alt="dogecoin" />
      <br></br>
      <br></br>
      <div className="Inputs">
        <div>Date (ex: Apr 02, 2014): &nbsp;</div>
        <input
          type="text"
          className="date"
          onChange={dateHandler}
          key="date" />
          &nbsp;
        <div>  Investment (US$): &nbsp;</div>
        <input
          type="text"
          className="Investment"
          onChange={investHandler}
          key="invest" />
      </div>
      <br></br>
      <p>Today, Bitcoin is worth ${replacedText[24]}.</p>
      {updatedPage()}
    </div>
  );
}

export default App;
