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
      taskListItem: '#task-list-item',

      showAllBtn: '#show-all-btn',
      showCompleteBtn: '#show-complete-btn',
      showActiveBtn: '#show-active-btn',

      checkTask: '#mark-btn',
      deleteTask: '#delete-btn'
    },
    control: {
      addBtn: {
        tap: 'onAddBtn'
      },
      checkAllBtn: 'onCheckAllBtn',
      taskField: {
        keyup: 'onTaskField'
      },
      deleteAllBtn: {
        tap: function (elem) { //removing all items of list
          var checkAllBtn = getCheckAllBtn(),
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
          checkAllBtn.disable();
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
            this.activateEditBtn(deleteBtn, getCheckAllBtn());
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

          this.activateEditBtn(getDeleteAllBtn());
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
          this.activateEditBtn(getDeleteAllBtn(), getCheckAllBtn());
        }
      },
      taskListItem: {
        changeCheckCount: 'changeCheckCount',
        change: 'changeCheckCount',
        itemsingletap: 'changeCheckCount'
      },
      taskList: {
        changeCheckCount: 'changeCheckCount',
        change: 'changeCheckCount'
      }/*,
      checkTask: {
        change: function(){
          var record = this.getRecord(),
            checkAllBtn = this.getCheckAllBtn();

          record.set('done', !record.get('done')); //using set-function causes generation of new event for checkbox
          record.data.done ? this.changeCheckCount(false) : this.changeCheckCount(true);
          this.getTaskList().refresh();

           if (checkAllBtn.isDisabled()) checkAllBtn.enable();
        }
      },
      deleteBtn: {
        tap: function(){
          debugger;
          var record = this.getRecord(),
              list = this.getTaskList();

          if (!record.get('done'))
            this.changeCheckCount(false);

          list.getStore().remove(record);
          list.refresh();
        }
      }*/
    }
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
        countRecord.decreaseCount()
  },

  activateEditBtn: function(){
    var listStore = this.getTaskList().getStore();
    this.getCheckAllBtn();

    if(listStore.getCount() > 0)
      Array.prototype.forEach.call(arguments, function(button){
        if(button.isDisabled())
          button.enable();
    });
  }
});
//Filters
var completeFltr = Ext.create('Ext.util.Filter', {
  filterFn: function(item) {
    return item.get('done');
  }
});

var activeFltr = Ext.create('Ext.util.Filter', {
  filterFn: function(item) {
    return !item.get('done');
  }
});