import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
    constructor(props) {
    super(props);

    this.state = {
      data: [],
      dupdata: [],
      currentPage: 1,
      todosPerPage: 10
    };
  }  

  
  changeHandler = (e) => {
    //alert("clicked!");
    console.log(document.getElementById('filter').value);
    var updatedList = this.state.data;
    //console.log("updatedList", updatedList);
    updatedList = updatedList.filter(function(item){
      return item.title.toLowerCase().search(
        e.target.value.toLowerCase()) !== -1;
    });
    this.setState({dupdata: updatedList});
    
  }
  render() {
    if(this.state.data != null){
              const { data, dupdata, currentPage, todosPerPage } = this.state;
              const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li
              key={number}
              id={number}
              //onClick={this.handleClick}
            >
              {number}
            </li>
          );
        });
      //console.log("data from render",this.state.data[0]);
      return (
        <div className="App">
          filter data <input onChange={this.changeHandler} id="filter" type="text"/>
          <CustTable data={this.state.dupdata} />
            <ul id="page-numbers">
              {renderPageNumbers}
            </ul>
        </div>
    );
    }else{
      return(
        <div className="App">
          initial rendering...
        </div>
      );
    }
  }


  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then((data) => {
        this.setState({ data:data });
        this.setState({ dupdata:data });
        // this.renderLoadedView();
      });
  }
}

class CustTable extends Component{
  constructor(props){
    super(props);
  }
   render(){
     var dataList = this.props.data.map((d)=>{
        return (<tr key={d.id}>
        <td>{d.id}</td>
        <td>{d.userId}</td>
        <td>{d.title}</td>
        <td>{d.body}</td>
       </tr>);
      });
    return (
      <table className="table table-striped text-left">
            <thead>
              <tr>
                <td>num</td>
                <td>id</td>
                <td>title</td>
                <td>desc</td>
              </tr>
            </thead>
            <tbody>{dataList}</tbody>
          </table>
    )  
  }
}

export default App;
