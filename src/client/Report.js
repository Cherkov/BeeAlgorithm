import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
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
        <ReactTable
          data={this.state.data}
          columns={[
            {
              Header: "Фукция",
              accessor: 'function'
            },
            {
              Header: "Пчелы-разведчики",
              accessor: 'ravedchiki'
            },
            {
              Header: "Пчелы-рабочие",
              accessor: 'furajiri'
            },
            {
              Header: "Лучшие участки",
              accessor: 'numberOfAreas'
            },
            {
              Header: "Итерации",
              accessor: 'iteration'
            },
            {
              Header: "Верхняя граница",
              accessor: 'topBorder'
            },
            {
              Header: "Нижняя граница",
              accessor: 'btmBorder'
            },
            {
              Header: "Область участка",
              accessor: 'rangeArea'
            },
            {
              Header: "Результат",
              accessor: 'result'
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
    )
  }
}
