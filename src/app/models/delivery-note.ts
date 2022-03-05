import { DeliveryNoteStatusEnum } from "../enum/DeliveryNoteStatusEnum";
import { Client } from "./client";
import { SelectedArticleDto } from "./dto/SelectedArticleDto";
import { DeliveryNoteArticle } from "./delivery-note-article";
import { DeliveryNotePaidStatusEnum } from "../enum/DeliveryNotePaidStatusEnum";

export interface DeliveryNote {
  id?: number;
  createdDate?: string;
  dateOfDeliveryNote: string;
  gross: number;
  paidStatus: DeliveryNotePaidStatusEnum;
  deliveryStatus: DeliveryNoteStatusEnum;
  idClient?: Client;
  listOfArticles: DeliveryNoteArticle[];
}
