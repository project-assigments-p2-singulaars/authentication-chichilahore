import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  const token = storageService.getStorageItem('authToken');

  if (!token) {
    return router.createUrlTree(['/sign-in']);
  }

  return true;
};
