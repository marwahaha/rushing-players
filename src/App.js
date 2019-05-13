// App.js

import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios';
const { ExportCSVButton } = CSVExport;

class App extends Component {
  state = {
    products: [],
    columns: [{
      dataField: 'Player',
      text: 'Name',
      filter: textFilter(),
    }, {
      dataField: 'Team',
      text: 'Team',
    }, {
      dataField: 'Pos',
      text: 'Position',
    }, {
      dataField: 'Att',
      text: 'Att',
    }, {
      dataField: 'Att/G',
      text: 'Att/G',
    }, {
      dataField: 'Yds',
      text: 'Yds',
      sort: true,
    }, {
      dataField: 'Avg',
      text: 'Avg',
    }, {
      dataField: 'Yds/G',
      text: 'Yds/G',
    }, {
      dataField: 'TD',
      text: 'TD',
      sort: true,
    }, {
      dataField: 'Lng',
      text: 'Lng',
      sort: true,
    }, {
      dataField: '1st',
      text: '1st',
    }, {
      dataField: '1st%',
      text: '1st%',
    }, {
      dataField: '20+',
      text: '20+',
    }, {
      dataField: '40+',
      text: '40+',
    }, {
      dataField: 'FUM',
      text: 'FUM',
    }]
  }

  componentDidMount() {
    axios.get('http://localhost:4000/players')
      .then(response => {
        this.setState({
          products: response.data
        });
      });
  }
  
  render() {
    return (
      <div className="container" style={{ marginTop: 50 }}>
        <ToolkitProvider
          keyField='player' 
          data={ this.state.products }
          columns={ this.state.columns }
          exportCSV={ {
              fileName: 'rushing-players.csv',
              exportAll: false,
            } }>
          {
            props => (
              <div>
                <ExportCSVButton
                { ...props.csvProps }
                keyField='player' 
                data={ this.state.products } 
                columns={ this.state.columns }
                filter={ filterFactory() } 
                >Export CSV!!</ExportCSVButton>
                <hr />
                <BootstrapTable 
                { ...props.baseProps } 
                striped
                hover
                keyField='player' 
                data={ this.state.products } 
                columns={ this.state.columns }
                filter={ filterFactory() } 
                pagination={ paginationFactory() }/>
              </div>
            )
          }
        </ToolkitProvider>        
      </div>
    );
  }
}

export default App;