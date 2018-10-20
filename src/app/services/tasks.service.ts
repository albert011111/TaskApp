import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Task } from '../models/task';
import { HttpClient, HttpParams } from '@angular/common/http';
import { registerContentQuery } from '@angular/core/src/render3/instructions';




@Injectable()
export class TaskService {
  // pole w komponencie
  private tasksParent: Array<Task> = [];
  private tasksDone: Array<Task> = [];
  private baseUrl = 'http://localhost:8080/api/tasks';

  private tasksDatabase: Array<Task> = [];

  // elementy ktore udostepniaja - automatycznie aktualizuja listy w child-componentach,
  // te obiekty MUSZA byc inicjowane chocaizby pusta tablica - moga tez juz wypelniona
  tasksObservable = new BehaviorSubject<Array<Task>>([]);
  tasksDoneObservable = new BehaviorSubject<Array<Task>>([]);




  constructor(private http: HttpClient) {
    // this.tasksParent = [
    //   { name: 'Spacer z piesem', dateOfCreation: new Date() },
    //   { name: 'Nauka Angulara', dateOfCreation: new Date() },
    //   { name: 'Bieganie', dateOfCreation: new Date() },
    //   { name: 'Sprzatanie chalpy', dateOfCreation: new Date() }
    // ];

    // terhelpa, zeby miec juz cos w tasksDoneObservable, przypisze to co mam w tablicy powyzej
    // next(arg) -> dodanie do tasksDoneObservable
    this.tasksObservable.next(this.tasksParent);
  }





  public add(task: Task) {
    this.tasksParent.push(task);

    // zeby dodać zadanie
    // w argumencie next() musimy podac Array[]...
    // dlatego najpierw do listy globalnej tasksParent pushujemy 1 element a cala liste wrzucamy do next()
    // i teraz calosc Observable EMITUJEMY do innych komponentow
    // POJEBANE TO Z LEKKA
    this.tasksObservable.next(this.tasksParent);
    console.log(this.tasksParent);
  }

  public remove(task) {

    // usuwa element poprzez filtrowanie listy...
    this.tasksParent = this.tasksParent.filter(t => t !== task);
    this.tasksObservable.next(this.tasksParent);
  }

  public complete(task) {
    // dodaje task do listyTaskow wykonanych
    this.tasksDone.push(task);
    this.tasksDoneObservable.next(this.tasksDone);
    console.log(this.tasksDone);

    // usuwam wykonany task z listy do wykonania
    this.remove(task);
  }

  // teraz cos na zasadzie GETTEROW do list observable
  getTasksParentObservable(): Observable<Array<Task>> {
    // asObservable() oznacza ze mozna bedzie dynamicznie obserwowac zmianyt zawartosci tej lsity
    return this.tasksObservable.asObservable();
  }

  getTasksDoneObservable(): Observable<Array<Task>> {
    return this.tasksDoneObservable.asObservable();
  }


  // tera moja tworczosc
  getTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(this.baseUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.baseUrl, task);
  }

  deleteTask(taskId: number): Observable<Task> {
    // const taskParam = new HttpParams().set('taskId', taskId + '');
    // console.log(this.baseUrl + '/' + taskParam);
    return this.http.delete<Task>(this.baseUrl + '/' + taskId);
  }

}
