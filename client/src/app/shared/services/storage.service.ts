import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  
  getStorageItem(key: string) {
    const value = localStorage.getItem(key);
    if (value !== null) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value; 
      }
    }
    return null; 
  }

  setStorageItem(key: string, value: any) {
    if (value !== undefined && value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  removeStorageItem(key: string) {
    localStorage.removeItem(key);
  }

  clearAllStorage() {
    localStorage.clear();
  }
}