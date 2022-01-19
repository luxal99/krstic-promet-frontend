import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslatePipe } from "./translate.pipe";
import { CapitalizePipe } from "./capitalize.pipe";
import { GroupObjectInArrayPipe } from "./group-object-in-array.pipe";
import { FormatNumberPipe } from "./format-number.pipe";

@NgModule({
  declarations: [
    CapitalizePipe,
    TranslatePipe,
    GroupObjectInArrayPipe,
    FormatNumberPipe,
  ],
  imports: [CommonModule],
  exports: [
    CapitalizePipe,
    TranslatePipe,
    GroupObjectInArrayPipe,
    FormatNumberPipe,
  ],
})
export class PipesModule {}
