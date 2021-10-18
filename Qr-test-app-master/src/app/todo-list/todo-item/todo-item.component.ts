import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ModalComponent} from "../../shared/modal/modal.component";
import {TodoListService} from "../todo-list.service";
import {MatDialog} from "@angular/material/dialog";
import {NotifierService} from "angular-notifier";
import {TodoStorageService} from "../../shared/todo-storage.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  public isSelect = false;

  form: FormGroup;
  private readonly notifier: NotifierService;

  @Input() id: number;
  @Input() text: string;
  @Input() isCheck: boolean;


  constructor(fb: FormBuilder, private toDoListService: TodoListService, public dialog: MatDialog,
              private notifierService: NotifierService, private toDoStorageService: TodoStorageService) {
    this.notifier = notifierService;
    this.form = fb.group({
      isCheck: false,
    });



  }

  ngOnInit(): void {
    this.toDoStorageService.selectedToDoItem.subscribe((res: any) =>
    {
      if(res.id == this.id)
      {
        this.isSelect = true;
        this.notifier.notify('success', `You select do to item with id = ${res.id}`);
        localStorage.setItem('selectedId', res.id);
      }
      else {
        this.isSelect = false;
      }
    })

    if(parseInt(localStorage.getItem('selectedId') || '') == this.id)
    {
      this.isSelect = true;
    }

  }


  checked(): void {
    this.toDoListService.editItem(this.id,
      {text: this.text, isCheck: this.isCheck})
  }


  show(): void {
    console.log(this.isCheck);
  }

// public deleteWorkerItem(id: number): void {
  //   this.dashboardService.removeItem(id, 'worker').subscribe(res => {
  //     this.dataSource = res;
  //   })
  // }

  public openDialog(method: 'edit' | 'add'): void {

    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        method: method,
        initialValue:
          {
            text: this.text
            // isCheck: dataToEdit == undefined ? undefined : dataToEdit.isCheck,
          },
        initialTypes: {text: 'text'},
        itemId: this.id,
        isCheck: this.isCheck
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let newItem = this.toDoListService.getItem(this.id);
      this.text = newItem.text;
      // this.isCheck = newItem.text;
    });
  }


}
