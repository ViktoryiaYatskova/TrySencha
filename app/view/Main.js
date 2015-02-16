Ext.define('MyApp.view.Main', {
  extend: 'Ext.Panel',
  xtype: 'main',
  requires: [
    'Ext.TitleBar',
    'Ext.field.Text',
    'Ext.Button',
    'Ext.Label',
    'MyApp.model.TaskCount',
    'MyApp.model.TaskListItem',
    'MyApp.view.TaskList'
  ],
  config: {
    layout: 'fit',
    scrollable: true,

    items: [{
      xtype: 'toolbar',
      docked: 'top',
      layout: 'hbox',

      items: [{
          xtype: 'textfield',
          flex: 1,
          placeHolder: 'Add task...'
        },{
          xtype: 'button',
          iconCls: 'add',
          cls: 'header-round-btn',
          action : 'add-task',
          disabled: true
        },{
          xtype: 'button',
          iconCls: 'done',
          cls: 'header-round-btn',
          action: 'check-all',
          disabled: true
        },{
          xtype: 'button',
          iconCls: 'delete',
          action: 'delete-all',
          cls: 'header-round-btn',
          disabled: true
        }
      ]
    },{
        xtype: 'toolbar',
        docked: 'bottom',
        cls: 'filter-bar',

        items:[{
            xtype: 'button',
            action: 'show-all',
            text: 'All',
            cls: 'footer-btn',
            disabled: true
          },{
            xtype: 'button',
            action: 'show-complete',
            text: 'Complete',
            cls: 'footer-btn'
          },{
            xtype: 'button',
            action: 'show-active',
            text: 'Active',
            cls: 'footer-btn'
          },{
            xtype: 'label',
            record: Ext.create('MyApp.model.TaskCount', {count: 0}),
            flex: 1,
            cls: 'active-tasks-lbl',
            tpl: new Ext.XTemplate([
              '<span>You have {count} active tasks</span>'
            ])
          }
        ]
      },{
        xtype: 'task-list',
        store: {
          storeId: 'TaskStore',
          model: 'MyApp.model.TaskListItem'
        }
      }
    ]
  }
});