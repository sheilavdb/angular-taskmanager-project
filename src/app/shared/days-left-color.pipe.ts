import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysLeftColor',
  standalone: true,
})
export class DaysLeftColorPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): {
    [key: string]: string;
  } {
    if (!value) return { color: 'gray' };

    const today = new Date();
    const deadline = new Date(value);

    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    const difference = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (difference > 3) return { color: 'green' };
    if (difference >= 1 && difference <= 3) return { color: 'orange' };
    if (difference === 0) return { color: 'red' };
    return { color: 'red', 'font-weight': 'bold' };
  }
}
