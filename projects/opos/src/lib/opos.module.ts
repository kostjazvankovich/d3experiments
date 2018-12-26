import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview/overview.component';
import { BarsComponent } from './bars/bars.component';

@NgModule({
  declarations: [OverviewComponent, BarsComponent],
  imports: [
  ],
  exports: [OverviewComponent, BarsComponent]
})
export class OposModule { }
