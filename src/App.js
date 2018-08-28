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
  handlePageClick = (e) => {
        this.setState({
          currentPage: Number(e.target.id)
        });
  }

  render() {
    if(this.state.data != null){
        const { data, dupdata, currentPage, todosPerPage } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        let pageData;
        console.log(indexOfFirstTodo, indexOfLastTodo);
        console.log("data: ",data);
        console.log("currentTodos: ",currentTodos);
        console.log("dupdata: ",dupdata);
        if(dupdata.length != 0){
          var currentTodos = dupdata;
          pageData = dupdata.length;
        }else{
          currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);
          pageData = data.length;
        }
        
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(pageData / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li
              key={number}
              id={number}
              onClick={this.handlePageClick}
            >
              {number}
            </li>
          );
        });
      //console.log("data from render",this.state.data[0]);
      return (
        <div className="App">
          filter data <input onChange={this.changeHandler} id="filter" type="text"/>
          <CustTable data={currentTodos} />
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
        //this.setState({ dupdata:data });
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
