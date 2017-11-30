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
        { key: 'id',      value: t.columns.id,      align: 'l', width: 10 },
        { key: 'name',    value: t.columns.name,    align: 'l', width: 40 },
        { key: 'gender',  value: t.columns.gender,  align: 'l', width: 10 },
        { key: 'amount',  value: t.columns.amount,  align: 'r', width: 20 },
        { key: 'date',    value: t.columns.date,    align: 'l', width: 20 },
      ],
    },
    rows: d.map((i) => ({
      raw: i,
      key: i.id,
      route: [ `./${i.id}` ],
      children: [
        { key: 'id',      value: i.id,                            align: 'l' },
        { key: 'name',    value: i.name,                          align: 'l' },
        { key: 'gender',  value: i.gender,                        align: 'l' },
        { key: 'amount',  value: o.currency.transform(i.amount),  align: 'r' },
        { key: 'date',    value: o.date.transform(i.date),        align: 'l' },
      ],
    })),
    // rows: [],
    sorts: [
      { key: 'gender', order: 'd' },
      { key: 'amount', order: 'a' },
    ],
    page: {
      current: 1,
      size: 10,
    },
    width: o.width,
  };

}
