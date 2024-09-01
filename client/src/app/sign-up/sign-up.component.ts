import { Component, inject } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  authService = inject(AuthService);
  router = inject(Router);
  private storageService = inject(StorageService)

  registrationForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  registerUser() {
    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value).subscribe((response) => {
        if (response.accessToken) {
          this.storageService.setStorageItem('authToken', response.accessToken);
          this.router.navigate(['/sign-in']);
        }
      });
    }
  }
}
