Ext.define('kokojump.view.producto.ListServicio',{
    extend: 'Ext.panel.Panel',
    xtype: 'wListServicio',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.grid.*',
        'Ext.form.field.Number',
        'kokojump.view.producto.ProductoController'
    ],
    layout: {
        type: 'fit',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 2,
    defaults: {
        frame: false,
        bodyPadding: 5
    },
    numeromesa : 0,
    tiposervicio: 0,
    codigobarra:false,
    controller : 'productos',
    initComponent: function () { 
        me = this;
        st = Ext.create('kokojump.store.Productos');
        st.load({
            params : {idlocal  : Ext.util.Cookies.get('idlocal'),idcategoria: me.tiposervicio }
        });
        nm = me.numeromesa.toString();
        Ext.apply(this, 
        {
            items: me.getRenderForm(st,nm),
            tbar:[
                {
                    xtype : 'container',
                    flex: 1,
                    layout : {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items : [
                        {
                            xtype:'textfield',
                            reference : 'codigobarra',
                            itemId : 'codigobarra',
                            fieldLabel : 'Codigo Barra',
                            flex: 1,
                            hidden:  me.codigobarra,
                            enableKeyEvents: true,
                            fieldStyle: 'text-align: center;font-size:20px;font-weight:bold;',
                            listeners: {
                                change: 'onChangeBuscarCodigoBarrasUnidad'
                            }
                        },
                        {
                            xtype:'textfield',
                            reference : 'nombreprod',
                            itemId : 'nombreprod',
                            fieldLabel : 'Nombre producto',
                            flex: 1,
                            hidden: me.codigobarra,
                            enableKeyEvents: true,
                            fieldStyle: 'text-align: center;font-size:20px;font-weight:bold;',
                            listeners: {
                                //change: 'onChangeBuscarNombre'
                                keypress: 'onChangeBuscarNombre'
                            }
                        }
                    ]
                },
                
            ]       
        });
        this.callParent();
    },
    getRenderForm:function(st,nm){
        var f = [
            {
                xtype:'grid',
                reference:'dgvservicio',
                store : st,
                flex: 2.5,
                itemId:'dvListaMesa1',
                columnLines: true,
                columns:[
                    {
                        text:'Evento',
                        flex:4,
                        xtype: 'templatecolumn',
                        height : 50,
                        tpl: 
                        '<div style="color:dimgrey;padding-top:4px;width:15px;font-size:25px">{nombre} </div><p> ' +
                        '<div style="color:dimgrey;padding-top:4px;font-size:20px;color:#6f7ee6;"><b> S/.   {precioventa} </b></div> '
                        
                    }
                ],
                emptyText :'NO HAY EVENTOS REGISTRADOS',
                listeners : {
                    rowclick :'onClickServicio'
                }
            }
        ];
        return f;
      }

});