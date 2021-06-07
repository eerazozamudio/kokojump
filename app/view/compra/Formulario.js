
Ext.define('kokojump.view.compra.Formulario',{
    extend: 'Ext.form.Panel',
    xtype   : 'compraregistro',
    itemId : 'clienteregistro',
    requires: [
        'kokojump.view.compra.FormularioController',
     
    ],
    controller: 'compra-formulario',
    layout :{
        type : 'hbox',
        align :'stretch'
    },
    tiposervicio : 0,
    _detalle:function(me){
        _storeProducto     = Ext.create('kokojump.store.Productos');
        _storeProducto.load({
                params : {
                    idlocal  : Ext.util.Cookies.get('idlocal'),
                    idcategoria: 6 }
        });

        _storeDetalle = Ext.create('kokojump.store.DetalleCompra');
        _storeDetalle.load();
        rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        return  {
            xtype : 'panel',
            flex : 2,
            bbar: [
                '->',
                {
                    xtype: 'numberfield',
                    fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Total :</div></b>',
                    itemId: 'txtTotalVenta',
                    decimalSeparator: '.',
                    readOnly: true,
                    fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',

                }
            ],
            items : [
                {
                   xtype : 'grid',
                   fled : 1,
                   itemId : "dgvCompraDet",
                   store : _storeDetalle,
                   tbar :  [
                       {
                           xtype : 'combo',
                           emptyText : 'SELECIONAR UN PRODUCTO',
                           flex : 1,
                           store : _storeProducto,
                           displayField : 'nombre',
                           valueField : 'idprod', 
                           queryMode : 'local',
                           editable : false,
                           listeners : {
                               select: 'onSelectProducto'
                           }
                       }
                   ],
                   plugins: [rowEditing],
                   selModel: 'cellmodel',
                   plugins: {
                       ptype: 'cellediting',
                       clicksToEdit: 1
                   },
                   listeners: {
                    edit: 'onEditorCalcularTotalOrdenCompraEditar'
                   },
                   columns : [
                       {
                           header : 'Producto',
                           dataIndex: 'nombre',
                           flex: 2
                       },
                       {
                        header : '<div>Stock</div><div>Actual</div>', 
                        flex: 0.5,
                        dataIndex: 'stock',
                        align : 'center',
                      
                    },
                       {
                           header : '<div>Cantidad</div><div>Unidades</div>', 
                           flex: 0.5,
                           dataIndex: 'cantidad',
                           align : 'center',
                           editor: {
                                xtype: 'numberfield',
                                value: 0,
                                minValue: 0,
                                itemId: 'txtCantidadUnidad'

                            }
                       },
                       {
                        header : '<div>Precio</div><div>Compra</div>', 
                        flex: 1,
                        align : 'right',
                        dataIndex: 'preciocompra',
                        editor: {
                             xtype: 'numberfield',
                             value: 0,
                             minValue: 0,
                             itemId: 'txtPrecioCompra'

                         }
                    },
                       {
                           header : 'Total',
                           flex: 1,
                           dataIndex: 'total',
                           align : 'right',

                       },
                       {
                        xtype: 'widgetcolumn',
                        width: 50,
                        widget: {
                            xtype: 'button',
                            width: 30,
                            glyph: 0xf014,
                            handler: 'onClickEliminar'

                        }

                    }

                   ]
               }
            ]
        };
    },
    _formulario: function(me){
        _storeProv     = Ext.create('kokojump.store.Proveedores');
        return   {
            xtype : 'panel',
            flex : 1,
            bodyPadding : 10,
            layout : {
                type : 'vbox',
                align : 'stretch'
            },
            items   : [
                    {
                         xtype : 'fieldset',
                         title : 'Proveedor',
                         layout : {
                            type : 'fit',
                            align : 'stretch'
                        },
                         items :  [
                             {
                                 xtype : 'combo',
                                 emptyText : '-- SELECCIONAR PROVEEDOR --',
                                 flex :1,
                                 padding : '10 5 10 5',
                                 store : _storeProv,
                                 valueField : 'idprov',
                                 displayField : 'razonsocial', 
                                 queryMode: 'local',
                                 

                             }
                         ]

                    },
                    {
                        xtype : 'fieldset',
                        items : [
                            {
                                xtype : 'datefield',
                                fieldLabel: 'Fecha',
                                padding : '10 5 10 5',
                                value : new Date(),
                                editable : false
                            },
                            {
                                xtype : 'textfield',
                                fieldLabel: 'Nro Documento',
                                padding : '10 5 10 5'
                            }
                        ]
                    },
                    {
                        xtype : 'button',
                        text  : 'GUARDAR COMPRA'
                    }
                ]
        };
    },
    initComponent: function(){
        me = this;
        Ext.apply(me,{
            items :[
                me._detalle(me),
                me._formulario(me)
            ]
        });
        me.callParent();
    }
});
