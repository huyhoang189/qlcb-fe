const generateChildNodes = (arr, ma_don_vi_cha, parentKey) => {
  let outputs = [];
  let index = 0;
  for (let element of arr) {
    if (element.don_vi?.id === ma_don_vi_cha) {
      let children = generateChildNodes(
        arr,
        element.id,
        `${parentKey}-${index}`
      );

      let node = {
        title: `${element?.ten_don_vi} `,
        value: element.id,
        key: `${parentKey}-${index}`,
        // disabled: !element?.trang_thai,
        ...element,
      };

      if (children.length > 0) {
        node.children = children;
      }

      outputs.push(node);
      index++;
    }
  }
  return outputs;
};

const generateTrees = (arr) => {
  let trees = [];
  let index = 0;
  for (let element of arr) {
    if (element.don_vi === null) {
      let node = {
        children: [],
        value: element.id,
        title: `${element?.ten_don_vi}`,
        // disabled: !element?.trang_thai,
        key: `0-${index}`,
        ...element,
      };
      trees.push(node);
      index++;
    }
  }
  trees.forEach((element, index) => {
    let child = generateChildNodes(arr, element.id, `0-${index}`);
    trees[index].children = [...child];
  });
  return trees;
};

const getKeysByTitle = (tree, value) => {
  const matchingKeys = [];

  const search = (node) => {
    if (node.title.includes(value)) {
      matchingKeys.push(node.key);
    }
    if (node.children) {
      node.children.forEach((child) => search(child));
    }
  };

  tree.forEach((node) => search(node));

  return matchingKeys;
};

const getNodeByKey = (tree, key) => {
  let result = null;

  const search = (node) => {
    if (node?.key === key) {
      result = node;
      return;
    }

    if (node?.children) {
      node.children.forEach((child) => search(child));
    }
  };

  tree.forEach((node) => search(node));

  return result;
};

export { generateTrees, getKeysByTitle, getNodeByKey };
