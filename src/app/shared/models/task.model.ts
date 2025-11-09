import { TaskStatus } from "@app/enums";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
