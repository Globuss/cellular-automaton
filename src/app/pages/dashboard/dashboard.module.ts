import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { CreateRuleComponent } from './../../Components/Modals/CreateRule/createRule.component';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    CreateRuleComponent,
  ],
  entryComponents: [
    CreateRuleComponent
  ],
})
export class DashboardModule { }
