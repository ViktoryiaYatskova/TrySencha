/**
 * Created by Viktoria on 12.02.2015.
 */
Ext.define('MyApp.model.TaskListItemModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['done', 'name']
    }
});