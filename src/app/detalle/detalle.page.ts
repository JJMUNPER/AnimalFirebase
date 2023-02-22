import { Component, OnInit } from '@angular/core';
import { Animal } from '../animal';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  idAnimal: string= "";
  document: any ={
    id: "",
    data: {} as Animal
  };

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {

    this.firestoreService.consultarPorId("animales", this.idAnimal).subscribe((resultado) => {
      if (resultado.payload.data() != null){
        this.document.id = resultado.payload.id
        this.document.data = resultado.payload.data();
        console.log(this.document.data.titulo);
      } else {
        this.document.data = {} as Animal;
      }
    });
  }

  

}
