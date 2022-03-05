import { Article } from "./article";
import { DeliveryNote } from "./delivery-note";
import { DeliveryNoteStatusEnum } from "../enum/DeliveryNoteStatusEnum";
import { DeliveryNotePaidStatusEnum } from "../enum/DeliveryNotePaidStatusEnum";

export interface DeliveryNoteArticle {
  id?: number;
  amount?: number;
  idArticle?: Article;
  idDeliveryNote?: DeliveryNote;
  sellingPrice?: number;
  deliveredAmount?: number;
  payedAmount?: number;
  deliveryStatus?: DeliveryNoteStatusEnum;
  paidStatus?: DeliveryNotePaidStatusEnum;
}
