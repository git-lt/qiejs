import React, { Component } from 'react';
import { Form, Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { observer } from 'mobx-react';

const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 } };

interface EditFormModalProps extends CommonType.CustomerModalProps {
  form: FormComponentProps['form'];
}

@observer
class EditFormModal extends Component<EditFormModalProps, any> {
  onSubmit = () => {
    const { data, form, onOk, isEdit } = this.props;
    form.validateFields((err: any, values: any) => {
      if (err) return;
      if (isEdit) values.id = data.id;
      onOk(values);
    });
  };
  render() {
    const { form, isEdit, data, visible, onCancel } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal visible={visible} onCancel={onCancel} onOk={this.onSubmit} width={600}>
        <Form layout="horizontal">
          <Form.Item label="名称" {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: isEdit ? data.name : '',
              rules: [{ required: true, message: '请输入名称' }]
            })(<Input placeholder="请输入名称" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create<EditFormModalProps>()(EditFormModal);
