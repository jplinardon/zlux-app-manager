

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  OnInit,
  Output,
  ViewChild
  } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'rs-com-launchbar-widget',
  templateUrl: 'launchbar-widget.component.html',
  styleUrls: [ 'launchbar-widget.component.css' ]
})
export class LaunchbarWidgetComponent implements OnInit {
  date: Date;
  popupVisible: boolean;
  @Output() popupStateChanged = new EventEmitter<boolean>();
  @ViewChild('usericon') userIcon: ElementRef;
  @ViewChild('logoutbutton') logoutButton: ElementRef;

  constructor(
    @Inject(MVDHosting.Tokens.AuthenticationManagerToken) public authenticationManager: MVDHosting.AuthenticationManagerInterface
  ) {
    this.date = new Date();
    this.popupVisible = false;
  }

  ngOnInit(): void {
    this.date = new Date();

    Observable.interval(1000).subscribe(() => this.date = new Date());
  }

  getUsername(): string | null {
    return this.authenticationManager.getUsername();
  }

  logout(): void {
    this.popupVisible = false;
    this.popupStateChanged.emit(this.popupVisible);
    this.authenticationManager.requestLogout();
  }

  togglePopup(): void {
    this.popupVisible = !this.popupVisible;
    this.popupStateChanged.emit(this.popupVisible);
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (this.popupVisible && event
       && !this.userIcon.nativeElement.contains(event.target)
       && this.logoutButton.nativeElement !== event.target) {
      this.popupVisible = false;
      this.popupStateChanged.emit(this.popupVisible);
    }
  }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
