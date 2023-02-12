import { makeAutoObservable } from 'mobx'
import { Template } from '../../models/template'
import { Storage } from '../../shared/storage'
import { toTemplateForm } from '../templateForm/route'

export class Store {
  constructor() {
    this.templates = Storage.getTemplates()
    makeAutoObservable(this)
  }

  templates: Template[] = []

  onCreate = () => {
    toTemplateForm()
  }

  onEdit = (it: Template) => {
    toTemplateForm({
      query: { id: it.id! },
    })
  }
}

