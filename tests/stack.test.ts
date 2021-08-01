import { assert, assertStrictEquals } from './deps.ts';
import { Deque } from '../mod.ts';

Deno.test({
    name: 'should push 10 numbers',
    fn() {
        const stack = new Deque<number>();
        for (const i of Array(10).keys()) stack.push(i);
        assert(!stack.empty);
        assertStrictEquals(stack.length, 10);
        assertStrictEquals(stack.front, 0);
        assertStrictEquals(stack.back, 9);
    },
});

Deno.test({
    name: 'should push falsy values except `undefined`',
    fn() {
        const stack = new Deque();

        const first = stack.push(0);
        assertStrictEquals(first, 1);
        assertStrictEquals(stack.length, 1);
        assertStrictEquals(stack.front, 0);
        assertStrictEquals(stack.back, 0);

        const second = stack.push('');
        assertStrictEquals(second, 2);
        assertStrictEquals(stack.length, 2);
        assertStrictEquals(stack.front, 0);
        assertStrictEquals(stack.back, '');

        const third = stack.push(null);
        assertStrictEquals(third, 3);
        assertStrictEquals(stack.length, 3);
        assertStrictEquals(stack.front, 0);
        assertStrictEquals(stack.back, null);
    },
});

Deno.test({
    name: 'empty stack should pop `undefined`',
    fn() {
        const stack = new Deque();
        assertStrictEquals(stack.pop(), undefined);
    },
});

Deno.test({
    name: 'should pop item at the back of stack',
    fn() {
        const stack = new Deque<number>();
        assertStrictEquals(stack.unshift(200), 1);
        assertStrictEquals(stack.push(100), 2);
        assertStrictEquals(stack.pop(), 100);
        assertStrictEquals(stack.pop(), 200);
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
