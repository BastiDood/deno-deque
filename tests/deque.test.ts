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
    name: 'should push 4 numbers',
    fn() {
        const queue = new Deque<number>();
        queue.push(1);
        queue.push(2);
        queue.push(3);
        queue.push(4);
        assert(!queue.empty);
        assertStrictEquals(queue.size, 4);
        assertStrictEquals(queue.front, 1);
        assertStrictEquals(queue.back, 4);
    },
});
