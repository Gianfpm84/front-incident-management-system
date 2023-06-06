import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css'],
})
export class ViewRequestComponent implements OnInit {
  request: any = [];

  constructor(private requestService: RequestService) {
    this.requestService.listQuestionnaires().subscribe(
      (dato: any) => {
        this.request = dato;
        console.log(this.request);
      },
      (error) => {
        console.log(error);
        Swal.fire(
          '¡¡¡Error!!!',
          'Ha ocurrido un error al cargar the Requests.',
          'error'
        );
      }
    );
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
