import { assert, assertEquals, assertStrictEquals } from './deps.ts';
import { Deque } from '../mod.ts';

Deno.test({
    name: 'should initialize empty',
    fn() {
        const queue = new Deque();
        assert(queue.empty);
        assertStrictEquals(queue.length, 0);
        assertStrictEquals(queue.front, undefined);
        assertStrictEquals(queue.back, undefined);
    },
});

Deno.test({
    name: 'should peek at correct index - postiive index',
    fn() {
        const queue = new Deque<number>();
        const nums = Array(10);
        for (const i of nums.keys()) assertStrictEquals(queue.push(i), i + 1);
        for (const i of nums.keys()) assertStrictEquals(queue.at(i), i);
    },
});

Deno.test({
    name: 'should peek `undefined` when out of bounds - positive index',
    fn() {
        const queue = new Deque<number>();
        for (const i of Array(10).keys()) assertStrictEquals(queue.push(i), i + 1);
        assertStrictEquals(queue.at(9), 9);
        assertStrictEquals(queue.at(10), undefined);
        assertStrictEquals(queue.at(20), undefined);
    },
});

Deno.test({
    name: 'should peek at correct index - negative index',
    fn() {
        const queue = new Deque<number>();
        for (const i of Array(10).keys()) assertStrictEquals(queue.push(i), i + 1);
        assertStrictEquals(queue.at(0), 0);
        assertStrictEquals(queue.at(-1), 9);
        assertStrictEquals(queue.at(-2), 8);
        assertStrictEquals(queue.at(-3), 7);
        assertStrictEquals(queue.at(-4), 6);
        assertStrictEquals(queue.at(-5), 5);
    },
});

Deno.test({
    name: 'should peek `undefined` when out of bounds - negative index',
    fn() {
        const queue = new Deque<number>();
        for (const i of Array(10).keys()) assertStrictEquals(queue.push(i), i + 1);
        assertStrictEquals(queue.at(-10), 0);
        assertStrictEquals(queue.at(-11), undefined);
        assertStrictEquals(queue.at(-12), undefined);
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

Deno.test({
    name: 'should add single item - plenty of capacity',
    fn() {
        // Fill up queue to initial capacity
        const queue = new Deque();
        for (const i of Array(5).keys()) assertStrictEquals(queue.push(i), i + 1);
        assert(queue.capacity - queue.length > 1);

        // Test lengths
        const oldLength = queue.length;
        const newLength = queue.push(5);
        assertStrictEquals(newLength, oldLength + 1);
        assertStrictEquals(queue.length, newLength);
        assertStrictEquals(newLength, 6);
    },
});

Deno.test({
    name: 'should add single item - exact capacity',
    fn() {
        // Fill up queue to initial capacity
        const queue = new Deque();
        for (const i of Array(15).keys()) assertStrictEquals(queue.push(i), i + 1);
        assert(queue.capacity - queue.length === 1);

        // Test lengths
        const oldLength = queue.length;
        const newLength = queue.push(15);
        assertStrictEquals(newLength, oldLength + 1);
        assertStrictEquals(queue.length, newLength);
        assertStrictEquals(newLength, 16);
    },
});

Deno.test({
    name: 'should add single item - over capacity',
    fn() {
        // Fill up queue to initial capacity
        const queue = new Deque();
        for (const i of Array(16).keys()) assertStrictEquals(queue.push(i), i + 1);
        assert(queue.capacity / queue.length === 2);

        // Test lengths
        const oldLength = queue.length;
        const newLength = queue.push(16);
        assertStrictEquals(newLength, oldLength + 1);
        assertStrictEquals(queue.length, newLength);
        assertStrictEquals(newLength, 17);
    },
});

Deno.test({
    name: 'should create equivalent array',
    fn() {
        // Insert elements
        const queue = new Deque<number>();
        queue.unshift(1);
        queue.unshift(2);
        queue.push(3);
        queue.push(4);
        queue.unshift(5);
        queue.push(6);
        assertEquals(Array.from(queue), [5, 2, 1, 3, 4, 6]);

        // Delete elements
        queue.pop();
        queue.shift();
        queue.shift();
        queue.pop();
        assertEquals(Array.from(queue), [1, 3]);
    },
});
