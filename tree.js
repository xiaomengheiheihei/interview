/*
 * @Description: 二叉树遍历
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2021-01-02 22:07:16
 * @LastEditTime: 2021-01-03 17:55:25
 */

/**
 * 1. 前序遍历：访问根–>遍历左子树–>遍历右子树;
 * 2. 中序遍历：遍历左子树–>访问根–>遍历右子树;
 * 3. 后序遍历：遍历左子树–>遍历右子树–>访问根;
 * 4. 广度遍历：按照层次一层层遍历;
 */

//  前序遍历
// 递归方式
let rs = [];
function loopTree (value) {
    if (value) {
        rs.push(value.value);
        loopTree(value.left);
        loopTree(value.right);
    }
}
loopTree(tree)
console.log(rs)

// 非递归遍历
let rs = [];
function loopTree (value) {
    if (value) {
        let stack = [value];
        while (stack.length !== 0) {
            value = stack.pop();
            rs.push(value.value);
            if (value.right) stack.push(value.right) // 注意栈的先进后出
            if (value.left) stack.push(value.left);
        }
    }
}
loopTree(tree)

// 中序遍历
// 递归
let rs = [];
function loopTree (value) {
    if (value) {
        loopTree(value.left);
        rs.push(value.value);   // 将子节点放在中间位置
        loopTree(value.right);
    }
}
loopTree(tree)
console.log(rs)

let rs = [];
function loopTree (value) {
    if (value) {
        let stack = [];
        while(stack.length !== 0 || value) {
            if (value) {
                stack.push(value);
                value = value.left;
            } else {
                value = stack.pop();
                rs.push(value.value);
                value = value.right;
            }
        }
    }
}
loopTree(tree)

// 后续遍历

// 递归
let rs = [];
function loopTree (value) {
    if (value) {
        loopTree(value.left);
        loopTree(value.right);
        rs.push(value.value);   // 最后插入根节点
    }
}
loopTree(tree)
console.log(rs)

// 非递归
let rs = [];
function loopTree (value) {
    if (value) {
        let stack = [value];
        let temp = null;
        while(stack.length !== 0) {
            temp = stack[stack.length -1];
            if (temp.left && value !== temp.left && value !== temp.right) {
                stack.push(temp.left);
            } else if (temp.right && value !== temp.right) {
                stack.push(temp.right);
            } else {
                rs.push(stack.pop().value);
                value = temp;
            }
        }
    }
}

// 广度遍历是从二叉树的根结点开始，
// 自上而下逐层遍历；在同一层中，按照从左到右的顺序对结点逐一访问。

// 利用队列的先进先出，按从上到下从左到右的顺序放入节点，然后依次取出即可
let rs = [];
function loopTree (value) {
    if (value) {
        let que = [value];
        while(que.length !== 0) {
            value = que.shift();    
            rs.push(value.value);
            if (value.left) que.push(value.left);
            if (value.right) que.push(value.right);
        }
    }
}
loopTree(tree)