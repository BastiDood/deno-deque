import { bench } from './deps.ts';
import { Deque } from '../mod.ts';

const deque = new Deque<number>();

bench({
    name: 'pushing 1000 items into the queue',
    func(timer) {
        timer.start();
        for (const num of Array(1000).keys()) deque.push(num);
        timer.stop();
    },
});

bench({
    name: 'shift and undo three changes',
    runs: 1000,
    func(timer) {
        timer.start();
        const a = deque.shift()!;
        const b = deque.shift()!;
        const c = deque.shift()!;
        deque.unshift(c);
        deque.unshift(b);
        deque.unshift(a);
        timer.stop();
    },
});
