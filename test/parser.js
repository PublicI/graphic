import test from 'ava';
import spectrum from 'csv-spectrum';
import parser from '../libs/parser';

test.cb('it should correctly parse csv spectrum samples', t => {
    let parse = parser();

    spectrum((err, data) => {
        data.forEach(d => {
            console.log('testing ' + d.name);
            t.deepEqual(parse(d.csv.toString('utf8')), JSON.parse(d.json));
        });
        t.end();
    });
});
