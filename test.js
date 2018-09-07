const processFn = (fn) => function (...args) {
    return new Promise((resolve, reject) => {
        args.push((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
        fn.apply(this, args);
    });
};

const pf = function (fn) {
    // 这里返回的是一个函数
    return function (...args) {
        // 返回的这个函数执行之后返回的是一个 promise
        return new Promise(function (resolve, reject) {
            // args.push(function (error, result) {
            //     if (error) {
            //         reject(error);
            //     }
            //     else {
            //         resolve(result);
            //     }
            // });
            // fn.apply(this, args);  
            // 这里执行了一个添加了 callback 函数的 fn 函数，
            // 同时这个 callback 里面添加了 promise 的状态修改函数

            // 修改成下面这样的话， callback 更明显一些
            fn(args, function (error, result) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}