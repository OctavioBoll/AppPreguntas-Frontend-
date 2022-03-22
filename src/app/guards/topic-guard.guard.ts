import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicGuardGuard implements CanActivate {
  
  constructor(
    private cookieService: CookieService,
    private router:Router
    ){}
  
  redirect(flag:boolean):any{
    if(!flag){
      this.router.navigate(['/','login'])
    }
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie = this.cookieService.check('x-access-token')
    this.redirect(cookie)
    return cookie     
    
  }
  
}
