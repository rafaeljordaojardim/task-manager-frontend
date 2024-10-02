import { Component } from '@angular/core';
import { NotificationService } from '../notification-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  notificationsEnabled: boolean = false;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationsEnabled = this.notificationService.areNotificationsEnabled();
    this.notificationService.loadNotificationPreference();
  }

  toggleNotifications() {
    console.log("call");
    
    this.notificationService.toggleNotifications();
    this.notificationsEnabled = this.notificationService.areNotificationsEnabled();
  }
}
