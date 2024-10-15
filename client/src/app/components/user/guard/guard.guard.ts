import { UserService } from './../../../shared/services/user.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const guardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(UserService);
  const token = auth.getToken();
  const toastr = inject(ToastrService)

  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o JWT para obter o perfil

    // Verifica o perfil do usuário
    if (payload._profile_id === 3) {
      // Admin: Acesso total
      return true;
    } else if (payload._profile_id === 2) {
      // Coordenador: Acesso intermediário (verifique a rota permitida)
      if (route.data['roles'] && route.data['roles'].includes('coordenador')) {
        return true;
      } else {
        toastr.warning('Acesso não autorizado!');
        router.navigate(['/home']);
        return false;
      }
    } else if (payload._profile_id === 1) {
      // User: Acesso restrito (verifique a rota permitida)
      if (route.data['roles'] && route.data['roles'].includes('user')) {
        return true;
      } else {
        toastr.warning('Acesso não autorizado!');
        router.navigate(['/home']);
        return false;
      }
    } else if (payload._profile_id === 4) {
      // Coordenador: Acesso intermediário (verifique a rota permitida)
      if (route.data['roles'] && route.data['roles'].includes('secretario')) {
        return true;
      } else {
        toastr.warning('Acesso não autorizado!');
        router.navigate(['/home']);
        return false;
      }
    }else {
      // Perfil desconhecido
      router.navigate(['/login']);
      return false;
    }
  } else {
    // Se o token não existir, redireciona para a página de login
    router.navigate(['/login']);
    return false;
  }
};
