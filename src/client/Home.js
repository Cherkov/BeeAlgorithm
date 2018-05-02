import React, { Component } from 'react';
export default class Home extends Component {
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
      rangeArea:0,
      result:0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitBtn = this.submitBtn.bind(this);
  }

  submitBtn(){
       fetch('/api/getUsername', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      }).then(res=>res.json())
      .then(res => (this.setState({
        result: parseFloat(res.result.toFixed(2))
      })));
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
      <div>
      <div className="wrapper">
        {/*<img src="./public/img/bee.gif"/>*/}
        <div className="razvedchiki">
          <label>Введите количество пчел-разведчиков</label>
           <input name='razv' type='number' onChange={this.handleChange}/>
        </div>
        <div className="razvedchiki">
          <label>Введите количество пчел-фуражиров</label>
           <input name='furaj'  type='number' onChange={this.handleChange}/>
        </div>
        <div className="razvedchiki">
          <label>Введите количество лучших цветочных участков</label>
           <input name='bestArea' type='number' onChange={this.handleChange}/>
        </div>
        <div className="razvedchiki">
          <label>Введите область лучших цветочных участков</label>
           <input name='rangeArea' type='number' onChange={this.handleChange}/>
        </div>
        <div className="razvedchiki">
          <label>Введите количество итераций</label>
           <input type='number' name='iteration' onChange={this.handleChange}/>
        </div>
        <div className="razvedchiki">
          <label>Введите целевую функцию</label>
          <input name='func' onChange={this.handleChange}/>
        </div>
         <div className="razvedchiki">
          <label>Введите нижнюю границу</label>
          <input type='number' name='btmBorder' onChange={this.handleChange}/>
        </div>
         <div className="razvedchiki">
          <label>Введите верхнюю границу</label>
          <input type='number' name='topBorder' onChange={this.handleChange}/>
        </div>
        <div className="razvedchiki">
          <label>Результат</label>
          <input value={this.state.result} disabled/>
        </div>
        <div className='buttons'>
          <div className="button">
            <a href='#/report'>
              <span className="button__mask"></span>
              <span className="button__text">Сформировать отчет</span>
              <span className="button__text button__text--bis">Сформировать отчет</span>
            </a>
          </div>
          <div className="button" onClick={this.submitBtn}>
            <span className="button__mask"></span>
            <span className="button__text">Получить оптимальное значение</span>
            <span className="button__text button__text--bis">Получить оптимальное значение</span>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
