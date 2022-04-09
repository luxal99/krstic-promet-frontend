import { QuerySearchDto } from "./query-search-dto";
import { PaginationDto } from "../../models/dto/PaginationDto";
import { ArticleQueryDto } from "../../models/dto/ArticleQueryDto";

export default class CriteriaBuilder {
  private _filterList: QuerySearchDto[] = [];
  private searchText!: string;
  private pagination!: PaginationDto;

  constructor() {
    this.pagination = { page: 0, rows: 10 };
  }

  addFilter(query: QuerySearchDto) {
    this._filterList = [...this._filterList, query];
    return this;
  }

  setSearchText(searchText: string): CriteriaBuilder {
    this.searchText = searchText;
    return this;
  }

  setPagination(pagination: PaginationDto): void {
    this.pagination = pagination;
  }

  resetPagination() {
    this.pagination = { page: 0, rows: 10 };
  }

  resetSearch() {
    this.searchText = "";
  }

  buildUri(): string {
    return encodeURI(JSON.stringify(this.makeArticleQuery()));
  }

  private makeArticleQuery(): ArticleQueryDto {
    return {
      filters: this._filterList.length > 0 ? this._filterList : null,
      pagination: this.pagination,
      searchText: this.searchText ? this.searchText : null,
    };
  }
}
