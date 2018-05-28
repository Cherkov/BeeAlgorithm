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
      btmBorder: [],
      topBorder: [],
      rangeArea:0,
      result:0,
      name: '',
      numberOfVars: 0,
      borders: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10'],
      bordersArr: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitBtn = this.submitBtn.bind(this);
  }
  submitBtn(){
    console.log(this.props);
    console.log(this.state)
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
    if(name == "numberOfVars"){
      console.log("asdasd")
      this.setState({
        bordersArr: this.state.borders.slice(0, parseInt(target.value))
      })
    }
    console.log(this.state.borderArr)
  }
  handleChangeBorders(event, id, border) {
    console.log(id);
    const name = event.target.name;
    var Arr = [];
    border == 'top' ? Arr = [...this.state.topBorder] : Arr = [...this.state.btmBorder];
    Arr[id.idx] = parseInt(event.target.value);
    this.setState({
      [name]: Arr
    })
  }
  render() {
    return (
      <div>
      <div className="wrapper">
        {/*<img src="./public/img/bee.gif"/>*/}
          <div className= "container">
          <div className="razvedchiki">
            <label>Введите ваше Имя</label>
            <input  name='name'  value={this.state.name} onChange={this.handleChange}/>
          </div>
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
            <label>Введите количество переменных</label>
            <input type='number' name='numberOfVars' onChange={this.handleChange}/>
          </div>
          <div className="razvedchiki">
            <label>Введите целевую функцию</label>
            <input name='func' onChange={this.handleChange}/>
          </div>
            {this.state.bordersArr.map((border, idx) => (
              <div className="razvedchiki">
                 <div className="btmBorder">
                  <label>Введите нижнюю границу для x{idx+1}</label>
                  <input type='number' name='btmBorder' onChange={(e) => {this.handleChangeBorders(e, {idx}, 'btm')}}/>
                </div>
                <div className="topBorder">
                  <label>Введите верхнюю границу для x{idx+1}</label>
                  <input type='number' name='topBorder' onChange={(e) => {this.handleChangeBorders(e, {idx}, 'top')}}/>
                </div>
              </div>
            ))}
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
      </div>
    );
  }
}