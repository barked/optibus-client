import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import config from './config.json';
import ExpectedTable from './components/ExpectedTable';
import DifferenceGraph from './components/DifferenceGraph';
import { getTripTimes } from './utils';

class App extends Component {
  state = {
    expectedData: [],
    tripTimes: {}
  }
  async componentDidMount (){
    const expectedData = await axios.get(`${config.SERVER_URL}/api/expected`);
    const actualData = await axios.get(`${config.SERVER_URL}/api/actual`);
    this.setState({ expectedData: expectedData.data, tripTimes: getTripTimes(actualData.data) });
  }
  updateSelectedTrip = (event) => {
    this.setState({ selectedTrip: event.target.innerText })
  }
  render() {
    const { expectedData, tripTimes, selectedTrip } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src="https://media.licdn.com/dms/image/C4E0BAQGXoMXO2Yrxuw/company-logo_200_200/0?e=2159024400&v=beta&t=OGOAGoueK4QDb_i4CblEilKNfxVtHt5tXt5G_HJSpOU" className="App-logo" alt="logo" />
        </div>
        <div style={{width: '80%', padding: '20px', margin: 'auto'}}>
          <ExpectedTable expectedData={expectedData} updateSelectedTrip={this.updateSelectedTrip}/>
          <DifferenceGraph expectedData={expectedData} tripTimes={tripTimes} selectedTrip={selectedTrip}/>
        </div>
      </div>
    );
  }
}

export default App;
