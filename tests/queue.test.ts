import { assert, assertStrictEquals } from './deps.ts';
import { Deque } from '../mod.ts';

Deno.test({
    name: 'should unshift 10 numbers',
    fn() {
        const queue = new Deque<number>();
        for (const i of Array(10).keys()) queue.unshift(i);
        assert(!queue.empty);
        assertStrictEquals(queue.length, 10);
        assertStrictEquals(queue.front, 9);
        assertStrictEquals(queue.back, 0);
    },
});

Deno.test({
    name: 'should unshift falsy values except `undefined`',
    fn() {
        const queue = new Deque();

        const first = queue.unshift(0);
        assertStrictEquals(first, 1);
        assertStrictEquals(queue.length, 1);
        assertStrictEquals(queue.front, 0);
        assertStrictEquals(queue.back, 0);

        const second = queue.unshift('');
        assertStrictEquals(second, 2);
        assertStrictEquals(queue.length, 2);
        assertStrictEquals(queue.front, '');
        assertStrictEquals(queue.back, 0);

        const third = queue.unshift(null);
        assertStrictEquals(third, 3);
        assertStrictEquals(queue.length, 3);
        assertStrictEquals(queue.front, null);
        assertStrictEquals(queue.back, 0);
    },
});

Deno.test({
    name: 'empty queue should shift `undefined`',
    fn() {
        const queue = new Deque();
        assertStrictEquals(queue.shift(), undefined);
    },
});

Deno.test({
    name: 'should shift item at the front of queue',
    fn() {
        const queue = new Deque<number>();
        assertStrictEquals(queue.unshift(200), 1);
        assertStrictEquals(queue.push(100), 2);
        assertStrictEquals(queue.shift(), 200);
        assertStrictEquals(queue.shift(), 100);
    },
});
