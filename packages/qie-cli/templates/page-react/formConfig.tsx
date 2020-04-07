import React from 'react';
import { Input } from 'antd';
import XSelect from '@/components/XSelect';
import { contentType } from '@/utils/enums';

export const getFormItems = context => {
  return [
    {
      label: '标题',
      formItem: (dec, form) => {
        return dec('name')(<Input placeholder="请输入标题"></Input>);
      }
    },
    {
      label: '编号',
      formItem: (dec, form) => {
        return dec('code', {
          initialValue: ''
        })(<Input placeholder="请输入编号"></Input>);
      }
    },
    {
      label: '类型',
      formItem: (dec, form) => {
        return dec('type', {
          initialValue: context.type || ''
        })(<XSelect data={contentType} hasAll />);
      }
    }
  ];
};

export const getFormActions = context => {
  return {
    onSubmit: context.onSearch,
    onReset: context.onReset,
    submitText: '查询'
  };
};
