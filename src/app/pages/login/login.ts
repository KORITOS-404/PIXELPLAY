import { Component , ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  standalone:true,
  selector: 'app-login',
  imports: [RouterLink,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css' ,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {

}
