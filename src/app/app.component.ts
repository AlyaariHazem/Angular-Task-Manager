import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeService } from './shared/services/theme.service';
import { TaskListComponent } from './features/task-list/task-list.component';
import { AddTaskComponent } from './features/add-task/add-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskListComponent, AddTaskComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  theme$ = this.themeService.theme$;
  isAddTaskOpen = false;

  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  openAddTask(): void {
    this.isAddTaskOpen = true;
  }

  closeAddTask(): void {
    this.isAddTaskOpen = false;
  }
}
