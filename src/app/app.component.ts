import {Component, OnInit} from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client'

declare var device; // Cordova inhered var.


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  ngOnInit(): void {
    // Used for IOS/Android (I guess)
    document.addEventListener("deviceready", function() {
      alert(device.platform);
    }, false);

    /* Configuring WebSocket on Client Side */
    var socket = new SockJS('http://localhost:9032/ws');
    var stompClient;
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
      stompClient.subscribe('/test_ws_endpoint', function(temperature) {
        console.log("ws resp: ", temperature);
      });
    });
  }
}
