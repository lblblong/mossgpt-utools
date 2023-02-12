import { Modal, message } from 'antd'
import { makeAutoObservable, toJS } from 'mobx'
import { Template } from '../../models/template'
import { router } from '../../router'
import { Storage } from '../../shared/storage'
import { IQuery } from './route'

export class Store {
  constructor() {
    makeAutoObservable(this)
  }

  query?: IQuery

  onQueryChange = (query: IQuery) => {
    console.log(query)
    this.query = query
    if (this.query.id) {
      this.template = Storage.getTemplate(this.query.id)
      console.log('设置template', toJS(this.template))
    }
  }

  template = new Template({
    content: '',
  })

  onSubmit = () => {
    if (!this.template.id) {
      this.template.id = Date.now() + ''
    }

    Storage.setTemplate(this.template)
    message.success('保存成功')
    router.back()
  }

  onDel = async () => {
    if (!this.template.id) return
    Modal.confirm({
      title: '提示',
      content: '将删除当前模板，确定这么操作吗？',
      onOk: () => {
        Storage.removeTemplate(this.template.id!)
        message.success('删除成功')
        router.back()
      },
    })
  }
}

