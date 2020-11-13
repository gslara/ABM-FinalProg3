import { PersonaService } from './../../services/persona.service';
import { Persona } from './../../models/persona';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  personas: Persona[] = [];

  constructor(private service: PersonaService, private router: Router) { }

  //Método que se ejecuta cuando se inicia el componente ------------------
  ngOnInit(): void {
    this.getAll();
  }

  //Método para obtener todas las personas --------------------------------
  getAll(): void {
    this.service.getAll().subscribe(data => {
      this.personas = data;
      console.log(this.personas); //mostramos el arreglo de personas
    });
  }

  //Método para agregar una nueva persona ---------------------------------
  add(id: number): void {
    this.router.navigate(['personas/' + id]); //redireccionamos al formulario
  }

  //Método para actualizar una persona ------------------------------------
  update(id: number): void {
    this.router.navigate(['personas/' + id]); //redireccionamos al formulario
  }

  //Método para eliminar una persona --------------------------------------
  delete(id: number): void {
    const opcion = confirm('¿Estás segura que deseas eliminar esta persona?');

    if (opcion === true){ //si el usuario confirma, se elimina el registro
      this.service.delete(id).subscribe(data => {
        console.log(data);
        alert('Registro eliminado');
        location.reload(); //recargamos la tabla
      });
    }
  }

}
