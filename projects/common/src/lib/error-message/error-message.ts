import { Component, signal, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-error-message',
  host: {
    class: 'lib-error-message',
    '[class.lib-error-message--hidden]': 'hidden()',
  },
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './error-message.html',
  styleUrl: './error-message.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ErrorMessage {
  protected hidden = signal(false);
}
