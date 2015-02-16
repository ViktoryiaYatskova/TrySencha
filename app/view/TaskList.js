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
    defaultType: 'tasklistitem'
  }
});