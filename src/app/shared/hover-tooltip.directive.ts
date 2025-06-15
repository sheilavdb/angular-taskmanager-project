import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appHoverTooltip]',
  standalone: true,
})
export class HoverTooltipDirective {
  @Input('appHoverTooltip') tooltipText = '';
  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.tooltipText) return;

    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.tooltipText)
    );

    // Basic tooltip styling
    this.renderer.setStyle(this.tooltipElement, 'position', 'fixed');
    this.renderer.setStyle(this.tooltipElement, 'background', '#333');
    this.renderer.setStyle(this.tooltipElement, 'color', '#fff');
    this.renderer.setStyle(this.tooltipElement, 'padding', '14px 18px');
    this.renderer.setStyle(this.tooltipElement, 'borderRadius', '4px');
    this.renderer.setStyle(this.tooltipElement, 'fontSize', '20px');
    this.renderer.setStyle(this.tooltipElement, 'whiteSpace', 'nowrap');
    this.renderer.setStyle(this.tooltipElement, 'zIndex', '1000');
    this.renderer.setStyle(this.tooltipElement, 'pointerEvents', 'none');

    this.renderer.appendChild(document.body, this.tooltipElement);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.tooltipElement) {
      const offsetX = 10;
      const offsetY = 20;
      this.renderer.setStyle(
        this.tooltipElement,
        'left',
        `${event.clientX + offsetX}px`
      );
      this.renderer.setStyle(
        this.tooltipElement,
        'top',
        `${event.clientY + offsetY}px`
      );
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.removeTooltip();
  }

  @HostListener('mousedown')
  @HostListener('touchstart')
  onInteraction() {
    this.removeTooltip();
  }

  private removeTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
