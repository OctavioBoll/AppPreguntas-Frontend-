import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RegistrerServiceService } from 'src/app/service/registrer-service.service';
import { MatSnackBar } from '@angular/material/snack-bar'



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  registrarForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required ,Validators.email]),
    pass: new FormControl('',Validators.required)
  })

  errorMessage = ""
  loading=false
  

  constructor(
      private _registrerService: RegistrerServiceService,
      private _cookieService:CookieService,
      private router:Router,
      private _snackBar:MatSnackBar

  ) { }

  ngOnInit(): void {
  }

  btnRegistrar(){
    this.loading = true
    this._registrerService.registrer(this.registrarForm.value).subscribe(data => {
      
      const token = data['token']
      this._cookieService.set('x-access-token',token)
      this.router.navigate(['/topic'])
    },
    error => {
      
      if(error == undefined){
        error = "Servidor no encontrado"
      }
      
      this._snackBar.open("Error al registrarse: " + error  ,null,{
                duration:5000,
                horizontalPosition:'center',
                verticalPosition:'top',
                panelClass: "red-snack-bar"
              })
      this.loading = false;
    } ) 
    //this.errorMessage = error)
  }

}
