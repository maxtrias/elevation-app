import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgChartsModule } from 'ng2-charts';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AppState } from './state/app.state';
import { ChartComponent } from './component/chart/chart.component';
import { IndicatorComponent } from './component/indicator/indicator.component';

@NgModule({
  declarations: [AppComponent, ChartComponent, IndicatorComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule,
    NgxsModule.forRoot([AppState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
