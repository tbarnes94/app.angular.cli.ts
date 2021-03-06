import { merge } from 'lodash-es';

import { TableCell } from '../../../modules/table';
import { TableHead } from '../../../modules/table';
import { TablePageSchemas } from '../../../modules/table';
import { TableRow } from '../../../modules/table';
import { TableSchemas } from '../../../modules/table';
import { TableSort } from '../../../modules/table';

/**
 * https://material.angular.io/components/table/overview
 */
export function TableBuild(o: any): TableSchemas {
  const d: any = o.datas;
  const t: any = o.translations;
  const m: any = o.modules;
  return new TableSchemas(
    'table',
    merge({}, m.table, t.table),
    new TableRow(
      'thead',
      undefined,
      undefined, [
        new TableHead('id',     t.columns.id,     ( o.width > 1000 ), undefined,  10, undefined),
        new TableHead('name',   t.columns.name,   undefined,          undefined,  25, undefined),
        new TableHead('gender', t.columns.gender, undefined,          undefined,  20, undefined),
        new TableHead('amount', t.columns.amount, undefined,          'r',        20, undefined),
        new TableHead('date',   t.columns.date,   undefined,          undefined,  20, undefined),
        new TableHead(null,     null,             undefined,          undefined,   5, undefined),
      ],
    ),
    d.map((i) => new TableRow(
      i.id,
      i,
      'onClickRow', [
        new TableCell('id',     i.id,                           ( o.width > 1000 ), undefined,  undefined,  'onClickCell',  undefined),
        new TableCell('name',   i.name,                         undefined,          undefined,  undefined,  undefined,      undefined),
        new TableCell('gender', i.gender,                       undefined,          undefined,  undefined,  undefined,      undefined),
        new TableCell('amount', o.currency.transform(i.amount), undefined,          'r',        undefined,  undefined,      undefined),
        new TableCell('date',   o.date.transform(i.date),       undefined,          undefined,  undefined,  undefined,      undefined),
        new TableCell(null,     null,                           undefined,          undefined,  undefined,  undefined,      'chevron-right'),
      ],
    )),
    [
      new TableSort('gender', 'd'),
      new TableSort('amount', 'a'),
    ],
    new TablePageSchemas(10, 1),
    o.width,
  );
}
