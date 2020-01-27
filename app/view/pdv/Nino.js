Ext.define('kokojump.view.pdv.Nino', {
    extend: 'Ext.window.Window',
    xtype: 'wRegClientes',
    alias: 'widget.wRegNino',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.grid.*',
        'Ext.form.field.Number',
        'kokojump.store.Apoderados',
        'kokojump.view.pdv.AccionesNinos',
        'kokojump.util.Fechas'
    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 5,
    defaults: {
        frame: false,
        bodyPadding: 5
    },
    config: {
        indice : 0,
        idapo  : 0,
        idprod : 0,
        minutos :0,
        membre : 0,
        apo    : ''
    },
    autoShow: true,
    width: 600,
    height: 300,
    title: '.:: Registro de niños ::.',
    controller: 'accionesninos',
    initComponent: function () {
        me = this;
        var storeNinos = Ext.create('kokojump.store.Ninos');
        
        Ext.apply(this, {
            items: [{
                    flex: 3,
                    margin: '0 3 0 0',
                    layout: 'fit',
                    items: [
                    {
                        xtype:'hiddenfield',
                        value :me.getIdprod(),
                        itemId : 'txtIdProducto'
                    },
                    {
                        xtype:'hiddenfield',
                        value :me.getMembre(),
                        itemId : 'txtEsMembresia'
                    },
                    {
                        xtype: 'grid',
                        itemId: 'dgvNinos',
                        store: storeNinos,
                        reference: 'dgvNinos',
                        hidden:false,
                        sortableColumns: false,
                        emptyText: 'No existen registros',
                        columns: [
                            {
                                xtype: 'templatecolumn',
                                text: 'Nombres/Apellidos',
                                tpl: '{nombres}  {apellidos}',
                                flex: 2
                            },
                            {
                                text: 'Edad',
                                dataIndex: 'edad',
                                flex: 0.5
                            },
                            {
                                text: 'D.N.I.',
                                dataIndex: 'dni',
                                flex: 1
                            },
                            {
                                text: 'VISITAS',
                                dataIndex: 'ultimavisita',
                                flex: 0.5,
                                align: 'center',
                                hidden:true,
                            },
                            {
                                text: 'USO MENBRESIA',
                                dataIndex: 'usumenbre',
                                flex: 0.5,
                                hidden:true,
                                align: 'center',
                                renderer:function(value,style){
                                  if(value == 1){
                                    return '<strong style="color:red;">SI</strong>';
                                  }else{
                                    return '<strong>NO</strong>';
                                  }
                                }
                            },
                             {
                                text: 'DESDE',
                                dataIndex: 'membresiadesde',
                                flex: 0.5,
                                align: 'center',
                                hidden:true,
                                renderer:function(data){
                                    return '<strong style="color:blue">'+data.toString()+'</strong>';
                                }
                            },
                             {
                                text: 'HASTA',
                                dataIndex: 'membresiahasta',
                                flex: 0.5,
                                hidden:true,
                                align: 'center',
                                 renderer:function(data){
                                    return '<strong style="color:blue">'+data.toString()+'</strong>';
                                }
                            },

                            {
                                xtype: 'widgetcolumn',
                                flex: 0.5,
                                widget: {
                                    xtype: 'button',
                                    flex: 1,
                                    glyph: 0xf014,
                                    handler: 'onClickEliminarNino'

                                }

                            }
                        ],
                        dockedItems: [{
                            xtype: 'pagingtoolbar',
                            store: storeNinos, // same store GridPanel is using
                            dock: 'bottom',
                            displayInfo: true
                        }],
                        tbar: [
                            {
                                xtype: 'fieldset',
                                layout: 'hbox',
                                flex: 1,
                                defaults:{
                                    labelWidth:40,
                                    labelAlign:'right'
                                },
                                items: [{
                                        xtype: 'textfield',
                                        reference: 'txtBuscarCodigoProd',
                                        itemId : 'txtBuscarCodigoProd',
                                        fieldLabel: 'Niño',
                                        enableKeyEvents: true,
                                        hidden:true,
                                        flex: 3,
                                        listeners: {
                                            keypress: 'onKeyPressTextoDeBusquedaNino'
                                        }
                                    },
                                    {
                                        xtype: 'timefield',
                                        reference : 'txtHDesde',
                                        fieldLabel: 'Desde',
                                        itemId : 'txtDesde',
                                        flex: 1,
                                        minValue: '8:00 AM',
                                        maxValue: '12:00 PM',
                                        increment: 1,
                                        value : new Date()

                                    },
                                    {
                                        xtype: 'timefield',
                                        fieldLabel: 'Hasta',
                                        reference : 'txtHHasta',
                                        itemId : 'txtHasta',
                                        flex: 1,
                                        minValue: '8:00 AM',
                                        maxValue: '12:00 PM',
                                        increment: 1,
                                    },
                                    { xtype:'hiddenfield',itemId:'txtDesdeMenbresia'},
                                    { xtype:'hiddenfield',itemId:'txtHastaMenbresia'}
                                ]


                            }


                        ],
                        listeners: {
                            rowclick: 'seleccionarRegistroNino',
                            rowdblclick: 'seleccionarRegistroNinoVenta'
                        }

                    }]
                },
                {
                    flex: 2,
                    margin: '0 10 0 0',
                    autoScroll: true,
                    items: [{
                        xtype: 'form',
                        reference: 'myFrmNino',
                        itemId: 'myFrmNino',
                        url: kokojump.util.Rutas.ninoGuardar,
                        layout: {
                            type: 'vbox',
                            pack: 'start',
                            align: 'stretch'
                        },
                        items: [{
                                xtype: 'hiddenfield',
                                name: 'id',

                            },
                            {
                                    xtype: 'hiddenfield',
                                    name: 'idapoderado',
                                    value : this.getIdapo()

                            },

                            {
                                xtype: 'label',
                                text: 'Nombres'

                            },
                            {
                                xtype: 'textfield',
                                name: 'nombres',
                                reference :'txtnombres',
                                itemId : 'txtnombres',
                                allowBlank: false,
                            },
                            {
                                xtype: 'label',
                                text: 'Apoderado'

                            },
                            {
                                xtype: 'textfield',
                                name: 'apellidos',
                                itemId : 'txtninoapoderado',
                                allowBlank: true,
                                value : this.getApo(),
                                readOnly:true
                            },
                            {
                                xtype: 'label',
                                text: 'Fecha Nacimiento',
                                hidden:true

                            },
                            {
                                xtype: 'datefield',
                                name: 'fechanaci',
                                allowBlank: true,
                                value : new Date(),
                                format : 'd/m/Y',
                                hidden:true
                            },

                            {
                                xtype: 'label',
                                text: 'Blazalete',
                                hidden:false

                            },
                            {
                                xtype: 'numberfield',
                                name: 'edad',
                                itemId : 'txtbrazalete',
                                allowBlank: true,
                                hidden:false
                            },


                            {
                                xtype: 'label',
                                text: 'Telefono'
                            },
                            {
                                xtype: 'textfield',
                                name: 'dni',
                                itemId : 'txtfono',
                                allowBlank: true,
                            },


                        ],
                        bbar: [
                            '->',
                            {
                                xtype: 'button',
                                text: 'Nuevo',
                                iconCls: 'fa fa-file fa-2x',
                                scale: 'medium',
                                desabled : true,
                                handler: 'onClickNuevoNino'
                            },
                            {
                                xtype: 'button',
                                text: 'Grabar',
                                iconCls: 'fa fa-thumbs-o-up fa-2x',
                                scale: 'medium',
                                handler: 'onClickGuardarNino'
                            }

                        ]

                    }]

                }

            ]
        });
        this.callParent();
        me.getCalcularHoraHasta(me.getMinutos());
    },
    getCalcularHoraHasta:function(minutos){
        dt = new Date();
        Ext.ComponentQuery.query('#txtDesde')[0].setValue(
            kokojump.util.Fechas.sumarMinutos(5)
        );
        Ext.ComponentQuery.query('#txtHasta')[0].setValue(
          kokojump.util.Fechas.sumarMinutos(minutos + 5)
        );
    }
});
