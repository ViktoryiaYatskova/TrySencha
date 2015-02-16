/**
 * Created by Viktoria on 12.02.2015.
 */
Ext.define('MyApp.model.TaskListItem', {
    extend: 'Ext.data.Model',
    config: {
      useCache: false,
      fields: ['done', 'name']
    }
});