/**
 * Created by Viktoria on 12.02.2015.
 */
Ext.define('MyApp.model.TaskListItem', {
    extend: 'Ext.data.Model',
    config: {
      cls: 'task-list-item',
      fields: ['done', 'name']
    }
});