import { DeliveryNote } from "./delivery-note";

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  telephone: string;
  listOfDeliveryNotes: DeliveryNote[];
}
