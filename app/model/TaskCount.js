/**
 * Created by Viktoria on 11.02.2015.
 */
Ext.define('MyApp.model.TaskCount', {
    extend: 'Ext.data.Record',
    xtype: 'task-count-record',
    config: {
        fields: ['count']
    },
    increaseCount: function(){
        this.set('count', this.get('count')+1);
    },
    decreaseCount: function(){
        var count = this.get('count');
        if(count > 0)
            this.set('count', count-1);
    },
    setCount: function(count){
        this.set('count', count);
    }
});
