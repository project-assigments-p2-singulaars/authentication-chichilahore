import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom} from 'rxjs';
import { UserProfile } from '../shared/models/user-profile';
import { environment } from '../../environments/environment.development';
import { StorageService } from '../shared/services/storage.service';
import { Router } from '@angular/router';

type LoginResponseType = {
  accessToken: string;
  user: UserProfile;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private router = inject(Router);

  register(formGroup: any) {
    return this.http.post<any>(`${this.apiUrl}/sign-up`, formGroup);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/dashboard']);
  }

  async login(credentials: UserProfile) {
    try {
      const result = await firstValueFrom(
        this.http.post<LoginResponseType>(
          `${this.apiUrl}/sign-in`,
          credentials
        )
      );

      const { user } = result;
      this.storageService.setStorageItem('user', JSON.stringify(user));
    } catch (e) {
      throw e;
    }
  }
}
