import React, { Component } from 'react';

export default class Report extends Component {
  constructor(props) {
    super(props)
    this.state={
      data:[
        {
          function: '',
          ravedchiki: 0,
          furajiri: 0,
          iteration: 0,
          numberOfAreas: 0,
          rangeArea: 0,
          btmBorder:0,
          topBorder:0
        }
      ]
    }
  }
	componentDidMount() {
    fetch('/api/getReport')
      .then(response => response.json())
      .then(response => this.setState({ data: response }));
      console.log(this.state.data)
  }
  
  render() {
    return (
      <div className='row'>
        <div className='report'>
         <ul>
            <li>
              <h2>Функция</h2>
              <span>{this.state.data[this.state.data.length-1].function}</span>
            </li>
            <li>
              <h2>Количество пчел-разведчиков</h2>
              <span>{this.state.data[this.state.data.length-1].ravedchiki}</span>
            </li>
            <li>
              <h2>Количество пчел-рабочих</h2>
              <span>{this.state.data[this.state.data.length-1].furajiri}</span>
            </li>
            <li>
              <h2>Количество итераций</h2>
              <span>{this.state.data[this.state.data.length-1].iteration}</span>
            </li>
            <li>
              <h2>Количество лучших участков</h2>
              <span>{this.state.data[this.state.data.length-1].numberOfAreas}</span>
            </li>
            <li>
              <h2>Область лучших участков</h2>
              <span>{this.state.data[this.state.data.length-1].rangeArea}</span>
            </li>
             <li>
              <h2>Нижняя граница</h2>
              <span>{this.state.data[this.state.data.length-1].btmBorder}</span>
            </li>
             <li>
              <h2>Верхняя граница</h2>
              <span>{this.state.data[this.state.data.length-1].topBorder}</span>
            </li>
             <li>
              <h2>Результат</h2>
              <span>{parseFloat(this.state.data[this.state.data.length-1].result).toFixed(2)}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
