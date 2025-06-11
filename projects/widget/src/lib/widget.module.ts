import { NgModule, ModuleWithProviders } from '@angular/core'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list'
import { MatDividerModule } from '@angular/material/divider'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
  ],
})
export class WidgetModule {
  public static forRoot(): ModuleWithProviders<WidgetModule> {
    return {
      ngModule: WidgetModule,
    } as ModuleWithProviders<WidgetModule>
  }
}
