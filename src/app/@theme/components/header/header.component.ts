import { Component, Input, OnInit } from '@angular/core';
import { CallService } from './../../../Services/call.service';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { DataService } from '../../../Services/data.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  iterations: number;
  alive: number;
  delayBetweenFrames: number;

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              protected Util: CallService,
              public dataService: DataService) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);

      this.dataService.currentIterations.subscribe(iterations => this.iterations = iterations);
      this.dataService.currentAlive.subscribe(alive => this.alive = alive);
      this.dataService.currentDelayBetweenFrames.subscribe(delayBetweenFrames => this.delayBetweenFrames = delayBetweenFrames);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  openModalSettings() {
    this.Util.sendClickCall('open_modal_settings');
  }
}
