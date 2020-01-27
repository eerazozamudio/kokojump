Ext.define('kokojump.view.pdv.ContenedorVenta',{
    extend: 'Ext.panel.Panel',
    alias : 'wPdvContenedorVenta',
    xtype : 'wPdvContenedorVenta',
    itemId :'dvContenedorMesas',
    requires:[
        'kokojump.view.pdv.AccionesPdvVenta',
        'kokojump.view.pdv.Main',
        'kokojump.view.pdv.IngresarCliente'
    ],
    controller :'accionespdvventa',
    layout:'fit',
    initComponent:function(){
        me = this;
        Ext.apply(me,{
            items : me.getItems()
        });        
        this.callParent(arguments);

    },
    getItems:function(){
        var _obj = [
            {
                xtype: 'wPdvVenta'
            }
        ];
        return _obj;
    },
    getAcciones:function(){
    }

});