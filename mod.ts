export class Deque<T> {
    #head = 0;
    #tail = 0;
    #capacityMask = 0b11;
    #list: (T | undefined)[] = new Array(this.#capacityMask + 1);

    /** Returns the current number of elements in the queue. */
    get size() {
        return this.#head <= this.#tail
            ? this.#tail - this.#head
            : this.#capacityMask + 1 - (this.#head - this.#tail);
    }

    /** Returns whether the deque is empty. */
    get empty() {
        return this.#head === this.#tail;
    }

    /** Alias for `Deque#peekAt(0)`. */
    get front() {
        return this.peekAt(0);
    }

    /** Alias for `Deque#peekAt(-1)`. */
    get back() {
        return this.peekAt(-1);
    }

    /** Performs a "soft" clear. This does **not** reset capacity. */
    clear() {
        this.#head = this.#tail = 0;
    }

    /** Insert item to first slot. */
    unshift(item: T) {
        const len = this.#list.length;
        this.#head = (this.#head - 1 + len) & this.#capacityMask;
        this.#list[this.#head] = item;
        if (this.#tail === this.#head) this.#growArray();
        if (this.#head < this.#tail) return this.#tail - this.#head;
        return this.#capacityMask + 1 - (this.#head - this.#tail);
    }

    /** Remove first element. */
    shift() {
        if (this.empty) return;

        const head = this.#head;
        const item = this.#list[head];
        this.#list[head] = undefined;
        this.#head = (head + 1) & this.#capacityMask;

        if (head < 2 && this.#tail > 10000 && this.#tail <= this.#list.length >>> 2)
            this.#shrinkArray();

        return item;
    }

    /** Insert item to last slot. */
    push(item: T) {
        const tail = this.#tail;
        this.#list[tail] = item;
        this.#tail = (tail + 1) & this.#capacityMask;

        if (this.empty) this.#growArray();

        if (this.#head < this.#tail) return this.#tail - this.#head;

        return this.#capacityMask + 1 - (this.#head - this.#tail);
    }

    /** Remove last element. */
    pop() {
        if (this.empty) return;

        const tail = this.#tail;
        const len = this.#list.length;
        this.#tail = (tail - 1 + len) & this.#capacityMask;

        const item = this.#list[this.#tail];
        this.#list[this.#tail] = undefined;

        if (this.#head < 2 && tail > 10000 && tail <= len >>> 2) this.#shrinkArray();

        return item;
    }

    /** View the item at the specific index. */
    peekAt(index: number) {
        // Disallow out of bounds access
        const len = this.size;
        if (index >= len || index < -len) return;

        // Wrap-around index
        if (index < 0) index += len;
        index = (this.#head + index) & this.#capacityMask;

        return this.#list[index];
    }

    #copyArray(shouldFullCopy: boolean) {
        if (!shouldFullCopy && this.#head <= this.#tail)
            return this.#list.slice(this.#head, this.#tail);

        const left = this.#list.slice(0, this.#tail);
        const right = this.#list.slice(this.#head, this.#list.length);
        return [...right, ...left];
    }

    #shrinkArray() {
        this.#list.length >>>= 1;
        this.#capacityMask >>>= 1;
    }

    #growArray() {
        if (this.#head) {
            // Copy existing data, head to end, then beginning to tail.
            this.#list = this.#copyArray(true);
            this.#head = 0;
        }

        // Head is at 0 and array is now full,
        // therefore safe to extend
        this.#tail = this.#list.length;

        this.#list.length *= 2;
        this.#capacityMask = (this.#capacityMask << 1) | 1;
    }
}

