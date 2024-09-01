import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  @Input() id!: string;
  private router = inject(Router);
  private storageService = inject(StorageService)

  logout() {
    this.storageService.removeStorageItem('authToken');
    this.router.navigate(['/dashboard']);
  }
}
