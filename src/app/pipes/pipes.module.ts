import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslatePipe } from "./translate.pipe";
import { CapitalizePipe } from "./capitalize.pipe";
import { GroupObjectInArrayPipe } from "./group-object-in-array.pipe";
import { FormatNumberPipe } from "./format-number.pipe";
import { SearchClientPipe } from "./search-client.pipe";

@NgModule({
  declarations: [
    CapitalizePipe,
    TranslatePipe,
    GroupObjectInArrayPipe,
    FormatNumberPipe,
    SearchClientPipe,
  ],
  imports: [CommonModule],
  exports: [
    CapitalizePipe,
    TranslatePipe,
    GroupObjectInArrayPipe,
    FormatNumberPipe,
    SearchClientPipe,
  ],
})
export class PipesModule {}
