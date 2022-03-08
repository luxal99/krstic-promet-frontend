import { InjectionToken } from "@angular/core";

export const DEFAULT_ROUTE = new InjectionToken<string>("default-route");
export type Routes =
  | "/user/"
  | "/article/"
  | "/article-category/"
  | "/article-sub-category/"
  | "/conversion/"
  | "/client/"
  | "/delivery-note/"
  | "/delivery-note-article/"
  | "/warehouse/";

export class FormControlNames {
  static USERNAME = "username";
  static PASSWORD = "password";
  static TITLE = "title";
  static ID_ARTICLE_CATEGORY = "idArticleCategory";
  static NAME = "name";
  static CODE = "code";
  static PURCHASE_PRICE = "purchasePrice";
  static SELLING_PRICE = "sellingPrice";
  static AMOUNT = "amount";
  static ID_ARTICLE_SUB_CATEGORY = "idArticleSubCategory";
  static ID_WAREHOUSE = "idWarehouse";
  static ID_CONVERSION = "idConversion";
  static CONVERSION_FROM_VALUE = "conversionFromValue";
  static CONVERSION_FROM_UNIT = "conversionFromUnit";
  static CONVERSION_TO_VALUE = "conversionToValue";
  static CONVERSION_TO_UNIT = "conversionToUnit";
  static FIRST_NAME = "firstName";
  static LAST_NAME = "lastName";
  static TELEPHONE = "telephone";
  static PAID_STATUS = "paidStatus";
  static DATE_OF_DELIVERY_NOTE = "dateOfDeliveryNote";
  static GROSS = "gross";
  static ID_CLIENT = "idClient";
  static END_DATE = "endDate";
  static START_DATE = "startDate";
  static SEARCH = "search";
  static DELIVERY_STATUS = "deliveryStatus";
  static PRICE_TYPE = "priceType";
}

export const TOKEN_NAME = "Authorization";
export const DATE_VALUE_FORMAT = "YYYY-MM-DD";

export class Pages {
  static ADMIN = "/";
  static LOGIN = "login";
}
