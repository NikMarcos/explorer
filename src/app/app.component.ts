import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'explorer';

  constructor() {
    // electron.ipcRenderer.on('signal-come', (event, arg) => {
    //   console.log('Received acknowledged from backend about receipt of our signal.');
    //   console.log(event);
    //   console.log(arg);
    // })

    // console.log('Sending message to backend.');
    // electron.ipcRenderer.send('signal-send', 'hello, are you there?');
  }
}
