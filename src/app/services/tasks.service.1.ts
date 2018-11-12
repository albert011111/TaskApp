import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Task } from '../tasks/model/task.model';





@Injectable()
export class TaskService {
  // pole w komponencie
  private tasksParent: Array<Task> = [];
  private tasksDone: Array<Task> = [];


  // elementy ktore udostepniaja - automatycznie aktualizuja listy w child-componentach,
  // te obiekty MUSZA byc inicjowane chocaizby pusta tablica - moga tez juz wypelniona
  tasksParentObservable = new BehaviorSubject<Array<Task>>([]);
  tasksDoneObservable = new BehaviorSubject<Array<Task>>([]);



  constructor() {
    this.tasksParent = [
      { name: 'Spacer z piesem', createDate: new Date() },
      { name: 'Nauka Angulara', createDate: new Date() },
      { name: 'Bieganie', createDate: new Date() },
      { name: 'Sprzatanie chalpy', createDate: new Date() }
    ];

    // tera, zeby miec juz cos w tasksDoneObservable, przypisze to co mam w tablicy powyzej
    // next(arg) -> dodanie do tasksDoneObservable
    this.tasksParentObservable.next(this.tasksParent);
  }


  public add(task: Task) {
    this.tasksParent.push(task);

    // zeby dodać zadanie
    // w argumencie next() musimy podac Array[]...
    // dlatego najpierw do listy globalnej tasksParent pushujemy 1 element a cala liste wrzucamy do next()
    // i teraz calosc Observable EMITUJEMY do innych komponentow
    // POJEBANE TO Z LEKKA
    this.tasksParentObservable.next(this.tasksParent);
    console.log(this.tasksParent);
  }

  public remove(task) {

    // usuwa element poprzez filtrowanie listy...
    this.tasksParent = this.tasksParent.filter(t => t !== task);
    this.tasksParentObservable.next(this.tasksParent);
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
    return this.tasksParentObservable.asObservable();
  }

  getTasksDoneObservable(): Observable<Array<Task>> {
    return this.tasksDoneObservable.asObservable();
  }
}
