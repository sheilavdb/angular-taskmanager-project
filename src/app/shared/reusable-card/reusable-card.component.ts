import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reusable-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reusable-card.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class ReusableCardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
}
