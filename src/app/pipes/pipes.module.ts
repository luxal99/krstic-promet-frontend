import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslatePipe } from "./translate.pipe";
import { CapitalizePipe } from "./capitalize.pipe";
import { GroupObjectInArrayPipe } from "./group-object-in-array.pipe";

@NgModule({
  declarations: [CapitalizePipe, TranslatePipe, GroupObjectInArrayPipe],
  imports: [CommonModule],
  exports: [CapitalizePipe, TranslatePipe, GroupObjectInArrayPipe],
})
export class PipesModule {}
