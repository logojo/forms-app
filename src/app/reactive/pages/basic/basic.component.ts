import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-basic',
  imports: [ JsonPipe ],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.css'
})
export class BasicComponent {

}
