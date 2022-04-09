import { PaginationDto } from "./PaginationDto";
import { QuerySearchDto } from "../../util/generic-query-search/query-search-dto";

export interface ArticleQueryDto {
  searchText: string | null;
  pagination: PaginationDto;
  filters: QuerySearchDto[] | null;
}
