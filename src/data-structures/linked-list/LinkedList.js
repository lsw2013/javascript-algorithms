import LinkedListNode from './LinkedListNode';
import Comparator from '../../utils/comparator/Comparator';

export default class LinkedList {
    /**
     * @param {Function} [comparatorFunction]
     */
    constructor(comparatorFunction) {
        /** @var LinkedListNode */
        this.head = null;

        /** @var LinkedListNode */
        this.tail = null;

        this.compare = new Comparator(comparatorFunction);
    }

    /**
     * @param {*} value
     * @return {LinkedList}
     */
    prepend(value) {

        // Make new node to be a head.
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        // If there is no tail yet let's make new node a tail.
        if (!this.tail) {
            this.tail = newNode;
        }
        // 头部不像尾部插入一样需要检查是否有头部，只要检查是否有尾部就可以了

        return this;
    }

    /**
     * @param {*} value
     * @return {LinkedList}
     */
    append(value) {
        const newNode = new LinkedListNode(value);

        // If there is no head yet let's make new node a head.
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        // Attach new node to the end of linked list.
        this.tail.next = newNode;
        this.tail = newNode;

        return this;
    }

    /**
     * @param {*} value
     * @return {LinkedListNode}
     */
    delete(value) {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;

        // If the head must be deleted then make 2nd node to be a head.
        // 要循环删除头部，因为新的头部可能也是需要删除的
        while (this.head && this.compare.equal(this.head.value, value)) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        if (currentNode !== null) {
            // If next node must be deleted then make next node to be a next next one.
            // 头部已经检查了，所以要从下一个开始检查
            while (currentNode.next) {
                // 只有有下一个节点的节点才被检查，所以这里 tail 无法被检查
                if (this.compare.equal(currentNode.next.value, value)) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            } // 这里的 while 一直循环到 currentNode.next 是 tail 的时候
        }

        // Check if tail must be deleted.
        // 最后检查 tail 是否需要被删掉
        // 上面的 while 循环最后可能因为 tail.value = value 导致 
        // currentNode.next = currentNode.next.next = tail.next = null
        // 因此在这里还需要检查一遍 tail 是否要重新设置为 currentNode, 
        // 否则 tail 还是原来的 tail 而不是当前的真实 tail
        if (this.compare.equal(this.tail.value, value)) {
            this.tail = currentNode;
        }

        return deletedNode;
    }

    /**
     * @param {Object} findParams
     * @param {*} findParams.value
     * @param {function} [findParams.callback]
     * @return {LinkedListNode}
     */
    find({ value = undefined, callback = undefined }) {
        if (!this.head) {
            return null;
        }

        let currentNode = this.head;

        while (currentNode) {
            // If callback is specified then try to find node by callback.
            if (callback && callback(currentNode.value)) {
                return currentNode;
            }

            // If value is specified then try to compare by value..
            if (value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    /**
     * @return {LinkedListNode}
     */
    deleteTail() {
        if (this.head === this.tail) {
            const deletedTail = this.tail;
            this.head = null;
            this.tail = null;

            return deletedTail;
        }

        const deletedTail = this.tail;

        // Rewind to the last node and delete "next" link for the node before the last one.
        let currentNode = this.head;
        // 单向链表，只能从头向尾查找哪个是尾部
        while (currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }

        this.tail = currentNode;
        return deletedTail;
    }

    /**
     * @return {LinkedListNode}
     */
    deleteHead() {
        if (!this.head) {
            return null;
        }

        const deletedHead = this.head;

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    /**
     * @return {LinkedListNode[]}
     */
    toArray() {
        const nodes = [];

        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    /**
     * @param {function} [callback]
     * @return {string}
     */
    toString(callback) {
        return this.toArray().map(node => node.toString(callback)).toString();
    }
}
