import { Article } from "./article";
import { DeliveryNote } from "./delivery-note";

export interface DeliveryNoteArticle {
  id?: number;
  amount?: number;
  idArticle?: Article;
  idDeliveryNote?: DeliveryNote;
  sellingPrice?: number;
}
