/**
 * Created by Viktoryia_Yatskova on 13-Feb-15.
 */
Ext.define('MyApp.view.TaskListItem', {
  extend: 'Ext.dataview.component.DataItem',
  xtype: 'tasklistitem',

  requires: [
    'Ext.field.Checkbox',
    'Ext.Button'
  ],
  config: {
    layout: 'hbox',
    cls: 'task-list-item',
    items: [
      {
        xtype: 'checkboxfield',
        cls: 'mark-btn',
        flex: 0
      }, {
        xtype: 'container',
        flex: 1
      }, {
        xtype: 'button',
        action : 'delete-task',
        cls: 'delete-btn'
      }
    ]
  },
  updateRecord: function(record){
    var checkboxfield = this.child('checkboxfield'),
        deleteBtn = this.child('button'),
      nameField = this.child('container');

    if(record) {
      deleteBtn.setRecord(record);
      checkboxfield.setRecord(record);
      nameField.setRecord(record);
      nameField.setHtml(record.get('name'));
    }
    this.callParent(arguments);
  }
});