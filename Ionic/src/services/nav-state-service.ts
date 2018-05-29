import { Injectable } from '@angular/core';

@Injectable()
export class NavStateService {
  tab = 0;
  inSuperTabs = true;

  setNavTab(i) {
    this.tab = i;
  }

  getNavTab() {
    return this.tab;
  }

  setInSuperTabs(bool) {
    this.inSuperTabs = bool;
  }

  getInSuperTabs() {
    return this.inSuperTabs;
  }

  constructor() {

  }
}
