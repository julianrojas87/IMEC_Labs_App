import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { Task1Component } from './components/task1/t1/t1.component';
import { T1DocComponent } from './components/task1/t1.documentation/t1.documentation.component';
import { Task2Component } from './components/task2/t2/t2.component';
import { T2DocComponent } from './components/task2/t2.documentation/t2.documentation.component';
import { Task3Component } from './components/task3/t3/t3.component';
import { T3DocComponent } from './components/task3/t3.documentation/t3.documentation.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'task1', component: Task1Component },
  { path: 't1-doc', component: T1DocComponent },
  { path: 'task2', component: Task2Component },
  { path: 't2-doc', component: T2DocComponent },
  { path: 'task3', component: Task3Component },
  { path: 't3-doc', component: T3DocComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports:      [ BrowserModule, RouterModule.forRoot(appRoutes), FormsModule, HttpModule ],
  declarations: [ AppComponent, HomeComponent, MenuComponent, Task1Component, 
    T1DocComponent, Task2Component, T2DocComponent, Task3Component, T3DocComponent],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
