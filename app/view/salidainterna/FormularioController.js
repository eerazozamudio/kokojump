Ext.define('kokojump.view.salidainterna.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salidainterna-formulario',
    onClickCancelar:function(b){
        let f = Ext.ComponentQuery.query('#frmSalidaInterna')[0];
        f.reset();
        let me = Ext.ComponentQuery.query('#contentPanelsalidainterna')[0];
        let l  = me.getLayout();
        l.setActiveItem(0);    
    },
    onSelectProducto:function(combo, record, eOpts){
        let g = Ext.ComponentQuery.query("#dgvSalidaInterna")[0]
        let s = g.getStore();
        let i = s.getCount();
        if(record){

            if (s.findRecord('idprod', parseInt(record.get('idprod')))) {
                Ext.Msg.alert("KokoJump", "Producto ya se encuentra en la lista");
                return false;
            }
            s.insert(i++,{
                idprod : record.get("idprod"),
                nombre : record.get("nombre"),
                stock : record.get("stock"),
                cantidad : 1,
                preciocompra : record.get("preciocompra"),
                total : record.get("preciocompra") * 1
            });
        }
        g.getView().refresh();
        this.onCalcularTotalOrdenCompraEditar();
    },

});
