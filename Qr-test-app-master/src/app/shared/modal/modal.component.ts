import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
//import {DashboardService} from "../../../dashboard/dashboard.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "angular-notifier";
import {TodoListService} from "../../todo-list/todo-list.service";
import {IToDo} from "../interface";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  // = this.fb.group({
  //   name: ['', Validators.required],
  //   count: ['', Validators.required],
  //   provider: ['', Validators.required]
  // });
  // private dashboardService: DashboardService
  public addStorageForm:any;
  public formGroupList:any = { };

  public visibleCol:any = [];
  public initialTypes:any = [];

  public itemId: number = 0;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private notifierService: NotifierService,
              private toDoListService: TodoListService
              ) {
  }

  ngOnInit(): void {
    if (this.data.method === 'edit') {
      this.itemId = this.data.itemId;
    }

    for(let i in this.data.initialValue)
    {
      this.formGroupList[`${i}`] = [this.data.initialValue[i], Validators.required];
      this.visibleCol.push( { 'key': i, 'value': this.data.initialValue[i], 'type': this.data.initialTypes[i] });
    }

    this.addStorageForm = this.fb.group(this.formGroupList);
  }

  public storageModalAction(method: string): void {
    if (method === 'add') {
      let item: IToDo = { id: 1, text: this.addStorageForm.value.text, isCheck: false }
      this.toDoListService.addItem(item);
      this.notifierService.notify('success', 'Добавлено успешно!')
      this.dialogRef.close();

    } else {
      this.toDoListService.editItem(this.itemId,
        {text: this.addStorageForm.value.text, isCheck: this.data.isCheck});
      this.notifierService.notify('success', 'Успешно отредактировано!')
      this.dialogRef.close();
    }
  }

}
