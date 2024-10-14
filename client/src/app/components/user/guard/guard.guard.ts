import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';

export const guardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const auth = inject(UserService)
  const localData = localStorage.getItem('access_token');
  if(localData != null){
    return true;
  } else {
    router.navigateByUrl('/login')
    return false;
  }
};
