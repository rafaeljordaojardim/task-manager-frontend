import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth-guard.service'; // Adjust the path if needed

// ... other component imports ...

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard]  },
  { path: 'create', component: TaskCreateComponent, canActivate: [AuthGuard]  },
  { path: 'edit/:id', component: TaskEditComponent, canActivate: [AuthGuard]  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  // ... other routes ...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
