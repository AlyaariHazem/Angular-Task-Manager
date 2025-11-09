import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TaskService } from 'app/shared/services/task.service';
import { TaskStatus } from '@app/enums';
import { Task } from '@app/models';

type FilterOption = 'All' | TaskStatus;

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnDestroy {
  TaskStatus = TaskStatus;

  tasks: Task[] = [];
  filter: FilterOption = 'All';
  private sub?: Subscription;

  editingTaskId: number | null = null;
  editModel = { title: '', description: '', status: TaskStatus.Pending };

  constructor(private taskService: TaskService) {
    this.subscribeToTasks();
  }

  private subscribeToTasks(): void {
    this.sub = this.taskService
      .getTasksByStatus(this.filter)
      .subscribe(tasks => (this.tasks = tasks));
  }

  onFilterChange(filter: FilterOption): void {
    this.filter = filter;
    this.sub?.unsubscribe();
    this.subscribeToTasks();
  }

  startEdit(task: Task): void {
    this.editingTaskId = task.id;
    this.editModel = {
      title: task.title,
      description: task.description,
      status: task.status
    };
  }

  cancelEdit(): void {
    this.editingTaskId = null;
  }

  saveEdit(task: Task): void {
    if (!this.editModel.title.trim()) {
      alert('Title is required.');
      return;
    }

    const updated: Task = {
      ...task,
      ...this.editModel
    };

    this.taskService.updateTask(updated);
    this.editingTaskId = null;
  }

  delete(task: Task): void {
    if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
      this.taskService.deleteTask(task.id);
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
