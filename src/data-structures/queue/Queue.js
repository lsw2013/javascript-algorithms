import LinkedList from '../linked-list/LinkedList';
// 队列是只有特定操作方法的链表：先进先出
export default class Queue {
    constructor() {
        this.linkedList = new LinkedList();
    }

    isEmpty() {
        return !this.linkedList.tail;
    }

    peek() {
        if (!this.linkedList.head) {
            return null;
        }

        return this.linkedList.head.value;
    }

    enqueue(value) {
        this.linkedList.append(value);
    }

    dequeue() {
        const removedHead = this.linkedList.deleteHead();
        return removedHead ? removedHead.value : null;
    }

    toString(callback) {
        return this.linkedList.toString(callback);
    }
}
