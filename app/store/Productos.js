//Ext.define('megafillsperu.store.StoreMantenimientos', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/*
@DataSet :
Stores para los mantenimientos de las tablas maestras
==============================================================
*/
Ext.define('kokojump.store.Productos', {
    extend: 'Ext.data.Store',
    storeId : 'storeProductos',
    requiere:['kokojump.model.DataModels'],
    model   :'kokojump.model.Producto',
    autoLoad: false,
    sorters: [{
        property: 'nombre',
        direction: 'ASC' // or 'ASC'
    }],
    extraParams : {
        idlocal : 0 ,
        idcategoria : 0 , 
        idsubcategoria : 0,
        nombreprod : ''
    },
    proxy: {
        type: 'ajax',
        api: {
            read: 'resources/api/producto_lista'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('kokojump.store.Categorias', {
    extend: 'Ext.data.Store',
    requiere:['kokojump.model.DataModels'],
    model   :'kokojump.model.Categoria',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/categoria_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('kokojump.store.SubCategorias', {
    extend: 'Ext.data.Store',
    requiere:['kokojump.model.DataModels'],
    model   :'kokojump.model.SubCategoria',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : { idcategoria : 0 , idsubcategoria : 0 },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/subcategoria_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('kokojump.store.FormaPagos', {
    extend: 'Ext.data.Store',
    requiere:['kokojump.model.DataModels'],
    model   :'kokojump.model.FormaPago',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/formapago_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});




Ext.define('kokojump.store.DetalleCompra', {
    extend: 'Ext.data.Store',
    fields: [
        {name: "idprod", type:'int' },
        {name: "nombre", type:'string' },
        {name: "cantidad", type:'float' },
        {name: "stock", type:'int' },
        {name: "preciocompra", type:'string'}, 
        {name: "total", type:'float' }
    ],
    proxy: { 
        type: 'memory' 
    }
});
