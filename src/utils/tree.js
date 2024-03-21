//function for create tree
const generateChildNodes = (arr, ma_don_vi_cha) => {
    let outputs = [];
    let index = 1;
    for (let element of arr) {
        if (element.don_vi?.id === ma_don_vi_cha) {
            let children = generateChildNodes(arr, element.id);

            let node = {
                title: `${element?.ten_don_vi} - ${element?.don_vi?.ma_don_vi || "BQP"}`,
                value: element.id,
                ...element,
            };

            if (children) {
                node.children = children;
            }

            outputs.push(node);
            // eslint-disable-next-line no-unused-vars
            index++;
        }
    }
    return outputs;
};

const generateTrees = (arr) => {
    let trees = [];
    let index = 1;
    for (let element of arr) {
        if (element.don_vi === null) {
            let node = {
                children: [],
                value: element.id,
                title: `${element?.ten_don_vi} - ${element?.don_vi?.ma_don_vi || "BQP"}`,
                ...element,
            };
            trees.push(node);
            // eslint-disable-next-line no-unused-vars
            index++;
        }
    }
    trees.forEach((element, index) => {
        let child = generateChildNodes(arr, element.id);
        trees[index].children = [...child];
    });
    return trees;
};


export {generateTrees};