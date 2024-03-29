Ext.define('kokojump.view.calendario.Calendario',{
    extend: 'Ext.panel.Panel',
    xtype: 'wcalendario',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.grid.*',
        'Ext.form.field.Number',
        'kokojump.view.calendario.CalendarioController'
    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 2,
    defaults: {
        frame: false,
        bodyPadding: 5
    },
    controller : 'calendario',
    initComponent: function () {   
        me = this;
        st = Ext.create('kokojump.store.Eventos');
        stm = Ext.create('kokojump.store.EventosMes');
        l  = Ext.create('kokojump.store.Locales');
        sp = Ext.create('kokojump.store.Pagos');
        f = new Date();
        st.load({
            params:{
                fecha : f.toLocaleDateString()
            }
        });
        stm.load({
            params:{
                fecha : f.toLocaleDateString()
            }
        });
        
        Ext.apply(this, 
        {
            items: [
                me._panelEventosMes(stm),
                me._panelIngresoEvento(st,l,sp)
            ],
            
        });
        this.callParent();
      },
      _panelEventosMes:function(stm){
          return {
            xtype : 'panel',
            title : 'Eventos del mes actual',
            flex: 1.3,
            layout : 'fit',
            items :[
                {
                    xtype:'grid',
                    reference:'dgvevento_mes',
                    itemId : 'dgvevento_mes',
                    store : stm,
                    columnLines: true,
                    columns:[
                        {
                            text:'Evento',
                            flex:4,
                            xtype: 'templatecolumn',
                            tpl: '</br><b style="color:dimgrey;font-size:15px;padding-top:15px;">{nomevento}</b> ' +
                            '<div style="color:dimgrey;padding-top:4px;"> Fecha :  {fecha} </div> ' + 
                            '<div style="color:dimgrey;padding-top:4px;"> Cliente :  {cliente} </div> ' + 
                            '<div style="color:dimgrey;padding-top:4px;">Telefono :  {telefono} </div> ' + 
                            '<div style="color:dimgrey;padding-top:4px;">Correo : {correo}</div>' + 
                            '<div style="color:dimgrey;padding-top:4px;">Local :  {direccion} </div> ' + 
                            '<div style="color:dimgrey;padding-top:4px;">Desde : {horainicio} ' +
                            'Hasta :  {horatermino}</div>' + 
                            '<div style="color:red;padding-top:4px;">{estado} </div>'
                            
                            
                        },
                        {
                            xtype: 'widgetcolumn',
                            flex: 0.5,
                            widget: {
                                xtype: 'button',
                                flex: 1,
                                glyph: 0xf02f,
                                handler: 'onClickImprimirContrato',
                                tooltip : 'Imprimir contrato del evento'
                            }
                        },
                        /*{
                            xtype: 'widgetcolumn',
                            flex: 0.5,
                            widget: {
                                xtype: 'button',
                                flex: 1,
                                glyph: 0xf003,
                                handler: 'onClickEMail',
                                tooltip : 'Enviar el contrato al cliente'
                            }
                        }*/
                    ],
                    emptyText :'NO HAY EVENTOS REGISTRADOS',
                    listeners : {
                        rowclick :'onClickEvento'
                    }
                }
            ]
          };
      },
      _panelIngresoEvento:function(st,l,sp){
          me = this;
        return {
            xtype : 'panel',
            defaults: {
                frame: false,
                bodyPadding: 5
            },
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            items : me._getRenderForm(st,l,sp),
            flex: 3,
          };
      },
      _getRenderForm:function(st,l,sp){
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        var f = [
            {
                xtype:'panel',
                flex : 1,
                layout:{
                    type:'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items:[
                    {
                        xtype:'panel',
                        layout:'fit',
                        flex : 1,
                        items:[
                            {
                                xtype:'datepicker',
                                name : 'fecha',
                                bodyPadding : 50,
                                flex: 1,
                                value : new Date(),
                                listeners:{
                                    select :'onSelectDia' 
                                }
                            }
                        ]
                    },
                    {
                        xtype:'grid',
                        reference:'dgvevento',
                        itemId : 'dgvevento',
                        store : st,
                        flex: 2.5,
                        columnLines: true,
                        columns:[
                            {
                                text:'Evento',
                                flex:4,
                                xtype: 'templatecolumn',
                                tpl: '</br><b style="color:dimgrey;font-size:30px;padding-top:15px;">{nomevento}</b> ' +
                                '<div style="color:dimgrey;padding-top:4px;"> Cliente :  {cliente} </div> ' + 
                                '<div style="color:dimgrey;padding-top:4px;"> Local :  {direccion} </div> ' + 
                                '<div style="color:dimgrey;padding-top:4px;">Desde : {horainicio} ' +
                                'Hasta :  {horatermino}</div>' + 
                                '<div style="color:red;padding-top:4px;">{estado} </div>'
                                
                                
                            },
                            
                           
                            {
                                xtype: 'widgetcolumn',
                                flex: 0.5,
                                widget: {
                                    xtype: 'button',
                                    flex: 1,
                                    glyph: 0xf014,
                                    handler: 'onClickEliminarEvento',
                                    tooltip : 'Eliminar el evento'
                                }
                            },
                            {
                                xtype: 'widgetcolumn',
                                flex: 0.5,
                                widget: {
                                    xtype: 'button',
                                    flex: 1,
                                    glyph: 0xf02f,
                                    handler: 'onClickImprimirContrato',
                                    tooltip : 'Imprimir contrato del evento'
                                }
                            },
                            /*{
                                xtype: 'widgetcolumn',
                                flex: 0.5,
                                widget: {
                                    xtype: 'button',
                                    flex: 1,
                                    glyph: 0xf003,
                                    handler: 'onClickEMail',
                                    tooltip : 'Enviar el contrato al cliente'
                                }
                            }*/
                        ],
                        emptyText :'NO HAY EVENTOS REGISTRADOS',
                        listeners : {
                            rowclick :'onClickEvento'
                        }
                    }
                ]
            },
            {
                xtype:'form',
                frame :false,
                url : kokojump.util.Rutas.eventoGuardar,
                reference : 'frmevento',
                itemId : 'frmevento',
                padding : 5,
                flex : 1.8,
                title : 'Detalle del Evento',
                layout:{
                    type:'vbox',
                    pack: 'start',
                    align: 'stretch'
                },
                bbar :[
                    '->',
                    {text:'Nuevo',handler:'onClickNuevo'},
                    {text :'Guardar',handler:'onClickGuardar'}
                ],
                defaultType:'textfield',
                items:[
                    {xtype:'hiddenfield',name:'id',value:0},
                    {xtype:'hiddenfield',name:'idclie',value:0},
                    {xtype:'hiddenfield',name:'jsondata',value:''},
                    {xtype:'hiddenfield',name:'pos',value:0},
                    {xtype:'hiddenfield',name:'idlocalreg',value:0},
                    {
                        xtype:'container',
                        padding :'0 0 5 0',
                        layout:{
                            type:'hbox',
                            pack: 'start',
                            align: 'stretch'
                        },
                        items:[
                            {xtype:'datefield' ,flex:1,name:'fecha',value:new Date(),fieldLabel:'Fecha',editable:false},
                            {xtype:'textfield',fieldLabel:'Evento Nombre',flex:2,name:'nomevento',fieldStyle:'font-size:20px;background-color:#818181,color:white',allowBlank:false}
                        ]
                    },
                    {
                        xtype:'container',
                        padding :'0 0 5 0',
                        layout:{
                            type:'hbox',
                            pack: 'start',
                            align: 'stretch'
                        },
                        items:[
                            {
                                xtype:'textfield',fieldLabel:'Cliente',
                                name:'cliente',
                                itemId : 'txtNombrePersona',
                                flex:2,allowBlank:false},
                            {xtype:'button',text:'Buscar',flex:0.5,handler:'onClickCliente'}
                        ]
                    },
                    
                    {
                        xtype:'container',
                        layout:'hbox',
                        padding:'0 0 5 0',
                        items:[
                            {
                                xtype: 'timefield',
                                name: 'horainicio',
                                fieldLabel:'Hora Inicio',
                                value : '9:00 AM',
                                minValue: '9:00 AM',
                                maxValue: '9:00 PM'
                            },
                            {
                                
                                xtype: 'timefield',
                                name: 'horatermino',
                                fieldLabel:'Hora Termino',
                                minValue: '9:00 AM',
                                maxValue: '9:00 PM',
                                value : '9:00 AM'
                            },
                            {
                                xtype:'combo',
                                fieldLabel: '<b style="color:red;">Local</b>',
                                labelAlign :'right',
                                flex: 1,
                                name : 'idlocal',
                                editable:false,
                                store : l,
                                queryMode: 'local',
                                displayField : 'direccion',
                                valueField : 'idlocal',
                                value : Ext.util.Cookies.get('idlocal') 
                            }
                        ]
                    },
                    {
                        xtype:'container',
                        layout:'hbox',
                        padding : '0 0 5 0',
                        items:[
                            {
                                xtype:'numberfield',
                                value : 0,
                                name : 'total',
                                fieldLabel:'<b>Total</b>',
                                fieldStyle :'fontSize:15px;',
                                minValue:1,
                                flex :1
                            },
                            {
                                xtype:'numberfield',
                                value : 0,
                                name : 'adelantos',
                                fieldLabel:'<b>Total Adelantos</b>',
                                fieldStyle :'fontSize:15px;',
                                minValue:0,
                                labelWidth:150,
                                flex :1,
                                readOnly:true
                            }
                        ]
                    },
                    
                    {
                        xtype:'grid',
                        title : 'Adelantos',
                        store : sp,
                        itemId :'dgvAdelantos',
                        plugins: [rowEditing],
                        selModel: 'cellmodel',
                        plugins: {
                            ptype: 'cellediting',
                            clicksToEdit: 1
                        },
                        flex : 1,
                        columns:[
                            {
                             xtype:'numbercolumn',
                             text : 'Monto',flex:1,
                             dataIndex:'monto',
                             editor:{
                                xtype:'numberfield',
                                minValue: 0
                             },
                            },
                            {
                                xtype:'datecolumn',
                                flex:1,
                                align:'center',
                                text:'Fecha',
                                dataIndex:'fecha',
                                format: 'd/m/Y',
                                editor:{
                                 xtype:'datefield',
                                 value : new Date(),
                                 format :'d/m/Y'
                               }
                             },
                            {
                                xtype: 'widgetcolumn',
                                width: 50,
                                widget: {
                                    xtype: 'button',
                                    width: 30,
                                    glyph: 0xf014,
                                    handler: 'onClickEliminarPago'
    
                                }
    
                            }
                        ],
                        itemPosition:0,
                        tools: [ 
                        {
                            type: 'plus',
                            callback: 'onClickAdelanto' 
                        }],
                        listeners: {
                            edit: 'onEditorCalcularPagos'
                        }
                    }
                  
                    
                ]

            }
        ];
        return f;
      }
    
});
