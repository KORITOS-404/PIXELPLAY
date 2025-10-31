import { Component  , ChangeDetectionStrategy} from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  standalone:true,
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register {

}
