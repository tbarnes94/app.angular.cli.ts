/**
 * https://material.angular.io/components/table/overview
 */
export function TableBuild(o: any): any {

  const d: any = o.datas;
  const t: any = o.translations;
  return {
    columns: {
      key: 'thead',
      children: [
        { key: 'id', value: t.columns.id, width: 10 },
        { key: 'name', value: t.columns.name, width: 35 },
        { key: 'city', value: t.columns.city, width: 25 },
        { key: 'amount', value: t.columns.amount, width: 15 },
        { key: 'date', value: t.columns.date, width: 15 },
      ],
    },
    rows: d.map((i) => ({
      key: i.id,
      route: [ `./${i.id}` ],
      children: [
        { key: 'id', value: i.id },
        { key: 'name', value: i.name },
        { key: 'city', value: i.city },
        { key: 'amount', value: o.currency.transform(i.amount) },
        { key: 'date', value: o.date.transform(i.date) },
      ],
    })),
    // rows: [],
    sorts: [
      { key: 'amount', order: 'd', type: 'number' },
    ],
    page: {
      current: 1,
      size: 10,
    },
    width: o.width,
  };

}
