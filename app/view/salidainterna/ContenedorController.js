Ext.define('kokojump.view.salidainterna.ContenedorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salidainterna-contenedor',
    onClick_Nuevo:function(b){
        try {
            let f = Ext.ComponentQuery.query('#frmSalidaInterna')[0];
            f.reset();
            let me = Ext.ComponentQuery.query('#contentPanelsalidainterna')[0];
            let l  = me.getLayout();
            l.setActiveItem(1);    
        } catch (error) {
            console.warn('ERROR EN CREAR salidainterna');  
        }
    }

});
