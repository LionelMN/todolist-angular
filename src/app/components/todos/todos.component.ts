import { Component, Inject, OnInit } from '@angular/core';
import { Todos, Users } from '../../models/models';
import { TodosService } from '../../services/todos/todos.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos : Todos[] = []
  constructor(
    private todosService : TodosService,
    @Inject(DOCUMENT) private document: Document
    ) { }

  getTodosOfUser(user : string){
    this.todosService.getAllTodosOfUser(user).subscribe( gotTodos => {
      this.todos = gotTodos
      for (let todo of this.todos){
        if (todo.completed === false){
          todo.state = "Incompleted"
        } else todo.state = "Completed"
        todo.date = new Date(todo.createAt*1).toLocaleString()
      }
    })
  }

  changeState(todo : Todos){
    todo.completed = !todo.completed
    if (todo.completed){
      todo.state = "Completed"
    } else todo.state = "Incompleted"

    this.todosService.editTodo(todo).subscribe()
  }

  deleteTodo(todoId :string) {
    this.todosService.deleteTodo(todoId).subscribe( () => {
      this.document.location.reload()
    });
  }

  ngOnInit(): void {
    this.getTodosOfUser(JSON.parse(localStorage.getItem("user")))
  }

}
