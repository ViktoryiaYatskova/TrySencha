/**
 * Created by Viktoryia_Yatskova on 13-Feb-15.
 */
Ext.define('MyApp.controller.Main', {
  extend: 'Ext.app.Controller',
  config: {
    models: [
      'TaskCount',
      'TaskListItem'
    ],
    views: [
      'TaskList'
    ],
    refs: {
      addBtn: 'button[action="add-task"]',
      taskField: 'textfield',
      activeTaskCountLabel: 'label',

      checkBtn: 'checkboxfield',
      deleteBtn: 'button[action="delete-task"]',

      checkAllBtn: 'button[action="check-all"]',
      deleteAllBtn: 'button[action="delete-all"]',
      taskList: 'task-list',

      showAllBtn: 'button[action="show-all"]',
      showCompleteBtn: 'button[action="show-complete"]',
      showActiveBtn: 'button[action="show-active"]'
    },
    control: {
      addBtn: {
        tap: 'onAddBtn'
      },
      checkAllBtn:{
        tap: 'onCheckAllBtn'
      },
      taskField: {
        keyup: 'onTaskField'
      },
      checkBtn: {
        change: 'onCheckTask'
      },
      deleteBtn: {
        tap: 'onDeleteTask'
      },
      deleteAllBtn: {
        tap: 'onDeleteAllBtn'
      },
      showAllBtn: {
        tap: 'onShowAllBtn'
      },
      showCompleteBtn: {
        tap: 'onShowCompleteBtn'
      },
      showActiveBtn: {
        tap: 'onShowActiveBtn'
      },
      taskList: {
        change: 'onCheckTask',
        tap: 'onDeleteTask'
      }
    }
  },

  onDeleteAllBtn: function (elem) { //removing all items of list
    var checkAllBtn = this.getCheckAllBtn(),
      list = this.getTaskList(),
      listStore = Ext.getStore('TaskStore');

    if (!listStore.isFiltered())
      listStore.removeAll();
    else
      listStore.each(function (record) {
        listStore.remove(record);
      });

    list.refresh();

    if (!checkAllBtn.isDisabled()) //insure that only active tasks were removed
      this.changeCheckCount(false, listStore.getCount());

    elem.disable();
    this.checkAllBtn.disable();
  },

  onDeleteTask: function (element){
    var record = element.getRecord();
    Ext.getStore('TaskStore').remove(record);

    this.changeCheckCount(false);
    this.getTaskList().refresh();
  },

  onCheckTask: function (elem, value){
    var record = elem.getRecord();
    record.set('done', value);
    this.changeCheckCount(!value);

    var checkAllBtn = this.getCheckAllBtn();
    if (checkAllBtn.isDisabled()) checkAllBtn.enable();
  },

  onShowActiveBtn: function (elem) {
    var listStore = Ext.getStore('TaskStore');

    elem.disable();
    this.getShowCompleteBtn().enable();
    this.getShowAllBtn().enable();

    listStore.clearFilter();
    listStore.filter(this.activeFltr);
    this.activateEditBtn(this.getDeleteAllBtn(), this.getCheckAllBtn());
  },

  onShowAllBtn: function(elem){
    var listStore = Ext.getStore('TaskStore'),
      deleteBtn = this.getDeleteAllBtn();

    elem.disable();
    this.getShowCompleteBtn().enable();
    this.getShowActiveBtn().enable();

    if(listStore.getAllCount() > listStore.getCount())
      this.activateEditBtn(deleteBtn, this.getCheckAllBtn());
    else
      this.activateEditBtn(deleteBtn);

    listStore.clearFilter();
  },

  onShowCompleteBtn: function(elem){
    var listStore = Ext.getStore('TaskStore');

    elem.disable();
    this.getShowAllBtn().enable();
    this.getShowActiveBtn().enable();

    listStore.clearFilter();
    listStore.filter(this.completeFltr);

    this.activateEditBtn(this.getDeleteAllBtn());
    this.getCheckAllBtn().disable();
  },

  onAddBtn: function(elem){
    this.addTask();
    elem.disable();
  },

  onTaskField: function(field, evOpt){
    var addBtn = this.getAddBtn(),
        valueLength = field.getValue().length,
        listStore = Ext.getStore('TaskStore');

    if(addBtn.isDisabled() && valueLength > 0){
      addBtn.enable();
    }
    if(!addBtn.isDisabled() && valueLength === 0){
      addBtn.disable();
    }
    if (evOpt.event.keyIdentifier === 'Enter') {
      this.addTask(listStore);
      addBtn.disable();
    }
  },

  onCheckAllBtn: function(elem){
    var listStore = Ext.getStore('TaskStore');

    listStore.each(function(record){
      record.set('done', true);
    });
    list.refresh();
    this.changeCheckCount(false, 0);
    elem.disable();
  },

  addTask: function(){
    var field = this.getTaskField(),
        checkAllBtn = this.getCheckAllBtn(),
        deleteAllBtn = this.getDeleteAllBtn(),
        list = this.getTaskList(),
        listStore = Ext.getStore('TaskStore');

    console.log(field.getValue());
    debugger;
    listStore.add({name: field.getValue(), done: false});
    field.setValue('');
    this.changeCheckCount(true);
    list.refresh();

    if(listStore.getCount() === 1){
      deleteAllBtn.enable();
      checkAllBtn.enable();
    }
    if(checkAllBtn.isDisabled()) checkAllBtn.enable();
  },

  changeCheckCount: function(increment, newCount){
    var countRecord = this.getActiveTaskCountLabel().getRecord();

    increment? countRecord.increaseCount():
       newCount? countRecord.setCount(newCount):
        countRecord.decreaseCount();
  },

  activateEditBtn: function(){
    var listStore = Ext.getStore('TaskStore');
    this.getCheckAllBtn();

    if(listStore.getCount() > 0)
      Array.prototype.forEach.call(arguments, function(button){
        if(button.isDisabled())
          button.enable();
    });
  },

  completeFltr: Ext.create('Ext.util.Filter', {
    filterFn: function(item) {
      return item.get('done');
    }
  }),

  activeFltr: Ext.create('Ext.util.Filter', {
    filterFn: function (item) {
      return !item.get('done');
    }
  })

});