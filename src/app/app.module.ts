import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Router module
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { CuerpoComponent } from './component/cuerpo/cuerpo.component';
import { MenuComponent } from './component/menu/menu.component';
import { LoginComponent } from './component/login/login.component';
import { TopicComponent } from './component/topic/topic.component';
import { InicioComponent } from './component/inicio/inicio.component';


//Services
import { TopicServiceService } from './service/topic-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { JWTInterceptorInterceptor } from './interceptors/jwtinterceptor.interceptor';
import { RegistrarComponent } from './component/registrar/registrar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { MatSnackBarModule } from '@angular/material/snack-bar'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    AppComponent,
    CuerpoComponent,
    MenuComponent,
    LoginComponent,
    TopicComponent,
    InicioComponent,
    RegistrarComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
    
  ],
  providers: 
  [TopicServiceService,
   CookieService,
     {
       provide:HTTP_INTERCEPTORS,
       useClass:JWTInterceptorInterceptor,
       multi:true //permite agregar mas de uno
     }
  ],
  bootstrap: [CuerpoComponent]
})
export class AppModule { }
