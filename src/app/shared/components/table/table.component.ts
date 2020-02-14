import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Column, Pagination } from '../../models/table';

@Component({
  selector: 'sl-table',
  templateUrl: './table.component.html'
})
export class TableComponent<T> {

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() edit: EventEmitter<number> = new EventEmitter<number>();
  @Output() remove: EventEmitter<number> = new EventEmitter<number>();
  @Output() sort: EventEmitter<{ _order: string, _sort: string}> = new EventEmitter<{ _order: string, _sort: string}>();

  @Input() columns: Column[] = [];
  @Input() data: T[] = [];
  @Input() pagination: Pagination;

  constructor() {}

  onPageClick(page: any) {
    if (typeof page !== 'string' && this.pagination._page === page.value) {
      return;
    }

    this.pagination.pages.forEach(paginationPage => paginationPage.activated = false);

    if (typeof page === 'string') {
      switch (page) {
        case 'previous':
          this.pagination._page = this.pagination._page - 1 <= 1 ? 1 : this.pagination._page - 1;
          break;
        case 'next':
          this.pagination._page = this.pagination._page + 1 >= this.pagination.pages.length ?
                             this.pagination.pages.length : this.pagination._page + 1;
          break;
      }
    } else {
      this.pagination._page = page.value;
    }

    this.pageChange.emit(this.pagination._page);
  }

  onAction(id: number, action: string) {
    switch (action) {
      case 'edit':
        this.edit.emit(id);
        break;
      case 'remove':
        this.remove.emit(id);
        break;
    }
  }

  onSort(sortedColumn: Column) {
    const sort = { _order: this.getSort(sortedColumn.sort._order), _sort: sortedColumn.id };

    this.columns.forEach(column => {
      if (column.sort) {
        column.sort._order = '';
        column.sort._sort = column.id;
      }
    });

    this.sort.emit(sort);

    sortedColumn.sort = { ...sort };
  }

  private getSort(sort: any) {
    return sort === 'asc' ? 'desc' : 'asc';
  }
}
