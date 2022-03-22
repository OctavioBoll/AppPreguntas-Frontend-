import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { MatSnackBar} from '@angular/material/snack-bar'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm =  new FormGroup({
    name: new FormControl(''), 
    email: new FormControl('',[Validators.required, Validators.email]),
    pass: new FormControl('',Validators.required)
  })

  loading=false
  errorMessage = ""


  constructor(private _loginService:LoginServiceService, 
              private _cookieService:CookieService,
              private router:Router,
              private _snackBar:MatSnackBar
              ) { }

  ngOnInit(): void {
  }

  btnLogin(){
    this.loading = true
    this._loginService.login(this.loginForm.value).subscribe(
      data => {
                const token = data['token']
                this._cookieService.set('x-access-token',token)
                this.router.navigate(['/topic'])
              },
      error =>{
        if(error == undefined){
          error = "Servidor no encontrado"
        }

                this._snackBar.open("Error al Logearse: " + error,null,{
                          duration:5000,
                          horizontalPosition:'center',
                          verticalPosition:'top',
                          panelClass: "red-snack-bar"
                        })
                this.loading = false;
              } 
    //this.errorMessage = error
            )
  }

}
