import {NgModule} from '@angular/core';
import {MatButtonModule, MatButtonToggleModule, MatSlideToggleModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatButtonToggleModule, MatSlideToggleModule],
  exports: [MatButtonModule, MatButtonToggleModule, MatSlideToggleModule],
  declarations: []
})
export class MatMaterialModule {
}
