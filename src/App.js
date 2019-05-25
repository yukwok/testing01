import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem';

import axios from 'axios';



class App extends Component {

  //http(s)://5ce6b0380adb8e0014a6f316.mockapi.io/:endpoint


  constructor() {
    super();
    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: null,

      
      notification: "null",



      todos: []
    };

    this.apiUrl = 'https://5ce6b0380adb8e0014a6f316.mockapi.io';


   this.handleChange = this.handleChange.bind(this);
   this.addTodo = this.addTodo.bind(this);
   this.editTodo = this.editTodo.bind(this);
   this.updateTodo = this.updateTodo.bind(this); 
   this.deleteTodo = this.deleteTodo.bind(this);
   this.alert = this.alert.bind(this);

   




  }  

  async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}/todos`);
    this.setState({
      todos: response.data
    });

    console.log("in component did mount");
    console.log(response);
    this.alert(" Data loaded");
  }


  // async componentWillMount() {
  //   const response = await axios.get(`${this.apiUrl}/todos`);
  //   this.setState({
  //     todos: response.data
  //   });

  //   //  console.log("in component will mount");
  //   //  console.log(response);
  // }


  handleChange(event){
     this.setState({
      newTodo: event.target.value
     });  

   
  };

  generateTodoId(){
    const lastTodo = this.state.todos[this.state.todos.length - 1];
    if (lastTodo) {
      return lastTodo.id + 1;
    }

    return 1;

  };

  alert(notification) {
    this.setState({
      notification
    });

    setTimeout(() => {
      this.setState({
        notification: null
      });
    }, 2000);
  }


  updateTodo(){




    const todo = this.state.todos[this.state.editingIndex];

    todo.name = this.state.newTodo;

    const todos = this.state.todos;
    todos[this.state.editingIndex] = todo;
    
    this.setState({
      todos,
      editing: false,
      editingIndex: null,
      newTodo: ''
    });

  };

  
  editTodo(index) {
    const todo = this.state.todos[index];
    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    });
  }

  async addTodo(){

    const response = await axios.post(`${this.apiUrl}/todos`, {
      name: this.state.newTodo
    });

    console.log(response);


    const todos = this.state.todos;
    todos.push(response.data);

    this.setState({
      todos: todos,
      newTodo: ''
    });
    this.alert('Todo added successfully.');

  };

  async deleteTodo(index){

    const todos = this.state.todos;

    const todo = todos[index];

    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);

    
     delete todos[index];
 
    this.setState({
      todos: todos
    });
    this.alert("Item deleted"); 


  }
  

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>Welcome to React</h3>
        </div>
        <div className="container">

        {
            this.state.notification &&
            <div className="alert mt-3 alert-success">
              <p className="text-center">{this.state.notification}</p>
            </div>
          }

          <input
            type="text"
            name="todo"
            className="my-4 form-control"
            placeholder="Add a new todo"
            onChange={this.handleChange}
            value={this.state.newTodo}
            


          ></input>
          <button
                onClick={this.state.editing ? this.updateTodo : this.addTodo}
                className="btn-info mb-3 form-control"
                disabled={this.state.newTodo.length < 3}
          >
                {this.state.editing ? 'Update todo' : 'Add todo'}
          </button>

          {

            !this.state.editing &&
            <ul className="list-group">
            {this.state.todos.map((item, index) => {
              return <ListItem 
                       key={index}
                       item={item} 
                       text={"some text"}
                       text1={"text1"}

                       editTodo={() => { this.editTodo(index); }}
                       deleteTodo={() => { this.deleteTodo(index); }}
                
                     
                     />;
            })}
          </ul>


          }
        
        </div>  
    </div>
    );
  }
}

export default App;
