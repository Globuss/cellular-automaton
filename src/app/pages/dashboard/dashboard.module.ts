import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ToasterModule } from 'angular2-toaster';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { CreateRuleComponent } from './../../Components/Modals/CreateRule/createRule.component';
import { CreateFillerComponent } from './../../Components/Modals/CreateFiller/createFiller.component';
import { SettingsComponent } from './../../Components/Modals/Settings/settings.component';

import { CanvasDrawableComponent } from '../../canvas-drawable/canvas-drawable.component';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    ToasterModule,
  ],
  declarations: [
    DashboardComponent,
    CreateRuleComponent,
    CreateFillerComponent,
    SettingsComponent,
    CanvasDrawableComponent
  ],
  entryComponents: [
    CreateRuleComponent,
    CreateFillerComponent,
    SettingsComponent,
    CanvasDrawableComponent
  ],
})
export class DashboardModule { }
