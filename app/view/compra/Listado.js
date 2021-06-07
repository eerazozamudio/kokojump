
Ext.define('kokojump.view.compra.Listado',{
    extend: 'Ext.panel.Panel',
    xtype: 'listadocompras',
    requires: [
        'kokojump.view.compra.ListadoController',
     
    ],

    controller: 'compra-listado',
    layout: {
        type: 'fit',
        align: 'stretch'
    },
    initComponent:function(){
        me = this;
        let conductores = '' ; //tools.Util.getStoreById('stConductores').load();
        Ext.apply(me, {
            items:[
                me._grilla(conductores)
            ]
        });
        me.callParent();
    },
    _grilla: function (_conductores) {
        return {
            xtype : 'panel',
            layout: {
                type: 'fit',
                align: 'stretch'
            },
            scrollable : 'x',
            items:[
                {
                    xtype: 'grid',
                    itemId: 'dgvCompras',
                    flex : 1,
                    viewConfig: {
                        preserveScrollOnRefresh: true,
                        preserveScrollOnReload: true
                    },
                    headerBorders: false,
                    rowLines: true,
                    scrollable: false,
                    sortableColumns :false,
                  //  store : _conductores,
                  //  bbar: me._paginacion(),
                    columns: [
                        {
                            dataIndex: 'nombreApellido',
                            header: '<div>Nombres y </div><div>Apellidos</div>',
                            flex: 2,
                            align : 'left',
                           
                        },
                      
                        {
                            dataIndex: '',
                            header: '<div>Estado</div><div>Conexion</div>',
                            flex: 1,
                            align : 'center',
                        
                        },
                        {
                            dataIndex: 'tiempo_conexion',
                            header: '<div>Tiempo</div><div>Conexion</div>',
                            flex: 1,
                            align : 'center'
                        },
                        {
                            dataIndex: 'tipoDocumento',
                            header: '<div>Tipo</div><div>Documento</div>',
                            flex: 1,
                            align : 'center',
                            renderer:function(value,metadata,record){
                                return record.get('tipoDocumento').nombre;
                            }
                            
                        },
                        {
                            dataIndex: 'numeroDocumento',
                            header: '<div>Nro</div><div>Documento</div>',
                            flex: 1,
                            align : 'center'
                        },
                        {
                            dataIndex: 'marca',
                            text: 'Marca',
                            flex: 1,
                            align : 'center',
                            renderer:function(value,metadata,record){
                                let _marca = '';
                                record._vehiculos.each(function(r){
                                    console.log( r.get('marca').marca);
                                    _marca = r.get('marca').marca;
                                });
                                return  _marca;
                            }
                        },
                        {
                            dataIndex: 'placa',
                            text: 'Placa',
                            align : 'center',
                            flex: 1,
                            renderer:function(value,metadata,record){
                                let _placa = '';
                                record._vehiculos.each(function(r){
                                    _placa = r.get('placa');
                                });
                                return _placa;
                            }
                        },
                        {
                            dataIndex: 'idEstadoConductor',
                            text: 'Estado',
                            align : 'center',
                            flex: 1,
                            
                            renderer:function(value,metadata,record){
                                return record.get('estadoConductor').nombre;
                            }
                        },
                        {
                            xtype:'actioncolumn',
                            width:70,
                            align: 'center',
                            anchorSize:70,
                            items: [
                                   {
                                        iconCls: 'x-fa fa-magic',
                                        tooltip: 'Editrar',
                                        handler: 'onClick_Editar',
                                        padding : '5'
                                    },
                                    {
                                        iconCls: 'x-fa fa-trash',
                                        tooltip: 'Baja',
                                        handler: 'onClick_Anular',
                                        padding : '5'
                                    }
                            ]
                        }                      
                    ]
        
                }
              
            ]
        };
    },
});
