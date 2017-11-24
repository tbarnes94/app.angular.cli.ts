/**
 * https://material.angular.io/components/table/overview
 */
export function TableBuild(o: any): any {
  return {
    width: o.width,
    columns: [],
    rows: [],
    sorts: [],
    page: 1,
  }
}
