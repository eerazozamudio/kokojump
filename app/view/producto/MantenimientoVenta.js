Ext.define('kokojump.view.producto.MantenimientoVenta', {
    extend: 'Ext.panel.Panel',
    xtype: 'wRegProductoVenta',
    alias: 'widget.wRegProductoVenta',
    requires: [
        'Ext.layout.container.HBox',
        'kokojump.view.producto.ProductoController',
        'Ext.grid.*',
        'Ext.form.field.Number',
        'Ext.data.StoreManager'
    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
   // bodyPadding: 5,
    defaults: {
        frame: false,
      //  bodyPadding: 5
    },
    controller:'productos',
    initComponent: function () {
        storeProducto  = Ext.create('kokojump.store.Productos');
        storeProducto.load({
            params : {idlocal  : Ext.util.Cookies.get('idlocal'),idcategoria:6}
       });
        storeCategoria = Ext.create('kokojump.store.Categorias');
        storePresentacion = Ext.create('kokojump.store.Presentacion');
         Ext.apply(this, {
            items: [{
                    ///title: 'Registros',
                    flex: 3,
                    margin: '0 3 0 0',
                    layout: 'fit',
                    items: [{
                        xtype: 'grid',
                        itemId: 'dgvProductos',
                        store: storeProducto,
                        reference: 'dgvProductos',
                        sortableColumns: false,
                        columns: [
                           /*{
                                text: 'Codigo',
                                dataIndex: 'idprod',
                                flex: 1,
                                align: 'center'
                            },*/
                            {
                                text: 'Descripcion',
                                dataIndex: 'nombre',
                                flex: 2
                            },
                            {
                                text: 'Categoria',
                                dataIndex: 'categoria',
                                flex: 1
                            },
                            {
                                text: 'Minutos',
                                dataIndex: 'minutos',
                                flex: 0.5
                            },
                            {
                                text: 'Orden',
                                dataIndex: 'orden',
                                flex: 0.5
                            },

                            {
                                xtype: 'numbercolumn', format:'0.00',
                                text: 'Precio',
                                dataIndex: 'precioventa',
                                flex: 1,
                                align: 'right'
                            },
                            {
                                xtype: 'widgetcolumn',
                                flex: 0.5,
                                widget: {
                                    xtype: 'button',
                                    flex: 1,
                                    glyph: 0xf014,
                                    handler: 'onClickEliminarProducto'

                                }

                            }
                        ],
                    
                        listeners: {
                             cellclick: 'onClickItemProducto'
                        }

                    }]
                },
                {
                    title: 'Informacion',
                    flex: 1.5,
                    margin: '0 10 0 0',
                    autoScroll: true,
                    items: [{
                        xtype: 'form',
                        reference: 'myFrmProducto',
                        padding : 10,
                        url : kokojump.util.Rutas.productoGuardar,
                        layout: {
                            type: 'vbox',
                            pack: 'start',
                            align: 'stretch',
                            padding : 10,
                        },
                        items: [{
                                xtype: 'hiddenfield',
                                name: 'idprod',
                                itemId:'idprod'

                            },
                            {
                                xtype :'hiddenfield',
                                name  : 'idlocal',
                                value :   Ext.util.Cookies.get('idlocal')
                            },
                            {
                                xtype: 'label',
                                text: 'Nombre del Producto'
                            },
                            {
                                xtype: 'textarea',
                                name: 'nombre',
                                itemId:'txtNombreProd',
                                allowBlank: false,
                            },
                            {
                                xtype: 'label',
                                text: 'Presentacion del producto'
                            },
                            {
                                xtype: 'combo',
                                name: 'idpresentacion',
                                store:storePresentacion,
                                queryMode: 'local',
                                displayField: 'descripcion',
                                valueField: 'idpresentacion',
                                editable: false,
                                flex: 2,
                                itemId:'cboIdPresentacion',
                                emptyText : '--- SELECCIONAR---',
                                editable: false

                            },
                          
                            {
                                xtype: 'label',
                                text: 'Codigo de Barra'
                            },
                           
                            {
                                xtype: 'textfield',
                                name: 'codigobarra',
                                itemId:'codigobarra',
                                allowBlank: true
                            },
                            {
                                xtype: 'label',
                                text: 'Categoria'
                            },
                            {
                                xtype: 'combo',
                                name: 'idcate',
                                //fieldLabel:'Categoria',
                                store:storeCategoria,
                                queryMode: 'local',
                                displayField: 'descripcion',
                                valueField: 'idcate',
                                editable: false,
                                flex: 2,
                                itemId:'cboCategoria',
                                value : 6,
                                readOnly : true

                            },
                          
                        
                            {
                             xtype:'container',
                             layout:'hbox',
                             padding:'5px 5px 5px 5px',
                             hidden:true,
                             items:[
                               {
                                  xtype: 'combo',
                                  name: 'idsubcate',
                                  fieldLabel:'Sub Categoria',
                                  //store: storeUM,
                                  queryMode: 'local',
                                  displayField: 'descripcion',
                                  valueField: 'id',
                                  editable: false,
                                  flex: 2
                              },
                               {
                                 xtype: 'button',
                                 glyph: kokojump.util.Glyphs.getGlyph('nuevo'),
                                 //handler: 'onClickMantenimiento',
                                 flex: 0.5
                               }
                             ]
                           },
                            {
                                xtype:'checkbox',
                                boxLabel : 'LLEVAR CONTROL DE SERVICIO',
                                name : 'llevacontrol',
                                reference :'llevacontrol',
                                hidden:true,

                            },
                            {
                                xtype:'checkbox',
                                boxLabel : 'Maneja Stock',
                                name : 'manejastock',
                                reference :'chkManejaStock',
                                width :50,
                                value : true
                               // hidden : true
                              },
                            {
                                xtype:'container',
                                layout: {
                                    type : 'hbox',
                                    align: 'stretch'
                                },
                                flex: 1,
                                items:[
                                  {
                                     xtype:'numberfield',
                                     name : 'stock',
                                     fieldLabel:'Stock',
                                     labelAlign:'left',
                                     flex: 1,
                                     align:'right',
                                     value : 0,
                                     allowNegative: true,
                                     hideTrigger: true,
                                     padding : 5,
                                     //styleField : 'fontSize:20px;'
                                     fieldStyle: 'text-align:center;font-size:20px;font-weight:bold; ',
                                    // hidden:true
                                 },
                                 {
                                    xtype:'numberfield',
                                    name : 'stockminimo',
                                    fieldLabel:'Stock Minimo',
                                    labelAlign:'right',
                                    flex: 1,
                                    align:'right',
                                    value : 0,
                                    allowNegative: true,
                                    hideTrigger: true,
                                    padding : 5,
                                    fieldStyle: 'text-align:center;font-size:20px;font-weight:bold; ',

                                },

                                ]
                            },
                            {
                                xtype: 'label',
                                text: 'Precio Venta'
                            },
                            {

                                xtype:'numberfield',
                               // fieldLabel:'Precio Venta',
                                name : 'precioventa',
                               // flex: 1,
                               fieldStyle: 'text-align:center;font-size:20px;font-weight:bold; ',
                                allowDecimals: true,
                                decimalSeparator: '.',
                                decimalPrecision:2,
                                step:'0.1',
                                value : 0,
                             },
                             {
                                xtype: 'label',
                                text: 'Precio Compra'
                            },
                             {

                                xtype:'numberfield',
                                name : 'preciocompra',
                                fieldStyle: 'text-align:center;font-size:20px;font-weight:bold; ',
                                allowDecimals: true,
                                decimalSeparator: '.',
                                decimalPrecision:2,
                                step:'0.1',
                                value : 0,
                             },
                             {
                               xtype:'container',
                               layout:'hbox',
                               padding : '5 0 5 0',
                               hidden : true,
                               items:[
                                 {
                                   xtype:'numberfield',
                                   fieldLabel :'Tiempo (min.)',
                                   flex :1,
                                   allowDecimals: false,
                                   decimalSeparator: '.',
                                   decimalPrecision:0,
                                   step:'1',
                                   value : 0,
                                   name : 'minutos'
                                 },
                                 {
                                   xtype:'numberfield',
                                   fieldLabel :'Orden',
                                   labelAlign : 'right',
                                   flex :1,
                                   allowDecimals: false,
                                   decimalSeparator: '.',
                                   decimalPrecision:0,
                                   step:'1',
                                   name : 'orden',
                                   value : 0
                                 },

                               ]
                             },


                             {
                                 xtype      :'filefield',
                                 name       :'fotoproducto',
                                 buttonText :'Foto',
                                 flex       : 1
                             },
                             {
                                  xtype: 'image',
                                  reference: 'fotoproducto',
                                  padding: '20 50 20 50',
                                  width: 70,
                                  height: 150
                             }

                        ],
                        bbar: [
                          '->',
                          {
                                xtype: 'button',
                                text: 'Nuevo',
                                iconCls: 'fa fa-file fa-2x',
                                scale: 'medium',
                                handler: 'onClickNuevoProducto'
                            },
                            {
                                xtype: 'button',
                                text: 'Grabar',
                                iconCls: 'fa fa-thumbs-o-up fa-2x',
                                scale: 'medium',
                                handler: 'onClickGuardarProducto'
                            }

                        ]

                    }]

                }

            ]
        });
        this.callParent();
    }
});
