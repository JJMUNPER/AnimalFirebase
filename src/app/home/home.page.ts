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
  idAnimalSelec: string;

  arrayColeccionAnimales:any =[{
    id: "",
    data: {} as Animal
  }];

  //Constructor
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

  clicBotonBorrar() {

    this.firestoreService.borrar("animales", this.idAnimalSelec).then(() =>{
      //Actualiza la lista completa
      this.obtenerListaAnimales();
      //Limpiar datos de pantalla
      this.animalEditando = {} as Animal;
    })
  }

  clicBotonModificar(){
    this.firestoreService.actualizar("animales", this.idAnimalSelec, this.animalEditando).then(() =>{
      this.obtenerListaAnimales();
      this.animalEditando ={} as Animal;
    })
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

  selecAnimal(animalSelec){
    console.log("Animal seleccionado: ");
    console.log(animalSelec);
    this.idAnimalSelec = animalSelec.id;
    this.animalEditando.titulo=animalSelec.data.titulo;
    this.animalEditando.descripcion=animalSelec.data.descripcion;
  }

}
