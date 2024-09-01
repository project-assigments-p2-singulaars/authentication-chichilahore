import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { UserProfile } from '../shared/models/user-profile';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private storageService = inject(StorageService);
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async submit() {
    const user: UserProfile = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };
    try {
      await this.authService.login(user);
      const { id } = this.storageService.getStorageItem('user') as UserProfile;
      this.router.navigate([`/user-profile/${id}`]);
    } catch (error) {
      alert('Ops! something went wrong');
    }
  }
}
