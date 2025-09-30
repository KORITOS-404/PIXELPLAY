import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css'
  ,imports: [CommonModule]
})
export class Home {
  juegos = [
    {
      titulo: 'The Evil Within',
      precio: 150,
      imagen: '/evilwithin.jpg'
    },
    {
      titulo: 'Persona 5',
      precio: 100,
      imagen: '/persona5.jpg'
    }
  ];
}
