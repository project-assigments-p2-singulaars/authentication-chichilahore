import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { StorageService } from '../shared/services/storage.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && event.body.accessToken) {
        const storageService = inject(StorageService);
        storageService.setStorageItem('authToken', event.body.accessToken);
      }
      return event;
    })
  );
};
