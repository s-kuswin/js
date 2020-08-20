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
    let childrenList = []
    obj.name && childrenList.push(obj.name)
    if(obj.children && obj.children.length) {
        for(const v of obj.children) {
            childrenList.push(...deepLoop(v))
        }
    }
    return childrenList
}

console.log(deepLoop(treeList));