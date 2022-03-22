import { Component, OnInit,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChange(changes: SimpleChanges){
    console.log(changes)
  }

}
