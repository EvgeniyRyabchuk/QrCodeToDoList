import { Injectable } from '@angular/core';
import {IToDo} from "../shared/interface";
import {TodoStorageService} from "../shared/todo-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  public todolist:IToDo[];
  //public domain = 'https://41ce-192-162-140-52.ngrok.io';
  constructor(private toDoStorageService: TodoStorageService) {
  }

  public getItems(): IToDo[] {
    this.todolist = JSON.parse(localStorage.getItem('todolist') || "[]");
    this.toDoStorageService.save(this.todolist);

    if(this.todolist.length == 0)
    {
      console.log('sdfhsfh');
    }
    return this.todolist; //this.http.get<any[]>(`${this.domain}/${urlFor}`);
  }

  public getItem(id: number): IToDo
  {
    for (let i of this.todolist)
    {
      if(i.id == id)
      {
        return i;
      }
    }
    return null;
  }

  public changeItem(newItem: IToDo)
  {
    for (let i in this.todolist)
    {
      if(this.todolist[i].id == newItem.id)
      {
        this.todolist[i] = newItem;
      }
    }
    this.toDoStorageService.save(this.todolist);
  }

  public addItem(item: IToDo)
  {
    if(localStorage.getItem('increaseId') == '')
    {
      localStorage.setItem('increaseId', '1');
    }
    else
    {
      let newId = parseInt(localStorage.getItem('increaseId') || '0') + 1;
      item.id = newId;
      localStorage.setItem('increaseId', JSON.stringify(newId));
    }
    this.todolist.push(item);
    this.toDoStorageService.save(this.todolist);
  }

  // public saveItems(todolist: IToDo[]) {
  //   console.log(todolist)
  //   return localStorage.setItem('todolist', JSON.stringify(todolist));
  // }

  public editItem(id: number, attr: any) {

    let todoitem =
    {
      id: id,
      text: attr.text,
      isCheck: attr.isCheck
    }
    this.changeItem(todoitem);
  }

  public removeItem(id: number) {
    let item = this.getItem(id);
    this.todolist.slice(this.todolist.indexOf(item), 1);
    this.toDoStorageService.save(this.todolist);
  }
  //console.log(localStorage.getItem('todolist'));
  // localStorage.clear();
}
