import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() {}

  async getUserById(id: string) {
    const result = await firstValueFrom(
      this.http.get<UserProfile>(`${this.url}/users/${id}`)
    );

    const user = {
      email: result.email,
      id: result.id,
    };
    return user;
  }
}
