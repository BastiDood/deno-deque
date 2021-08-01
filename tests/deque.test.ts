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

Deno.test({
    name: 'example from README should work',
    fn() {
        // Construct a new double-ended queue.
        const deque = new Deque<number>();

        // Insert an item to the **back** of the deque.
        // This returns the new length.
        assertStrictEquals(deque.push(100), 1);
        assertStrictEquals(deque.push(200), 2);

        // Insert an item to the **front** of the deque.
        // This returns the new length.
        assertStrictEquals(deque.unshift(300), 3);
        assertStrictEquals(deque.unshift(400), 4);

        // Removes and returns the **last** item.
        assertStrictEquals(deque.pop(), 200);

        // Removes and returns the **first** item.
        assertStrictEquals(deque.shift(), 400);

        // Peeks at the item at a specific index (without removing).
        assertStrictEquals(deque.at(1), 100);

        // Returns whether the deque is empty;
        assert(!deque.empty);

        // Alias for `deque.at(-1)`.
        assertStrictEquals(deque.back, 100);

        // Alias for `deque.at(0)`.
        assertStrictEquals(deque.front, 300);

        // The number of elements currently in the queue.
        assertStrictEquals(deque.length, 2);

        // The maximum capacity of the inner buffer.
        // Typically, one does not need to think about this.
        assertStrictEquals(deque.capacity, 8); // 8

        // Iterate over all elements in the queue (without removing).
        // The elements are yielded from front to back.
        const iterator = deque[Symbol.iterator]();
        assertEquals(iterator.next(), { done: false, value: 300 });
        assertEquals(iterator.next(), { done: false, value: 100 });
        assertEquals(iterator.next(), { done: true, value: undefined });

        // Copy items in the queue into a new array.
        assertEquals(Array.from(deque), [300, 100]);

        // Performs a "soft clear".
        // Note that this does **not** reset capacity.
        deque.clear();
        assert(deque.empty);
        assertStrictEquals(deque.length, 0);
        assertStrictEquals(deque.capacity, 8);
        assertEquals(Array.from(deque), []);
    },
});
