Ext.define('kokojump.view.pdv.Contenedor',{
    extend: 'Ext.panel.Panel',
    alias : 'wPdvContenedor',
    xtype : 'wPdvContenedor',
    itemId :'dvContenedorMesas',
    requires:[
        'kokojump.view.pdv.AccionesPdv',
        'kokojump.view.pdv.Main',
        'kokojump.view.pdv.IngresarCliente'
    ],
    controller :'accionespdv',
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
                xtype: 'wPdv'
            }
        ];
        return _obj;
    },
    getAcciones:function(){
    }

});