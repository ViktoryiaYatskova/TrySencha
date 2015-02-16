/**
 * Created by Viktoryia_Yatskova on 13-Feb-15.
 */
Ext.define('MyApp.controller.Main', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      addBtn: '#add-btn',
      taskField: '#task-field',
      activeTaskCountLabel: '#active-tasks-lbl',

      checkAllBtn: '#check-all-btn',
      deleteAllBtn: '#delete-all-btn',
      taskList: '#task-list',

      showAllBtn: '#show-all-btn',
      showCompleteBtn: '#show-complete-btn',
      showActiveBtn: '#show-active-btn',
    },
    models: ['MyApp.view.TaskListItem'],
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
      deleteAllBtn: {
        tap: function (elem) { //removing all items of list
          var checkAllBtn = this.getCheckAllBtn(),
              list = this.getTaskList(),
              listStore = list.getStore();

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
        }
      },
      showAllBtn: {
        tap: function(elem){
          var listStore = this.getTaskList().getStore(),
              deleteBtn = this.getDeleteAllBtn();

          elem.disable();
          this.getShowCompleteBtn.enable();
          this.getShowActiveBtn.enable();

          if(listStore.getAllCount() > listStore.getCount())
            this.activateEditBtn(deleteBtn, this.getCheckAllBtn());
          else
            this.activateEditBtn(deleteBtn);

          listStore.clearFilter();
        }
      },
      showCompleteBtn: {
        tap: function (elem){
          var listStore = this.getTaskList().getStore();

          elem.disable();
          this.getShowAllBtn.enable();
          this.getShowActiveBtn.enable();

          listStore.clearFilter();
          listStore.filter(completeFltr);

          this.activateEditBtn(this.getDeleteAllBtn());
          this.getCheckAllBtn().disable();
        }
      },
      showActiveBtn: {
        tap: function (elem) {
          var listStore = this.getTaskList().getStore();

          elem.disable();
          this.getShowCompleteBtn.enable();
          this.getShowAllBtn.enable();

          listStore.clearFilter();
          listStore.filter(activeFltr);
          this.activateEditBtn(this.getDeleteAllBtn(), this.getCheckAllBtn());
        }
      },
      taskList: {
        change: 'onCheckTask',
        tap: 'onDeleteTask'
      }
    }
  },

  onDeleteTask: function(element, event){
    var record = event.record,
        list = this.getTaskList(),
        listStore = list.getStore();

    if(!record) {
      return;
    }

    this.changeCheckCount(false);
    listStore.remove(record);
    list.refresh();
  },

  onCheckTask: function(checkBox, value){
    this.changeCheckCount(!value);
    //this.getTaskList().refresh();

    var checkAllBtn = this.getCheckAllBtn();
    if (checkAllBtn.isDisabled()) checkAllBtn.enable();
  },

  onAddBtn: function(){
    this.addTask();
    this.disable();
  },

  onTaskField: function(field, evOpt){
    var addBtn = this.getAddBtn(),
        valueLength = field.getValue().length,
        listStore = this.getTaskList().getStore();

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
    var listStore = this.getTaskList().getStore();

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
        listStore = list.getStore();

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
    var listStore = this.getTaskList().getStore();
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