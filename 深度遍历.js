let treeList = {
    name: 'root',
    children: [
        {
            name: 'c1',
            children: [
                {
                        name: 'c11',
                    children: []
                    },
                    {
                        name: 'c12',
                    children: []
                }
            ]
        },
        {
            name: 'c2',
            children: [
                {
                        name: 'c21',
                    children: []
                    },
                    {
                        name: 'c22',
                    children: []
                }
            ]
        }
    ]
}

// 深度优先的方式遍历 打印 name
// ['root', 'c1','c11', 'c12', 'c2', 'c21', 'c22']

function deepLoop (obj) {
    let nameList = []
    obj.name && nameList.push(obj.name)
    if(obj.children && obj.children.length) {
        for(const v of obj.children) {
            nameList.push(...deepLoop(v))
        }
    }
    return nameList
}

console.log(stackLoop(treeList));


//用栈的方式
function stackLoop(obj) {
    let stackList = []
    let nameList = []
    stackList.push(obj)
    while(stackList.length) {
        let node = stackList.pop()
        node.name && nameList.push(node.name)
        if(node.children && node.children.length) {
            stackList.push(...node.children.reverse())
        }
    }

    return nameList

}
