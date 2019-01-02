import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {NavComponent} from './nav/nav.component';
import {ContentComponent} from './content/content.component';
import {ItemComponent} from './item/item.component';
import {TodoTaskComponent} from './todo-task/todo-task.component';
import {DoneTaskComponent} from './done-task/done-task.component';
import {TaskService} from './tasks/service/tasks.service';
import {CheckedDirective} from './shared/checked.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TransformTaskPipe} from './shared/transform-task.pipe';
import {SortPipePipe} from './shared/sort-pipe.pipe';
import {HttpClientModule} from '@angular/common/http';

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {TaskDetailComponent} from './tasks/task-detail/task-detail.component';
import {TasksListComponent} from './tasks/tasks-list/tasks-list.component';
import {TaskModule} from './tasks/task.module';
import {TaskRoutingModule} from './tasks/task-routing.module';
import {NewTaskComponent} from "./tasks/new-task/new-task.component";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './auth/home/home.component';
import { UserComponent } from './auth/user/user.component';
import { AdminComponent } from './auth/admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ContentComponent,
    ItemComponent,
    TodoTaskComponent,
    DoneTaskComponent,
    CheckedDirective,
    TransformTaskPipe,
    SortPipePipe,
    TasksListComponent,
    PageNotFoundComponent,
    TaskDetailComponent,
    NewTaskComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserComponent,
    AdminComponent,

  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule, FormsModule, NgbModule, HttpClientModule, TaskModule, TaskRoutingModule, AppRoutingModule, ReactiveFormsModule
  ],
  providers: [TaskService]
})
export class AppModule {
}
