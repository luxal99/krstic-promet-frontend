export interface BehaviorFilterModel {
  id: number;
  filterType: behaviorFilterType | null;
}

export type behaviorFilterType =
  | "WAREHOUSE"
  | "ARTICLE_SUB_CATEGORY"
  | "ARTICLE_CATEGORY";
