/**
 * Created by Viktoryia_Yatskova on 13-Feb-15.
 */
Ext.define('MyApp.view.TaskList', {
  extend: 'Ext.dataview.DataView',
  requires: ['MyApp.view.TaskListItem'],
  xtype: 'task-list',
  config: {
    allowDeselect: true,
    disableSelection: true,
    useComponents: true,
    defaultType: 'tasklistitem',
    store: 'TaskStore',
    itemId: 'task-list'/*,


    listeners: [
      {
        event: 'itemsingletap',
        fn: function (item, index, target, record, event) {
          if (event.target.classList.contains('delete-btn')) {
            if (!record.get('done'))
              activeTasksCountRecord.decreaseCount();

            listStore.remove(record);
            list.refresh();
          }
          if (event.target.type === 'checkbox') {
            record.data.done = !record.get('done'); //using set-function causes generation of new event for checkbox
            record.set();//to refresh record view

            record.data.done ? activeTasksCountRecord.decreaseCount() : activeTasksCountRecord.increaseCount();
            list.refresh();
            if (markBtn.isDisabled()) markBtn.enable();
          }
        }
      }
    ]*/
  }
});