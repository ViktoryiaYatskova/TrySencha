Ext.define('MyApp.view.Main', {
  extend: 'Ext.Panel',
  xtype: 'main',
  requires: [
    'Ext.TitleBar',
    'MyApp.view.TaskList',
    'Ext.field.Text',
    'Ext.Button',
    'Ext.Label',
    'MyApp.model.TasksCount'
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
          id: 'task-field',
          placeHolder: 'Add task...'
        },{
          xtype: 'button',
          iconCls: 'add',
          cls: 'header-round-btn',
          id: 'add-btn',
          disabled: true
        },{
          xtype: 'button',
          iconCls: 'done',
          cls: 'header-round-btn',
          id: 'check-all-btn',
          disabled: true
        },{
          xtype: 'button',
          iconCls: 'delete',
          itemId: 'delete-all-btn',
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
            itemId: 'show-all-btn',
            text: 'All',
            cls: 'footer-btn',
            disabled: true
          },{
            xtype: 'button',
            itemId: 'show-complete-btn',
            text: 'Complete',
            cls: 'footer-btn'
          },{
            xtype: 'button',
            itemId: 'show-active-btn',
            text: 'Active',
            cls: 'footer-btn'
          },{
            xtype: 'label',
            record: Ext.create('MyApp.model.TasksCount', {count: 0}),
            flex: 1,
            id: 'active-tasks-lbl',
            tpl: new Ext.XTemplate([
              '<span>You have {count} active tasks</span>'
            ])
          }
        ]
      },{
        xtype: 'task-list',
        id: 'task-list',
        store: Ext.create('Ext.data.Store', {
          storeId: 'TaskStore',
          model: 'MyApp.model.TaskListItemModel'
        })
      }
    ]
  }
});