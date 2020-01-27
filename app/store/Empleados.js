//Ext.define('megafillsperu.store.StoreMantenimientos', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/* 
@DataSet :
Stores para los mantenimientos de las tablas Personal 
==============================================================
*/
Ext.define('kokojump.store.Empleados', {
    extend: 'Ext.data.Store',
    requiere:['kokojump.model.DataModels'],
    model   :'kokojump.model.Persona',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/personal_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

