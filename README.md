# Deno Deque
A fast [double-ended queue](https://en.wikipedia.org/wiki/Double-ended_queue) written in modern [TypeScript](https://www.typescriptlang.org/) for the [Deno](https://deno.land/) runtime.

# Acknowledgements
This project is practically a rewrite of the popular [Denque library](https://github.com/invertase/denque). Due to Denque's minimum compatiblity with Node.js v0.10, the original code uses old JavaScript patterns that no longer apply in modern applications. The goal of this rewrite, then, is to serve as a modern adaptation of the core logic.

> **DISCLAIMER:** This rewrite is not endorsed by nor affiliated with the [Denque project](https://github.com/invertase/denque) and [its authors](https://invertase.io/).

# Compatibility and Limitations
Since this project intends to be a rewrite, I have taken the liberty to only include a subset of Denque's features that I consider to be essential. From a pedantic standpoint, a double-ended queue should only support four core operations: `push`, `pop`, and `unshift`, and `shift`.

Hence, splicing operations have been removed from the original code. If splicing operations are a "must-have", then perhaps it may be worth reconsidering whether a double-ended queue is the most appropriate data structure for the job.

Another removed feature was the ability to indicate some maximum capacity. This was typically a use case for bounded queues. This feature was removed because I have opted to delegate this constraint to user-land. That is, one must manually check the `length` of the queue themselves before inserting into the queue. The overall effect, then, remains the same. If this limitation is truly a deal breaker, please [file an issue](https://github.com/Some-Dood/deno-deque/issues/new/choose) stating your use case.

Finally, some methods have also been renamed. In particular, [`peekAt`](https://github.com/invertase/denque/blob/0420632a878b271e2d7483c30468a60b4afc9456/README.md#peekAtint-index---dynamic) has been renamed to `at` in accordance with the recently added [`Array.prototype.at`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at).

With that said, the next section covers the public interface of the library.

# Usage
```typescript
// In production, please don't forget to lock to a specific version!
import { Deque } from 'https://deno.land/x/deno-deque';

// Construct a new double-ended queue.
const deque = new Deque<number>();

// Insert an item to the **back** of the deque.
// This returns the new length.
deque.push(100); // 1
deque.push(200); // 2

// Insert an item to the **front** of the deque.
// This returns the new length.
deque.unshift(300); // 3
deque.unshift(400); // 4

// Removes and returns the **last** item.
deque.pop(); // 200

// Removes and returns the **first** item.
deque.shift(); // 400

// Peeks at the item at a specific index (without removing).
// This supports negative indexing.
// Returns `undefined` if out of bounds.
deque.at(1); // 100

// Returns whether the deque is empty;
deque.empty; // false

// Alias for `deque.at(-1)`.
deque.back; // 100

// Alias for `deque.at(0)`.
deque.front; // 300

// The number of elements currently in the queue.
deque.length; // 2

// The maximum capacity of the inner buffer.
// Typically, one does not need to think about this.
deque.capacity; // 8

// Iterate over all elements in the queue (without removing).
// The elements are yielded from front to back.
for (const num of deque) console.log(num);

// Copy items in the queue into an array.
Array.from(deque); // [300, 100]

// Performs a "soft" clear.
// Note that this does **not** reset capacity.
deque.clear();
deque.empty;       // false
deque.length;      // 0
deque.capacity;    // 8
Array.from(deque); // []
```
