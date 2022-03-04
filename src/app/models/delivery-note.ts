import { DeliveryNoteStatusEnum } from "../enum/DeliveryNoteStatusEnum";
import { Client } from "./client";
import { SelectedArticleDto } from "./dto/SelectedArticleDto";
import { DeliveryNoteArticle } from "./delivery-note-article";

export interface DeliveryNote {
  id?: number;
  createdDate?: string;
  dateOfDeliveryNote: string;
  gross: number;
  paidStatus: DeliveryNoteStatusEnum;
  deliveryStatus: DeliveryNoteStatusEnum;
  idClient?: Client;
  listOfArticles: DeliveryNoteArticle[];
}
