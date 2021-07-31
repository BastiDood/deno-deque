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

Deno.test({
    name: 'should unshift 10 numbers',
    fn() {
        const queue = new Deque<number>();
        for (const i of Array(10).keys()) queue.unshift(i);
        assert(!queue.empty);
        assertStrictEquals(queue.size, 10);
        assertStrictEquals(queue.front, 9);
        assertStrictEquals(queue.back, 0);
    },
});

Deno.test({
    name: 'should unshift falsy values except `undefined`',
    fn() {
        const deque = new Deque();

        const first = deque.unshift(0);
        assertStrictEquals(first, 1);
        assertStrictEquals(deque.size, 1);
        assertStrictEquals(deque.front, 0);
        assertStrictEquals(deque.back, 0);

        const second = deque.unshift('');
        assertStrictEquals(second, 2);
        assertStrictEquals(deque.size, 2);
        assertStrictEquals(deque.front, '');
        assertStrictEquals(deque.back, 0);

        const third = deque.unshift(null);
        assertStrictEquals(third, 3);
        assertStrictEquals(deque.size, 3);
        assertStrictEquals(deque.front, null);
        assertStrictEquals(deque.back, 0);
    },
});

Deno.test({
    name: 'empty queue should pop `undefined`',
    fn() {
        const queue = new Deque();
        assertStrictEquals(queue.pop(), undefined);
    },
});

Deno.test({
    name: 'should pop item at the back of queue',
    fn() {
        const queue = new Deque<number>();
        assertStrictEquals(queue.unshift(200), 1);
        assertStrictEquals(queue.push(100), 2);
        assertStrictEquals(queue.pop(), 100);
        assertStrictEquals(queue.pop(), 200);
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
    name: 'should pop item at the front of queue',
    fn() {
        const queue = new Deque<number>();
        assertStrictEquals(queue.unshift(200), 1);
        assertStrictEquals(queue.push(100), 2);
        assertStrictEquals(queue.shift(), 200);
        assertStrictEquals(queue.shift(), 100);
    },
});

Deno.test({
    name: 'should peek at correct index - postiive index',
    fn() {
        const queue = new Deque<number>();
        const nums = Array(10);
        for (const i of nums.keys()) assertStrictEquals(queue.push(i), i + 1);
        for (const i of nums.keys()) assertStrictEquals(queue.peekAt(i), i);
    },
});

Deno.test({
    name: 'should peek `undefined` when out of bounds - positive index',
    fn() {
        const queue = new Deque<number>();
        for (const i of Array(10).keys()) assertStrictEquals(queue.push(i), i + 1);
        assertStrictEquals(queue.peekAt(9), 9);
        assertStrictEquals(queue.peekAt(10), undefined);
        assertStrictEquals(queue.peekAt(20), undefined);
    },
});

Deno.test({
    name: 'should peek at correct index - negative index',
    fn() {
        const queue = new Deque<number>();
        for (const i of Array(10).keys()) assertStrictEquals(queue.push(i), i + 1);
        assertStrictEquals(queue.peekAt(0), 0);
        assertStrictEquals(queue.peekAt(-1), 9);
        assertStrictEquals(queue.peekAt(-2), 8);
        assertStrictEquals(queue.peekAt(-3), 7);
        assertStrictEquals(queue.peekAt(-4), 6);
        assertStrictEquals(queue.peekAt(-5), 5);
    },
});

Deno.test({
    name: 'should peek `undefined` when out of bounds - negative index',
    fn() {
        const queue = new Deque<number>();
        for (const i of Array(10).keys()) assertStrictEquals(queue.push(i), i + 1);
        assertStrictEquals(queue.peekAt(-10), 0);
        assertStrictEquals(queue.peekAt(-11), undefined);
        assertStrictEquals(queue.peekAt(-12), undefined);
    },
});

Deno.test({
    name: 'should perform soft clear',
    fn() {
        const queue = new Deque<number>();
        for (const i of Array(10).keys()) assertStrictEquals(queue.push(i), i + 1);
        queue.clear();
        assert(queue.empty);
    },
});
