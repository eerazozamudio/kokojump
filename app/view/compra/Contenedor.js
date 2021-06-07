
Ext.define('kokojump.view.compra.Contenedor',{
    extend: 'Ext.panel.Panel',
    xtype : 'wRegCompras',
    requires: [
        'kokojump.view.compra.ContenedorController',
        'kokojump.view.compra.Listado'
    
    ],

    controller: 'compra-contenedor',
 
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent:function(){
        me = this;
        Ext.apply(this, {
            items: [
               me._buscardor(),
               me._contenedor()
          ]
        });
        this.callParent();
    },
    _buscardor:function(){
        return  {
            xtype : 'toolbar',
            items : [
            
              {
                  xtype: 'button', // default for Toolbars
                  text: 'NUEVA COMPRA',
                  scale: 'large',
                  handler :'onClick_Nuevo'
              },
              '->',
              {
                  xtype : 'label',
                  text : 'Comrpas',
                  style: {
                    color: '#333333',
                    fontSize:'25px',
                    textAlign: 'center'
                    
                },
              }
            
            ]
        };
    },
    _contenedor:function(){
        return    {
            xtype: 'container',
            itemId: 'contentPanelcompra',
            flex: 1,
            layout: {
                type : 'card',
                anchor : '100%',
                deferredRender: true,
            },
            items : [
                { xtype : 'listadocompras',  tiposervicio   : 6},
                { xtype : 'compraregistro'},
               
            ]
        };
    }
});


