import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div *ngIf="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
  @Input() isLoading: boolean = false;
}