
Ext.define('kokojump.view.admin.ListadoPagos', {
    extend: 'Ext.panel.Panel',
    xtype: 'wListadoPagos',
    alias: 'widget.wListadoPagos',
    controller: 'admin-listadopagos',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.container.ButtonGroup',
        'Ext.grid.column.*',
        'Ext.form.field.*',
        'Ext.panel.Panel',
        'kokojump.view.admin.ListadoPagosController'

    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 0,
    defaults: {
        bodyPadding: 0,
        border: false
    },
    tbar: [
        {
            xtype: 'button',
            text: 'Imprimir Ticket',
            handler: 'onClickImprimirTicket'
        },
        {
            xtype : 'button',
            text : 'REPORTES',
            menu : [
                {
                    text : 'Reporte Todos PDF',
                    handler  : 'onClickImprimirPDFVentasDiarias'
                },
                {
                    text : 'Reporte Ventas PDF',
                    handler  : 'onClickImprimirPDFVentasTienda'
                },
                {
                    text : 'Reporte Servicio PDF',
                    handler  : 'onClickImprimirPDFServicios'
                },
                {
                    text : 'Exportar Excel',
                    handler  : 'onClickImprimirExcelVentasDiarias'
                },
                {
                    text : 'Listado de Niños',
                    handler  : 'onClickImprimirExcelListadoNinos'
                },
               
            ]
        },
    ],
    initComponent: function () {

        var storePedidos = Ext.create('kokojump.store.Pedidos');
        var storePedidoDet = Ext.create('kokojump.store.PedidoDetalle');
        var storeLocales = Ext.create('kokojump.store.Locales');

        var _date = Ext.Date.format(new Date(), 'd/m/Y')
        storePedidos.load({
            params: {
                desde: _date,
                hasta: _date,
                idlocal: Ext.util.Cookies.get('idlocal')
            }
        });

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        Ext.apply(this, {
            items: [{
                xtype: 'panel',
                title: 'Registro de Ventas',
                flex: 1.5,
                margin: '0 3 0 0',
                layout: 'fit',
                items: [{
                    xtype: 'grid',
                    itemId: 'dgvVentas',
                    reference: 'dgvVentas',
                    store: storePedidos,
                    columnLines: true,
                    sortableColumns: false,
                    emptyText: 'NO HAY REGISTROS PARA MOSTRAR SEGUN EL RANGO DE FECHAS',
                    columns: [
                        {
                            text: 'Local',
                            dataIndex: 'milocal',
                            flex: 1.5,
                            align: 'left'
                        },
                        {
                            text: 'Fecha ',
                            dataIndex: 'fechaventa',
                            flex: 1,
                            align: 'center'
                        },
                        {
                            text: 'Cliente',
                            dataIndex: 'cliente',
                            flex: 2,
                            align: 'left'
                        },
                        {
                            xtype: 'numbercolumn',
                            text: 'Total Pedido',
                            dataIndex: 'totalventa',
                            flex: 1,
                            align: 'right'



                        },
                        {
                            text: 'Estado',
                            dataIndex: 'estadopagostr',
                            flex: 1,
                            align: 'center',
                            renderer: function (value, st) {
                                if (value == 'ANULADO') {
                                    return '<span style="color:red">' + value.toString() + '</span>';
                                } else {
                                    return value;
                                }
                            }
                        },
                        {
                            xtype: 'widgetcolumn',
                            width: 50,
                            widget: {
                                xtype: 'button',
                                width: 30,
                                glyph: 0xf014,
                                handler: 'onClickEliminarVenta'

                            }

                        }
                    ],

                    listeners: {
                        cellclick: 'onSelectedDetalle',
                    }


                }],
                tbar: [
                    {
                        xtype: 'container',
                        bodyPadding: 0,
                        layout: 'vbox',
                        columnWidth: 10,
                        items: [
                            {
                                xtype: 'container',
                                bodyPadding: 0,
                                layout: 'hbox',
                                columnWidth: 10,
                                flex: 1,
                                items: [{
                                    xtype: 'label',
                                    text: 'Del',
                                    padding: '5px 0 0 0',
                                    border: true,
                                    width: 50,
                                    height: 25,
                                    style: {
                                        background: '#6a4b5a',
                                        color: 'white',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '13px'
                                    }
                                }, {
                                    xtype: 'datefield',
                                    value: new Date(),
                                    reference: 'dfDesdeCaja',
                                    itemId: 'dfDesdeCaja',
                                    readOnly :true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'A',
                                    padding: '5px 0 0 0',
                                    border: true,
                                    width: 15,
                                    height: 25,
                                    style: {
                                        background: '#6a4b5a',
                                        color: 'white',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '13px'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    value: new Date(),
                                    reference: 'dfHastaCaja',
                                    itemId: 'dfHastaCaja',
                                    readOnly :true,
                                    width: 100
                                },
                                {
                                    xtype: 'button',
                                    glyph: kokojump.util.Glyphs.getGlyph('buscar'),
                                    tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
                                    handler: 'onClickBuscarPorFechas'
                                }
                                ]
                            },
                            {
                                xtype: 'container',
                                flex: 1,
                                bodyPadding: 0,
                                layout: 'hbox',
                                columnWidth: 10,
                                items: [
                                    {
                                        xtype: 'label',
                                        text: 'Local',
                                        padding: '5px 0 0 0',
                                        itemId: 'lblLocal',
                                        border: true,
                                        width: 50,
                                        height: 25,
                                        hidden: true,
                                        style: {
                                            background: '#6a4b5a',
                                            color: 'white',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '13px'
                                        }
                                    },
                                    {
                                        xtype: 'combo',
                                        store: storeLocales,
                                        itemId: 'cboLocal',
                                        valueField: 'idlocal',
                                        displayField: 'direccion',
                                        queryMode: 'local',
                                        hidden: true,
                                        width: 250,
                                        editable: true,
                                        emptyText: '-- Seleccionar --'
                                    },
                                    {
                                        xtype: 'button',
                                        glyph: kokojump.util.Glyphs.getGlyph('buscar'),
                                        tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
                                        handler: 'onClickBuscarPorFechas'
                                    }
                                ]
                            }

                        ]
                    }


                ],
                bbar: [
                    '->',
                    {
                        xtype: 'numberfield',
                        fieldLabel: '<b  style="font-size:25px;margin-top:20px;">Total </b>',
                        itemId: 'txtTotalGeneral',
                        readOnly: true,
                        fieldStyle: 'text-align: right;font-size:25px;font-weight:bold; ',

                    }
                ],
            }, {
                xtype: 'panel',
                layout: 'fit',
                hidden: false,
                title: 'Detalle del Ticket',
                flex: 1.2,
                items: [{
                    xtype: 'grid',
                    reference: 'dgvDetallePedido',
                    store: storePedidoDet,
                    columnLines: true,
                    sortableColumns: false,
                    requires: [
                        'Ext.grid.selection.SpreadsheetModel',
                        'Ext.grid.plugin.Clipboard'
                    ],
                    columns: [
                        {
                            text: 'Producto',
                            dataIndex: 'nombre',
                            flex: 1.5,
                            align: 'left'
                        },
                        {
                            text: 'Niño',
                            dataIndex: 'nino',
                            flex: 1.5,
                            align: 'left'
                        },

                        {
                            text: 'Desde',
                            dataIndex: 'hdesde',
                            flex: 0.5,
                            align: 'right'
                        },

                        {
                            text: 'Hasta',
                            dataIndex: 'hhasta',
                            flex: 0.5,
                            align: 'right'
                        },

                        /*  {
                              text: 'Precio',
                              dataIndex: 'precio',
                              flex: 0.5,
                              align: 'right'
                          },*/
                        {
                            text: 'Total',
                            dataIndex: 'total',
                            flex: 0.5,
                            align: 'right'
                        }

                    ]
                }]



            }]
        });
        this.callParent();
        if (Ext.util.Cookies.get('sa') == 1) {
            Ext.ComponentQuery.query('#lblLocal')[0].setHidden(false);
            Ext.ComponentQuery.query('#cboLocal')[0].setHidden(false);
        }
        var _date = Ext.Date.format(new Date(), 'd/m/Y')

        Ext.Ajax.request({
            url: kokojump.util.Rutas.totalVentaSumatoria,
            params: {
                desde: _date,
                hasta: _date,
                idlocal: Ext.util.Cookies.get('idlocal')
            },
            success: function (response) {
                var data = kokojump.util.Json.decodeJSON(response.responseText);
                Ext.each(data, function (row, i) {
                    if (row._total) {
                        Ext.ComponentQuery.query('#txtTotalGeneral')[0].setValue(row._total);
                    }
                });
            }
        });
    }
});
