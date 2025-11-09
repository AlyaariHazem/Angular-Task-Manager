import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { Task } from '@app/models';
import { TaskStatus } from '@app/enums';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly _tasks$ = new BehaviorSubject<Task[]>([
    {
      id: 1,
      title: 'Read assignment',
      description: 'Review Tabweeb task requirements.',
      status: TaskStatus.Pending
    }
  ]);

  private nextId = 2;

  readonly tasks$ = this._tasks$.asObservable().pipe(distinctUntilChanged());

  getTasksByStatus(status?: TaskStatus | 'All'): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => {
        if (!status || status === 'All') return tasks;
        return tasks.filter(t => t.status === status);
      })
    );
  }

  addTask(title: string, description: string, status: TaskStatus): void {
    const newTask: Task = {
      id: this.nextId++,
      title: title.trim(),
      description: description.trim(),
      status
    };

    this._tasks$.next([...this._tasks$.value, newTask]);
  }

  updateTask(updated: Task): void {
    const tasks = this._tasks$.value.map(t =>
      t.id === updated.id ? { ...t, ...updated } : t
    );
    this._tasks$.next(tasks);
  }

  updateTaskStatus(id: number, status: TaskStatus): void {
    const tasks = this._tasks$.value.map(t =>
      t.id === id ? { ...t, status } : t
    );
    this._tasks$.next(tasks);
  }

  deleteTask(id: number): void {
    const tasks = this._tasks$.value.filter(t => t.id !== id);
    this._tasks$.next(tasks);
  }
}
