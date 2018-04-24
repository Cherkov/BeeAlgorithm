import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      razv: 0,
      furaj: 0,
      bestArea:0,
      iteration: 0,
      func: '',
      btmBorder: 0,
      topBorder: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitBtn = this.submitBtn.bind(this);
  }
  submitBtn(){
    console.log(this.state)
       fetch('/api/getUsername', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      }).then(res=>res.json())
      .then(res => console.log(res));
  }
  handleChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }
  
  render() {
    return (
      <div className="wrapper">
        <img src="./public/img/bee.gif"/>
        <div className="razvedchiki">
          <h2>Введите количество пчел-разведчиков</h2>
           <input name='razv' onChange={this.handleChange}/>
        </div>
        <div className="razvedchiki">
          <h2>Введите количество пчел-фуражиров</h2>
           <input name='furaj' onChange={this.handleChange}/>
        </div>
        <div className="razvedchiki">
          <h2>Введите количество лучших цветочных участков</h2>
           <input name='bestArea' onChange={this.handleChange}/>
        </div>
        <div className="razvedchiki">
          <h2>Введите количество итераций</h2>
           <input name='iteration' onChange={this.handleChange}/>
        </div>
        <div className="razvedchiki">
          <h2>Введите целевую функцию</h2>
          <input name='func' onChange={this.handleChange}/>
        </div>
         <div className="razvedchiki">
          <h2>Введите нижнюю границу</h2>
          <input name='btmBorder' onChange={this.handleChange}/>
        </div>
         <div className="razvedchiki">
          <h2>Введите верхнюю границу</h2>
          <input name='topBorder' onChange={this.handleChange}/>
        </div>
        <button onClick={this.submitBtn}>Пащетат</button>
      </div>
    );
  }
}
