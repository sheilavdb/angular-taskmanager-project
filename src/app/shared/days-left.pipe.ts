import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysLeft',
  standalone: true,
})
export class DaysLeftPipe implements PipeTransform {
  transform(value: string | Date | undefined | null): string {
    if (!value) return 'No deadline is set';

    const today = new Date();
    const deadline = new Date(value);

    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    const difference = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (difference > 0) return `Deadline: ${difference} days`;
    if (difference < 0) return `Deadline passed`;
    return 'Due today';
  }
}
