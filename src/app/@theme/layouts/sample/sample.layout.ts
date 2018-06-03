import { CallService } from './../../../Services/call.service';
import { DashboardComponent } from './../../../pages/dashboard/dashboard.component';
import { Component, OnDestroy } from '@angular/core';
import { delay, withLatestFrom } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { Rule } from '../../../Models/Rule/rule';

import { StateService } from '../../../@core/data/state.service';

// TODO: move layouts into the framework
@Component({
  selector: 'ngx-sample-layout',
  styleUrls: ['./sample.layout.scss'],
  templateUrl: 'sample.layout.html',
})

export class SampleLayoutComponent implements OnDestroy {


  layout: any = {};
  sidebar: any = {};

  protected layoutState$: Subscription;
  protected sidebarState$: Subscription;
  protected menuClick$: Subscription;
  protected rules: Array<Rule>;

  constructor(protected stateService: StateService,
              protected menuService: NbMenuService,
              protected themeService: NbThemeService,
              protected bpService: NbMediaBreakpointsService,
              protected sidebarService: NbSidebarService,
              protected Util: CallService) {
    this.layoutState$ = this.stateService.onLayoutState()
      .subscribe((layout: string) => this.layout = layout);

    this.sidebarState$ = this.stateService.onSidebarState()
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });

    const isBp = this.bpService.getByName('is');
    this.menuClick$ = this.menuService.onItemSelect()
      .pipe(
        withLatestFrom(this.themeService.onMediaQueryChange()),
        delay(20),
      )
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= isBp.width) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });
      this.rules = Rule.getAll();
  }

  resetCanvas() {
    this.Util.sendClickCall('reset_canvas');
  }

  openModalCreateRule() {
    this.Util.sendClickCall('open_modal_create_rule');
  }

  gameChanged(newGame: number) {
    this.Util.sendClickCall('game', {id: newGame});
  }

  fillerChanged(newRule: string) {
    this.Util.sendClickCall('filler_' + newRule);
  }

  start() {
    this.Util.sendClickCall('start');
  }

  stop() {
    this.Util.sendClickCall('stop');
  }

  pause() {
    this.Util.sendClickCall('pause');
  }

  ngOnDestroy() {
    this.layoutState$.unsubscribe();
    this.sidebarState$.unsubscribe();
    this.menuClick$.unsubscribe();
  }
}
