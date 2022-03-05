import { DeliveryNoteStatusEnum } from "../../enum/DeliveryNoteStatusEnum";
import { DeliveryNotePaidStatusEnum } from "../../enum/DeliveryNotePaidStatusEnum";
import { DeliveryNoteArticle } from "../delivery-note-article";

export interface ArticleConfirmDialogData {
  deliveredStatus: DeliveryNoteStatusEnum;
  paidStatus: DeliveryNotePaidStatusEnum;
  listOfArticles: DeliveryNoteArticle[];
}
