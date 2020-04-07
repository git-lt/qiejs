import React, { Component } from 'react';
import XTable from '@/components/XTable';
import XForm from '@/components/XForm';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import Store from './store';
import EditFormModal from './components/EditFormModal';

@observer
export default class ListPage extends Component {
  store: Store;
  constructor(props) {
    super(props);
    this.store = new Store(props);
  }
  render() {
    const {
      tableColumns,
      listLoading,
      total,
      currentPage,
      list,
      pageSize,
      onPageChange,

      isShowEditFormModal,
      onHideEditFormModal,
      onSubmitEditFrom,
      currentItem,
      isEdit,
      searchFormItems,
      searchFormActions,
      searchFormLoading,
      onAdd
    } = this.store;

    const toolbar = (
      <Button type="primary" icon="plus" onClick={onAdd}>
        新增
      </Button>
    );
    const options = {
      toolbar,
      dataSource: list,
      columns: tableColumns,
      rowKey: 'id',
      loading: listLoading,
      total,
      current: currentPage,
      pageSize,
      onPageChange,
      showSizeChanger: true
    };

    console.log('Content:render');
    return (
      <div className="mt20 bg-wt">
        <div>
          <XForm items={searchFormItems} actionsConfig={searchFormActions} loading={searchFormLoading}></XForm>
        </div>

        <XTable {...options} />

        {isShowEditFormModal && (
          <EditFormModal
            data={currentItem}
            isEdit={isEdit}
            visible={isShowEditFormModal}
            onOk={onSubmitEditFrom}
            onCancel={onHideEditFormModal}
          />
        )}
      </div>
    );
  }
}
