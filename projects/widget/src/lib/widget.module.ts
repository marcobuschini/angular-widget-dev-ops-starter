import { NgModule, ModuleWithProviders } from '@angular/core'
import { WidgetComponent } from './widget.component'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list'
import { MatDividerModule } from '@angular/material/divider'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [WidgetComponent],
  exports: [WidgetComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
  ],
})
export class WidgetModule {
  static forRoot(): ModuleWithProviders<WidgetModule> {
    return {
      ngModule: WidgetModule,
    } as ModuleWithProviders<WidgetModule>
  }
}
