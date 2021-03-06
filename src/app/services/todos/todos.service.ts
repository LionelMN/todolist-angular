import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todos } from '../../models/models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  msg : string
  constructor(private http: HttpClient) { }

    public getAllTodosOfUser(user) : Observable<Todos[]>{
      return this.http.get(`${environment.backUrl}/todos/user/${user}`) as Observable<Todos[]>
    }

    public createTodo(todo: Todos) : Observable<any>{
      return this.http.post(`${environment.backUrl}/todos/`, todo).pipe(tap(
        (res) => {
          if (res) {
          this.msg = res;
          }
        })
      );
    }

    public editTodo(todo : Todos) : Observable<any>{
      return this.http.put(`${environment.backUrl}/todos/${todo._id}`, todo).pipe(tap(
        res => {
          if (res){
            this.msg = res;
          }
        }
      ))
    }

    public deleteTodo(todoId) : Observable<any>{
      return this.http.delete(`${environment.backUrl}/todos/${todoId}`) as Observable<any>
    }

}
