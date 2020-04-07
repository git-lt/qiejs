import React from 'react';
import { Divider, Popconfirm } from 'antd';
import { dateUtil } from '@qiejs/utils';

export const getTableColumns = context => {
  const { onEdit, onDel } = context;

  return [
    { title: 'ID', width: 80, dataIndex: 'id' },
    { title: '名称', width: 120, dataIndex: 'name' },
    { title: '类型', width: 120, dataIndex: 'typeName' },
    { title: '修改时间', width: 120, dataIndex: 'lastUpdated', render: v => dateUtil.formatISODate(v) },
    { title: '操作人', width: 120, dataIndex: 'lastUpdateUser' },
    {
      title: '操作',
      width: 180,
      render: (t, r, i) => {
        return (
          <>
            <a onClick={onEdit(r, i)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="是否确定删除？" placement="topRight" okText="确定" cancelText="取消" onConfirm={onDel({ id: r.id })}>
              <a>删除</a>
            </Popconfirm>
          </>
        );
      }
    }
  ];
};
