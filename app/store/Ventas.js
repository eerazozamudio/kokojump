Ext.define('kokojump.store.Ventas', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/*
@DataSet :
Stores para los mantenimientos de las tablas maestras
==============================================================
*/
Ext.define('kokojump.store.Pedidos', {
    extend: 'Ext.data.Store',
    storeId : 'storePedidos',
    requiere:['kokojump.model.DataModels'],
    model   :'kokojump.model.Pedidos',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : {desde : null , hasta: null,idlocal:0},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/pedidos_listado'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/**
 * Detalle de Venta
 * @DataSet
 * @type {store}
 */
Ext.define('kokojump.store.PedidoDetalle', {
    extend: 'Ext.data.Store',
    storeId : 'storePedidoDetalle',
    requiere:['kokojump.model.DataModels'],
    model   :'kokojump.model.DetallePedido',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : {idven : 0},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/pedido_detalle'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});




/**
 * Control de listado de niños jugando
 * @DataSet
 * @type {store}
 */
Ext.define('kokojump.store.Control', {
    extend: 'Ext.data.Store',
    storeId : 'storePedidoDetalle',
    requiere:['kokojump.model.DataModels'],
    model   :'kokojump.model.Control',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : {idlocal: 0 },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/control_ninos'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/**
 * Control de listado de gastos del administrador
 * @DataSet
 * @type {store}
 */
Ext.define('kokojump.store.Gastos', {
    extend: 'Ext.data.Store',
    storeId : 'storePedidos',
    requiere:['kokojump.model.DataModels'],
    model   :'kokojump.model.Gasto',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : {desde : '' , hasta: '',local:0,admin:0},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/gastos_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});



/*
@DataSet :
Stores para los eventos
==============================================================
*/
Ext.define('kokojump.store.Eventos', {
    extend: 'Ext.data.Store',
    storeId : 'storeEventos',
    requiere:['kokojump.model.DataModels'],
    model   :'kokojump.model.Evento',
    autoLoad: false,
    extraParams : {fecha : null },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/evento_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/*
@DataSet :
Stores para los eventos
==============================================================
*/
Ext.define('kokojump.store.EventosMes', {
    extend: 'Ext.data.Store',
    storeId : 'storeEventosMes',
    requiere:['kokojump.model.DataModels'],
    model   :'kokojump.model.Evento',
    autoLoad: false,
    extraParams : {fecha : null },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/evento_listar_mes'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});
