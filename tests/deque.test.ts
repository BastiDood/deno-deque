import { assert, assertStrictEquals } from 'https://deno.land/std@0.103.0/testing/asserts.ts';
import { Deque } from '../mod.ts';

Deno.test({
    name: 'should initialize empty',
    fn() {
        const queue = new Deque();
        assert(queue.empty);
        assertStrictEquals(queue.size, 0);
        assertStrictEquals(queue.front, undefined);
        assertStrictEquals(queue.back, undefined);
    },
});

Deno.test({
    name: 'should push 10 numbers',
    fn() {
        const queue = new Deque<number>();
        for (const i of Array(10).keys()) queue.push(i);
        assert(!queue.empty);
        assertStrictEquals(queue.size, 10);
        assertStrictEquals(queue.front, 0);
        assertStrictEquals(queue.back, 9);
    },
});

Deno.test({
    name: 'should push falsy values except `undefined`',
    fn() {
        const deque = new Deque();

        const first = deque.push(0);
        assertStrictEquals(first, 1);
        assertStrictEquals(deque.size, 1);
        assertStrictEquals(deque.size, 1);
        assertStrictEquals(deque.front, 0);
        assertStrictEquals(deque.back, 0);

        const second = deque.push('');
        assertStrictEquals(second, 2);
        assertStrictEquals(deque.size, 2);
        assertStrictEquals(deque.front, 0);
        assertStrictEquals(deque.back, '');

        const third = deque.push(null);
        assertStrictEquals(third, 3);
        assertStrictEquals(deque.size, 3);
        assertStrictEquals(deque.front, 0);
        assertStrictEquals(deque.back, null);
    },
});
