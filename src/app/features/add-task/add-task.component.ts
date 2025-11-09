import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TaskService } from 'app/shared/services/task.service';
import { TaskStatus } from '@app/enums';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  @Output() taskAdded = new EventEmitter<void>();

  TaskStatus = TaskStatus;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(500)]],
    status: [TaskStatus.Pending, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, description, status } = this.form.value;

    this.taskService.addTask(
      title ?? '',
      description ?? '',
      status as TaskStatus
    );

    this.form.reset({
      title: '',
      description: '',
      status: TaskStatus.Pending
    });

    this.taskAdded.emit();
  }
}
