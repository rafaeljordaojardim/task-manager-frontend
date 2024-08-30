export interface Task {
    id?: string;
    title: string;
    description: string;
    status: string;
    user_id?: string;
    dueDate: Date | null;
  }