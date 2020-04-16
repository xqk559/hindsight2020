import React, { useState, useEffect } from 'react';
import './App.css';
import './doge2.jpg';
import axios from 'axios';
import Spinner from './spinner';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + mm + dd;
let todayHyphenated = yyyy + "-" + mm + "-" + (dd - 1);
let todayHyphenatedString = todayHyphenated.toString();

const App = () => {
  const [date, setDate] = useState(0);
  const [investment, setInvestment] = useState(0);
  const [axiosData, setAxiosData] = useState(null);
  const [todaysPrice, setTodaysPrice] = useState(null);

  let todaysPriceNumber = Number(todaysPrice).toFixed(2);

  useEffect(()=>{
    axios.get('https://cors-anywhere.herokuapp.com/https://coinmarketcap.com/currencies/bitcoin/historical-data/?start=20130428&end='+today.toString())
      .then((response)=>{if(response.data){setAxiosData(response.data)}})
      .then(()=>{if(axiosData !== null)setTodaysPrice((axiosData.slice((axiosData.search(todayHyphenatedString + "................................\"open\":")+49),(axiosData.search(todayHyphenatedString + "................................\"open\":")+60))))})
    },[axiosData])

  const investHandler = (event) => {
    setInvestment(event.target.value)
  }

  const dateHandler = (event) => {
    setDate(event.target.value)
  }

  let selectedPrice = null;

  if(axiosData !== null){
    selectedPrice = (axiosData.slice((axiosData.search(date + "................................\"open\":")+49),(axiosData.search(date + "................................\"open\":")+60)))
  }

  let coins = investment/selectedPrice;
  let rounder = coins.toFixed(5);

  let todayValue;
  todayValue = rounder * todaysPriceNumber;
  let tvRound = todayValue.toFixed(2);

  let per = (100*(todaysPriceNumber/selectedPrice)).toFixed(2);

  const updatedPage = () => {
    if(!isNaN(rounder) && investment !== 0 && date.length === 10){
      return (
        <div>
          <p>On {date}, Bitcoin was worth ${Number(selectedPrice).toFixed(2)}.</p>
          <p>If you invested ${investment} on {date},</p>
          <p>You would have {rounder} coins, valued today at ${tvRound}.</p>
          <p>This would be a {per}% difference.</p>
        </div>
      )
    }
  }

  const todaysPriceChecker = () => {
    if(todaysPrice !== null){
      return todaysPriceNumber;
    } else {
      return <Spinner/>;
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
        <div>Date (ex: 2020-04-05): &nbsp;</div>
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
      <div>Today, Bitcoin is worth ${todaysPriceChecker()}.</div>
      {updatedPage()}
    </div>
  );
}

export default App;
