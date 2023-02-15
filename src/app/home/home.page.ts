import { Component } from '@angular/core';
import { Animal } from '../animal';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  animalEditando: Animal;

  arrayColeccionAnimales:any =[{
    id: "",
    data: {} as Animal
  }];


  constructor(private firestoreService: FirestoreService) {
    //Crea un animal vacio al empezar
    this.animalEditando = {} as Animal;
    this.obtenerListaAnimales();
  }

  clicBotonInsertar(){

    this.firestoreService.insertar("animales",this.animalEditando)
    .then(() => {
      console.log("Tarea creada correctamente");
      //
      this.animalEditando = {} as Animal;
    }, (error)=>{
      console.error(error);
    });

  }

  obtenerListaAnimales(){
    this.firestoreService.consultar("animales").subscribe((resultadoConsultaAnimales) =>{
      this.arrayColeccionAnimales=[];
      resultadoConsultaAnimales.forEach((datosAnimal:any) =>{
        this.arrayColeccionAnimales.push({
          id:datosAnimal.payload.doc.id,
          data:datosAnimal.payload.doc.data()
        });
      })
    });
  }

}
