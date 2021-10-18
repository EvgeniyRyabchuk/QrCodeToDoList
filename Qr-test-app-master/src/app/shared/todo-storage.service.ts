import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IToDo} from "./interface";

@Injectable({
  providedIn: 'root'
})
export class TodoStorageService {

  public selectedToDoItem: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public $selectedToDoItem = this.selectedToDoItem.asObservable();

  public toDoList: BehaviorSubject<IToDo[]> = new BehaviorSubject<IToDo[]>([]);
  public $toDoList = this.toDoList.asObservable();


  constructor() { }

  public save(data: IToDo[]): void
  {
    localStorage.setItem('todolist', JSON.stringify(data));
    this.toDoList.next(data);
  }


}
