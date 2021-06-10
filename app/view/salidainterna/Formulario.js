
Ext.define('kokojump.view.salidainterna.Formulario',{
    extend: 'Ext.panel.Panel',
    xtype   : 'salidainternaregistro',
    requires: [
        'kokojump.view.salidainterna.FormularioController',
        
    ],

    controller: 'salidainterna-formulario',
    layout :{
        type : 'hbox',
        align :'stretch'
    },
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
            flex : 1,
            items : [
                {
                   xtype : 'grid',
                   fled : 1,
                   itemId : "dgvSalidaInterna",
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
                           editable : true,
                           minChars : 4,
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
            xtype : 'form',
            itemId : 'frmSalidaInterna',
            flex : 1,
            bodyPadding : 10,
            layout : {
                type : 'vbox',
                align : 'stretch'
            },
            items   : [
                
                    {
                        xtype :'hiddenfield',
                        itemId : 'jsondetalle',
                        value : '',
                        name : 'jsondetalle'
                    },
                    {
                        xtype :'hiddenfield',
                        itemId : 'idsalidainterna',
                        value : 0,
                        name : 'idsalidainterna'
                    },
                    {
                         xtype : 'fieldset',
                         title : 'Detalle de Salida',
                         layout : {
                            type : 'vbox',
                            align : 'stretch'
                        },
                         items :  [
                             {
                                 xtype : 'textarea',
                                 name : 'conceptosalida',
                                 flex: 1,
                                 padding : '10 5 10 5',
                                 emptyText : 'Concepto de salida'
                             },
                             {
                                xtype : 'textfield',
                                name : 'persona',
                                flex: 1,
                                padding : '10 5 10 5',
                                emptyText : 'Persona que se entrega'
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
                                editable : false,
                                allowBlank:false,
                                name : 'fecha'
                            },
                           /* {
                                xtype : 'textfield',
                                fieldLabel: 'Nro Documento',
                                padding : '10 5 10 5',
                                allowBlank:false,
                                name : 'nrodocumento'
                            }*/
                        ]
                    },
                    {
                        xtype : 'button',
                        text  : 'GUARDAR SALIDA',
                        handler : 'onClickGuardar',
                        
                        padding : '10 5 10 5',
                        
                    },
                    {
                        xtype : 'container',
                        height : 15
                    },
                    {
                        xtype : 'button',
                        text  : 'CANCELAR',
                        handler : 'onClickCancelar',
                        padding : '10 5 10 5',
                        
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
