import { DeliveryNoteStatusEnum } from "../enum/DeliveryNoteStatusEnum";
import { Client } from "./client";
import { SelectedArticleDto } from "./dto/SelectedArticleDto";

export interface DeliveryNote {
  id?: number;
  createdDate?: string;
  dateOfDeliveryNote: string;
  gross: number;
  paidStatus: DeliveryNoteStatusEnum;
  idClient?: Client;
  listOfArticles: SelectedArticleDto[];
}
