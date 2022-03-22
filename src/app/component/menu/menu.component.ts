import { Component, OnInit, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/service/login-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  

  constructor( private _loginService:LoginServiceService,
               private router:Router
              ) { }

  public estaLogeado = false;
  
  ngOnInit(): void {
    this.onCheckUser()
    
  }

  onCheckUser(){
    return this._loginService.isLogged()
  }

  
  

  logout(){
    this._loginService.logout()
    this.router.navigate(['/inicio'])
  }

}
