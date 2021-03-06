Ext.define('kokojump.store.Apoderados', {
    extend: 'Ext.data.Store',
    storeId : 'storeApoderados',
    requiere: ['kokojump.model.DataModels'],
    model   :'kokojump.model.Apoderado',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : {dni : null},
    pageSize: 50,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/apoderado_listado'},
        reader: {
            type: 'json',

            rootProperty: 'hijos'
            //totalProperty: 'total'
        }
    }
});

Ext.define('kokojump.store.Ninos', {
    extend: 'Ext.data.Store',
    requiere: ['kokojump.model.DataModels'],
    model   :'kokojump.model.Nino',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : {
        nombresapellidos : null
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/ninos_buscar'},
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('kokojump.store.NinosTodos', {
    extend: 'Ext.data.Store',
    requiere: ['kokojump.model.DataModels'],
    model   :'kokojump.model.NinoTodos',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/ninos_todos'},
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
Ext.define('kokojump.store.Apoderados', {
    extend: 'Ext.data.Store',
    requiere: ['kokojump.model.DataModels'],
    model   :'kokojump.model.Apoderados',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : {
        datos : ''
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/apoderado_todos'},
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
