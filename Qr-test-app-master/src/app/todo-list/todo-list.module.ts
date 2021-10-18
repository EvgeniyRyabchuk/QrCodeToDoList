import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodoListRoutingModule} from "./todo-list-routing.module";
import {TodoListComponent} from "./todo-list.component";
import {NgQrScannerModule} from "angular2-qrscanner";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {MatButtonModule} from "@angular/material/button";
import {QRCodeModule} from "angularx-qrcode";
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {ModalModule} from "../shared/modal/modal.module";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [TodoListComponent, TodoItemComponent],
  imports: [
    CommonModule,
    TodoListRoutingModule,
    NgQrScannerModule,
    ZXingScannerModule,
    MatButtonModule,
    QRCodeModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ModalModule,
    MatIconModule
  ]
})
export class TodoListModule { }
