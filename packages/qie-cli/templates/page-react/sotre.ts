import { observable, action } from 'mobx';
import { getTableColumns } from './tableConfig';
import { getFormItems, getFormActions } from './formConfig';
import CRUDStore from '@/utils/CRUDStore';

export default class Store extends CRUDStore {
  constructor(props) {
    super({
      queryApiName: 'queryApiName',
      createApiName: 'createApiName',
      updateApiName: 'updateApiName',
      deleteApiName: 'deleteApiName'
    });

    const { currentPage = 1, pageSize = 15 } = props.location.query;

    this.init({
      tableColumns: getTableColumns(this),
      searchFormItems: getFormItems(this),
      searchFormActions: getFormActions(this),
      onAfterSearch: this.onAfterSearch,
      currentPage: Number(currentPage),
      pageSize: Number(pageSize)
    });

    // this.loadList();
  }
}
