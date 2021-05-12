import tape from 'tape';
import { op, table } from '../../src';

tape('op.row_object generates objects with row data', t => {
  const dt = table({ a: [1, 2], b: [3, 4] });

  t.deepEqual(
    dt.derive({ row: op.row_object() }).array('row'),
    dt.objects(),
    'row objects, outside function context'
  );

  t.deepEqual(
    dt.derive({ row: () => op.row_object() }).array('row'),
    dt.objects(),
    'row objects, inside function context'
  );

  t.deepEqual(
    dt.derive({ row: op.row_object('a') }).array('row'),
    dt.objects({ columns: 'a' }),
    'row objects, column names outside function context'
  );

  t.deepEqual(
    dt.derive({ row: () => op.row_object('a' + '') }).array('row'),
    dt.objects({ columns: 'a' }),
    'row objects, column names inside function context'
  );

  t.deepEqual(
    dt.derive({ row: op.row_object(0) }).array('row'),
    dt.objects({ columns: 'a' }),
    'row objects, column indices outside function context'
  );

  t.deepEqual(
    dt.derive({ row: () => op.row_object(0 + 0) }).array('row'),
    dt.objects({ columns: 'a' }),
    'row objects, column indices inside function context'
  );

  t.end();
});
