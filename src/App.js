import React from 'react';
import './App.css';
import ListItem from './ListItem';
import axios from 'axios';
import gifloader from './loader.gif';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      todos: [],
      txtbox: 'on textbox',
      edit: false,
      editIndex: null,
      notificaton: null,
      loading : true
    }

    this.apiUrl = "https://5dde3aeefca1110014f16156.mockapi.io";
    this.changeHandler = this.changeHandler.bind(this);
    this.addToClick = this.addToClick.bind(this);
    this.updateToDo = this.updateToDo.bind(this);
    // this.generateId = this.generateId.bind(this);
    this.alert = this.alert.bind(this);
  }

  componentWillMount() {
    console.log("inside component will mount")
  }

  async componentDidMount() {
    console.log("inside component did mount")
    const response = await axios.get(`${this.apiUrl}/todos`);
    console.log(response);

    setTimeout(
      this.setState({
        todos: response.data,
        loading: false
      }), 1000
    )
   

  }

  changeHandler(event) {
    this.setState({
      txtbox: event.target.value
    })
    // console.log(event.target , event.target.value)
  }
  editToDo(index) {
    console.log(index);

    const txtbox = this.state.todos[index].name;

    this.setState({
      update: true,
      txtbox: txtbox,
      editIndex: index
    });
  }

  alert(notification) {

    this.setState({
      notification: notification
    });
    setTimeout(() => {
      this.setState({
        notification: null
      })
    }, 2000);
  }

  async deleteTodo(index) {
    console.log(index)
    const todos = this.state.todos;
    const todo = todos[index];
    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);


    delete todos[index];
    this.setState({ todos })

    this.alert("Element deleted")
  }

  // generateId(){

  //   const lastTodoId = this.state.todos[this.state.todos.length -1];

  //  if(lastTodoId){
  //    return lastTodoId.id + 1;

  //  }
  //  return 1;

  // }

  async updateToDo() {

    const todo = this.state.todos[this.state.editIndex];
    todo.name = this.state.txtbox;


    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: this.state.txtbox
    })
    const todos = this.state.todos;
    todos[this.state.editIndex] = response.data;
    this.setState({
      todos,
      update: false,
      editIndex: null
    })
    this.alert("successfully updated")
  }

  async addToClick(event) {

    const todos = this.state.todos;


    const response = await axios.post(`${this.apiUrl}/todos`, {
      name: this.state.txtbox
    });
    console.log(response.data);
    todos.push(response.data);
    this.setState({
      todos
    });

    this.alert("successfully added ")
  }


  render() {
    return (
      <div className="container">

        {
          this.state.notification && <div className="alert alert-success mt-4">
            <p className="text-center">{this.state.notification}</p>
          </div>
        }

        <input id="addbox" className="form-control my-4"
          onChange={this.changeHandler}
          value={this.state.txtbox}
        />
        <button className="btn btn-dark form-control mb-4"
          onClick={this.state.update ? this.updateToDo : this.addToClick}
          disabled={this.state.txtbox.length < 3}
        >{(this.state.update) ? "Update To Do" : "Add To Do"}</button>

        {
          this.state.loading && 
          <img alt="loading-icon" src={gifloader} width="50px" height="50px" className="mx-auto"/>
        }


        {

          (!this.state.update || !this.state.loading )&&
          <ul className="list-group">
            {this.state.todos.map((item, index) => {
              return <ListItem key={item.id} item={item} editToDo={() => { this.editToDo(index) }}
                deleteTodo={() => { this.deleteTodo(index) }}
              />
            })}
          </ul>
        }

      </div>
    );
  }
}



export default App;
