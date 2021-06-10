
Ext.define('kokojump.view.salidainterna.Listado',{
    extend: 'Ext.panel.Panel',
    xtype: 'listadosalidasinternas',

    requires: [
        'kokojump.view.salidainterna.ListadoController',
        
    ],
    layout: {
        type: 'fit',
        align: 'stretch'
    },
    controller: 'salidainterna-listado',
    initComponent:function(){
        me = this;
        let compras = ""; //Ext.create('kokojump.store.Compras');
       // compras.load();
        Ext.apply(me, {
            items:[
                me._grilla(compras)
            ]
        });
        me.callParent();
    },
    _grilla: function (compras) {
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
                    /*viewConfig: {
                        preserveScrollOnRefresh: true,
                        preserveScrollOnReload: true
                    },*/
                    //headerBorders: false,
                    //rowLines: true,
                    //scrollable: false,
                    //sortableColumns :false,
                  //  store : compras,
                  //  bbar: me._paginacion(),
                    columns: [
                        {
                            dataIndex: 'documento',
                            header: '<div>Documento de </div><div>Compra</div>',
                            flex: 1,
                            align : 'left',
                           
                        },
                        {
                            dataIndex: 'fecha',
                            header: '<div>Fecha</div><div>Compra</div>',
                            flex: 1,
                            align : 'center'
                        },
                      
                        {
                            dataIndex: 'razonsocial',
                            header: '<div>Proveedor</div>',
                            flex: 2,
                            align : 'center',
                        
                        },
                        {
                            xtype: 'numbercolumn', 
                            format:'0.00' ,
                            dataIndex: 'total',
                            header: '<div>Total</div>',
                            flex: 1,
                            align : 'right'
                        },
                      
                        {
                            xtype: 'widgetcolumn',
                            width: 50,
                            widget: {
                                xtype: 'button',
                                flex: 1,
                                glyph: 0xf044,
                               // handler: 'onClickImprimirContrato',
                               // tooltip : 'Imprimir contrato del evento'
                            }
                        },
                        {
                            xtype: 'widgetcolumn',
                            width: 50,
                            widget: {
                                xtype: 'button',
                                flex: 1,
                                glyph: 0xf014,
                               // handler: 'onClickImprimirContrato',
                               // tooltip : 'Imprimir contrato del evento'
                            }
                        },

                                          
                    ]
        
                }
              
            ]
        };
    },
});
