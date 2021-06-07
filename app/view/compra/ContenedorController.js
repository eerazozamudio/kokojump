Ext.define('kokojump.view.compra.ContenedorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.compra-contenedor',
    onClick_Nuevo:function(){
        //try {
            let f = Ext.ComponentQuery.query('#clienteregistro')[0];
            f.reset();
            let me = Ext.ComponentQuery.query('#contentPanelcompra')[0];
            let l  = me.getLayout();
            l.setActiveItem(1);    
        /*} catch (error) {
            console.warn('ERROR EN CREAR conductor');  
        }*/
    }

});
