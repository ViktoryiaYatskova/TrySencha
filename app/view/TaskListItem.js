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
    itemId: 'task-list-item',
    cls: 'task-list-item',
    items: [
      {
        xtype: 'checkboxfield',
        itemId: 'mark-btn',
        cls: 'mark-btn',
        bubbleEvents: ['change'],
        flex: 0
      }, {
        xtype: 'component',
        itemId: 'task-name',
        flex: 1
      }, {
        xtype: 'button',
        bubbleEvents: ['tap'],
        itemId: 'delete-btn',
        cls: 'delete-btn'
      }
    ],

    control: {
      '#mark-btn': {
        change: function(elem, value){
          var record = this.getRecord();
          record.set('done', value); //using set-function causes generation of new event for checkbox
        }
      },
      '#delete-btn': {
        tap: function(elem, event){
          event.record = this.getRecord();
          this.parent.remove(this);
        }
      }
    }
  },
  updateRecord: function(record, newRecord, eOpts){
    debugger;
    this.callParent.apply(this, Array.prototype.splice.call(arguments));
    var markBtn = this.child('#mark-btn'), nameField = this.child('#task-name');

    if(record && !nameField.getHtml()) {
      nameField.setHtml(record.get('name'));
      markBtn.setValue(record.get('done'));
    }
  }
});