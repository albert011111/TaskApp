import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { ContentComponent } from './content/content.component';
import { ItemComponent } from './item/item.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { DoneTaskComponent } from './done-task/done-task.component';
import { TaskService } from './tasks/service/tasks.service';
import { CheckedDirective } from './shared/checked.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransformTaskPipe } from './shared/transform-task.pipe';
import { SortPipePipe } from './shared/sort-pipe.pipe';
import { HttpClientModule } from '@angular/common/http';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ContentComponent,
    ItemComponent,
    AddTaskComponent,
    TodoTaskComponent,
    DoneTaskComponent,
    CheckedDirective,
    TransformTaskPipe,
    SortPipePipe,
    TasksListComponent,
    PageNotFoundComponent,
    TaskDetailComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule, FormsModule, NgbModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule
  ],
  providers: [TaskService]
})
export class AppModule { }
