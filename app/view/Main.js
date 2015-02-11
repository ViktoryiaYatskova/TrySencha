var listStore = Ext.create('Ext.data.Store', {
    storeId: 'TaskStore',
    fields: ['name', 'done', 'number'],
    data: []
});

var addBtn = Ext.create('Ext.Button', {
        iconCls: 'add',
        cls: 'header-round-btn',
        disabled: true,
        handler: function() {
            addTask(textfield, listStore);
            this.disable();
        }
    }
);

var deleteBtn = Ext.create('Ext.Button',{
    iconCls: 'delete',
    cls: 'header-round-btn',
    disabled: true,
    handler: function() { //removing all items of list
        if(!listStore.isFiltered())
            listStore.removeAll();
        else
            listStore.each(function(record){
                listStore.remove(record);
            });
        
        list.refresh();
        
        if(!markBtn.isDisabled()) //insure that only active tasks were removed
            activeTasksCountRecord.setCount(listStore.getCount());
        
        this.disable();
        markBtn.disable();
    }
});

var markBtn = Ext.create('Ext.Button',{
    iconCls: 'done',
    cls: 'header-round-btn',
    disabled: true,
    handler: function () { //mark as done all items of list
        listStore.each(function(record){
            record.set('done', true);
        });
        list.refresh();
        activeTasksCountRecord.setCount(0);
        this.disable();
    }
});

var list = Ext.create('Ext.List', {
    allowDeselect: true,
    disableSelection: true,
    itemTpl: new Ext.XTemplate([
    '<div>',
    '    <input class="mark-btn" type="checkbox" {[values.done ? \'checked\' : \'\']}>',
    '    <span>{name}</span>',
    '    <span class="delete-btn"></span>',
    '</div>'
    ].join('')),
    store: 'TaskStore',

    listeners: [
        {
            event: 'itemsingletap',
            fn: function(item, index, target, record, event) {
                if (event.target.classList.contains('delete-btn')) {
                    if(!record.get('done'))
                        activeTasksCountRecord.decreaseCount();
                    
                    listStore.remove(record);
                    list.refresh();
                }
                if (event.target.type === 'checkbox') {
                    record.data.done = !record.get('done'); //using set-function causes generation of new event for checkbox
                    record.set();//to refresh record view

                    record.data.done? activeTasksCountRecord.decreaseCount(): activeTasksCountRecord.increaseCount();
                    list.refresh();
                    if (markBtn.isDisabled()) markBtn.enable();
                }
            }
        }
    ]
});

var textfield = Ext.create('Ext.field.Text',{
        flex: 1,
        placeHolder: 'Add task...',
        listeners: {
            scope: this,
            keyup: function(field, evOpt) {
                var valueLength = field.getValue().length;
                if(addBtn.isDisabled() && valueLength > 0){
                    addBtn.enable();
                }
                if(!addBtn.isDisabled() && valueLength === 0){
                    addBtn.disable();
                }
                if (evOpt.event.keyIdentifier === 'Enter') {
                    addTask(field, listStore);
                    addBtn.disable();
                }
            }
        }
    }
);

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

var showAllBtn = Ext.create('Ext.Button',{
    text: 'All',
    cls: 'footer-btn',
    disabled: true,
    handler: function(){
        this.disable();
        showCompleteBtn.enable();
        showActiveBtn.enable();

        if(listStore.getAllCount() > listStore.getCount())
            activateEditBtn(deleteBtn, markBtn);
        else
            activateEditBtn(deleteBtn);
        
        listStore.clearFilter();
    }
});

var showCompleteBtn = Ext.create('Ext.Button',{
    text: 'Complete',
    cls: 'footer-btn',
    handler: function () {
        this.disable();
        showAllBtn.enable();
        showActiveBtn.enable();

        listStore.clearFilter();
        listStore.filter(completeFltr);
        
        activateEditBtn(deleteBtn);
        markBtn.disable();
    }
});

var showActiveBtn = Ext.create('Ext.Button',{
    text: 'Active',
    cls: 'footer-btn',
    handler: function () {
        this.disable();
        showCompleteBtn.enable();
        showAllBtn.enable();

        listStore.clearFilter();
        listStore.filter(activeFltr);
        activateEditBtn(deleteBtn, markBtn);
    }
});

function addTask(field, listStore){
    listStore.add({name: field.getValue(), done: false});
    field.setValue('');
    activeTasksCountRecord.increaseCount();
    list.refresh();
    if(listStore.getCount() === 1){
        deleteBtn.enable();
        markBtn.enable();
    }
    if(markBtn.isDisabled()) markBtn.enable();
}

function activateEditBtn(){
    if(listStore.getCount() > 0)
        Array.prototype.forEach.call(arguments, function(button){
            if(button.isDisabled())
                button.enable();
        });
}
var activeTasksCountRecord = Ext.create('MyApp.model.TasksCount', {count: 0});

Ext.define('MyApp.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.List',
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

            items: [
                textfield,
                addBtn,
                markBtn,
                deleteBtn
            ]
        },
        {
            xtype: 'toolbar',
            docked: 'bottom',
            
            items: [
                showAllBtn,
                showCompleteBtn,
                showActiveBtn,
                {
                    xtype: 'label',
                    record: activeTasksCountRecord,
                    flex: 1,
                    cls: 'active-tasks-lbl',
                    tpl: new Ext.XTemplate([
                        '<span>You have {count} active tasks</span>'
                    ])
                }
            ]
        },
        list
        ]
    }
});