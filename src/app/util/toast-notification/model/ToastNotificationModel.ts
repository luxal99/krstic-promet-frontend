import { toastNotificationType } from "../type/toastNotificationType";

export interface ToastNotificationModel {
  notificationType: toastNotificationType;
  message: string;
}
