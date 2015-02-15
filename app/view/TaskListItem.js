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
    bubbleEvents: ['change', 'tap', 'changeCheckCount'],
    listeners:[{
        element: 'element',
        change: function(){debugger;},
        delegate: '#mark-btn'
      },{
      element: 'element',
      tap: function(){debugger;},
      delegate: '#delete-btn'
    }
    ],
    items: [
      {
        xtype: 'checkboxfield',
        itemId: 'mark-btn',
        cls: 'mark-btn',
        bubbleEvents: ['change', 'changeCheckCount'],
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
        change: function(){
          var record = this.getRecord(),
              checkAll;
          record.set('done', !record.get('done')); //using set-function causes generation of new event for checkbox
          //record.data.done ? this.up().fireEvent('changeCheckCount', false) : this.up().fireEvent('changeCheckCount', true);

          debugger;
          this.fireEvent('changeCheckCount', false);
          this.up().fireEvent('changeCheckCount', false);

          //list.refresh();

          //var checkAllBtn = this.up('#check-all-btn');
          //if (checkAllBtn.isDisabled()) checkAllBtn.enable();
          return true;
        }
      },
      '#delete-btn': {
        tap: function(){
          var record = this.getRecord();

          if (!record.get('done'))
            this.up().fireEvent('changeCheckCount', false);

          //this.up().getStore().remove(record);
          //list.refresh();
        }
      }
    }
  },

  updateRecord: function(record, newRecord, eOpts){
    this.callParent(record, newRecord, eOpts);
    var newDoneVal = (newRecord||record).get('done'),
        newNameVal = (newRecord||record).get('name');

    if(newDoneVal != record.get('done'))
      this.down('#mark-btn').setValue(newDoneVal);

    this.down('#task-name').setHtml(newNameVal);

    return false;
  },

  checkTask: function(){

  }
});