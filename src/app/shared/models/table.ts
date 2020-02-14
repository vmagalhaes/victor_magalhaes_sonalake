export interface Column {
  id: string;
  label: string;
  sort?: {
    _order: string,
    _sort: string
  };
}

export interface Pagination {
  _page: number;
  _limit: number;
  _sort: string;
  _order: string;
  pages?: Page[];
}

export interface Page {
  value: number;
  activated: boolean;
}
