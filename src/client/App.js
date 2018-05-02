import React, { Component } from 'react';
import Report from './Report'
import Home from './Home'
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: window.location.hash.substr(1),
      razv: 0,
      furaj: 0,
      bestArea:0,
      iteration: 0,
      func: '',
      btmBorder: 0,
      topBorder: 0,
      rangeArea:0,
      result:0,
    };
  }
  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1)
      })
    })
  }
  
  render() {
    let Child

    switch (this.state.route) {
      case '/report': Child = Report; break;
      case '/': Child = Home; break;
      default: Child = Home;  
    }
    return (
      <div>
      <header>
      <div className='rightNav'>
        <img src='./public/img/logo.jpg'/>
        <h1>Пчелиный алгоритм</h1>
        <ul>
        <li>
          <a href="#/">Главная</a>
        </li>
         <li>
          <a href="#/report">Отчет</a>
        </li>
      </ul>
      </div>
      <div className='leftNav'>
        <a href="https://github.com/Cherkov/BeeAlgorithm">
          <img src='./public/img/github.png'/>
        </a>
      </div>
      </header>
      <Child/>
      </div>
    );
  }
}
