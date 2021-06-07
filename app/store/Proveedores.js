/*
@DataSet :
Stores para los mantenimientos de las tablas maestras
==============================================================
*/
Ext.define('kokojump.store.Proveedores', {
    extend: 'Ext.data.Store',
    requiere: ['kokojump.model.DataModels'],
    model   :'kokojump.model.Proveedor',
    autoLoad    : true,
    remoteSort  : true,
    autoSync    : true,
    autoDestroy : true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/proveedores_listado'},
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    }
});
