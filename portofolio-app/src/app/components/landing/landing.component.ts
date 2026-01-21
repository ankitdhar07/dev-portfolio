import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TerminalComponent } from '../terminal/terminal.component';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterLink, TerminalComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  readonly name: string = 'Ankit Kumar';
  readonly title = 'Senior Software Engineer';
}
