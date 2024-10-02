import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsEnabled = true; // Start with notifications enabled

  constructor(private toastr: ToastrService) { }
  
  areNotificationsEnabled(): boolean {
    return this.notificationsEnabled;
  }

  toggleNotifications() {
    this.notificationsEnabled = !this.notificationsEnabled;
    this.saveNotificationPreference(); // Save the preference
  }

  private saveNotificationPreference(): void {
    localStorage.setItem('notificationsEnabled', JSON.stringify(this.notificationsEnabled));
  }

  loadNotificationPreference(): void {
    const storedPreference = localStorage.getItem('notificationsEnabled');
    this.notificationsEnabled = storedPreference ? JSON.parse(storedPreference) : true;
  }

  showSuccess(message: string, title?: string) {
    this.toastr.success(message, title);
  }

  showError(message: string, title?: string) {
    this.toastr.error(message, title);
  }

  showInfo(message: string, title?: string) {
    this.toastr.info(message, title);
  }

  showWarning(message: string, title?: string) {
    this.toastr.warning(message, title);
  }
}
