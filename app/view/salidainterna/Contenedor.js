
Ext.define('kokojump.view.salidainterna.Contenedor',{
    extend: 'Ext.panel.Panel',
    xtype : 'wRegSalidaInterna',
    requires: [
        'kokojump.view.salidainterna.ContenedorController',
        'kokojump.view.salidainterna.Listado',
        'kokojump.view.salidainterna.Formulario'
        
    ],
    controller: 'salidainterna-contenedor',
    
    
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
                  text: 'NUEVA SALIDA INTERNA',
                  scale: 'large',
                  handler :'onClick_Nuevo'
              },
              '->',
              {
                  xtype : 'label',
                  text : 'Salidas Internas',
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
            itemId: 'contentPanelsalidainterna',
            flex: 1,
            layout: {
                type : 'card',
                anchor : '100%',
                deferredRender: true,
            },
            items : [
                { xtype : 'listadosalidasinternas'},
                { xtype : 'salidainternaregistro'},
               
            ]
        };
    }
});
