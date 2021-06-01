
/*
@DataSet :
Stores para los mantenimientos de las tablas maestras
==============================================================
*/
Ext.define('kokojump.store.Presentacion', {
    extend: 'Ext.data.Store',
    alias  : 'widget.storepresentacion',
    storeId : 'storePresentacion',
    requiere: ['kokojump.model.DataModels'],
    model   :'kokojump.model.Presentacion',
    autoLoad    : true,
    remoteSort  : true,
    autoSync    : true,
    autoDestroy : true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/presentacion_listado'},
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    }
});
