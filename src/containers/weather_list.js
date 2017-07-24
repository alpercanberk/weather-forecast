import React,{Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart.js';
import _ from 'lodash';
import GoogleMap from '../components/google_map.js'

class WeatherList extends Component{
  renderWeather(cityData){
    const temps = cityData.list.map(weather => _.round((weather.main.temp)-273));
    const humidities = cityData.list.map(weather => weather.main.humidity);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const name = cityData.city.name;
    const long = cityData.city.coord.lon;
    const lat = cityData.city.coord.lat;

    return(
      <tr key={name}>
        <td><GoogleMap lat={lat} lon={long}/></td>
        <td>
          <Chart measure ="C" data = {temps} color = "red"/>
        </td>
        <td>
          <Chart data = {humidities} color = "blue" measure ="%"/>
        </td>
        <td>
          <Chart data = {pressures} color = "orange" measure="hPa"/>
        </td>
      </tr>
    );
  }
  render(){
    return(
      <table className="table table-hover">
      <thead>
        <tr>
          <th >City</th>
          <th>Temperature</th>
          <th>Humidity</th>
          <th>Pressure</th>

        </tr>
      </thead>
      <tbody>
        {this.props.weather.map(this.renderWeather)}
      </tbody>
      </table>
    );
  }

}

function mapStateToProps({weather}){
  return{
    weather:weather
  }
}

export default connect(mapStateToProps)(WeatherList);
