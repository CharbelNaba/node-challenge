export interface IOptions{
    sort?: boolean;
    filter?: boolean;
    expenseId?: string;
    sortColumnName?: string;
    filterColumnName?: string
    direction?: string;
    filterValue?: string;
    limit: number;
    offset: number;
    page: number
}