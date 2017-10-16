# rsuite-table

`rsuite-table` 是一个 `React` 实现的 `<Table>` 组件，主要特性有：

- 支持固定表头，固定列（固定在左侧）；
- 支持自定义调整列宽；
- 支持自定义单元格内容；
- 支持显示树状表格；
- 支持排序。

版本与状态

[![npm][npm-badge]][npm]

[![npm][npm-beta-badge]][npm-beta]

[![Travis][build-badge]][build] [![Coverage Status][coverage-badge]][coverage]

## fork的改动

1. 修改了不少bug
2. 主要修复了table高度自适应问题

具体可以看 https://github.com/tangshuang/rsuite-table/commits/master

## # 快速开始

安装：

```sh
npm i rsuite-table --save
```

> `rsuite-table` 中的组件依赖了 `rsuite`，所以需要安装一下 `rsuite`。

```sh
npm i rsuite --save
```

示例：

```js
import react from 'react';
import ReactDOM from 'react-dom';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/lib/less/index.less';

const dataList = [
    {id:1, name:'a', email:'a@email.com',avartar:'...'},
    {id:2, name:'b', email:'b@email.com',avartar:'...'},
    {id:3, name:'c', email:'c@email.com',avartar:'...'}
];

const ImageCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props}>
        <img src={rowData[dataKey]} width="50" />
    </Cell>
);

ReactDOM.render(

    <Table data = {dataList}  >
        <Column  width = {100} sort fixed resizable>
            <HeaderCell>ID</HeaderCell>
            <Cell dataKey="id"></Cell>
        </Column>

        <Column  width = {100} sort resizable>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name"></Cell>
        </Column>

        <Column  width = {100} sort resizable>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email"></Cell>
        </Column>

        <Column  width = {100} resizable>
            <HeaderCell>Avartar</HeaderCell>
            <ImageCell dataKey="avartar"></ImageCell>
        </Column>

    </Table> ,

    document.getElementById('mount')
);
```


[npm-badge]: https://img.shields.io/npm/v/rsuite-table.svg
[npm]: https://www.npmjs.com/package/rsuite-table


[npm-beta-badge]: https://img.shields.io/npm/v/rsuite-table/beta.svg
[npm-beta]: https://www.npmjs.com/package/rsuite-table


[build-badge]: https://travis-ci.org/rsuite/rsuite-table.svg
[build]: https://travis-ci.org/rsuite/rsuite-table

[coverage-badge]: https://coveralls.io/repos/github/rsuite/rsuite-table/badge.svg?branch=next
[coverage]: https://coveralls.io/github/rsuite/rsuite-table


