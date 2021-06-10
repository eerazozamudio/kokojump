/*
@DataSet :
Stores para los mantenimientos de las tablas maestras
==============================================================
*/
Ext.define('kokojump.store.Compras', {
    extend: 'Ext.data.Store',
    storeId : 'storeCompras',
    requiere: ['kokojump.model.DataModels'],
    model   :'kokojump.model.Compra',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : {
        desde : null,
        hasta : null
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/compra_listar'},
        reader: {
            type: 'json',

            rootProperty: 'data',
            totalProperty: 'total'
        }
    }
});
