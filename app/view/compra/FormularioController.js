Ext.define('kokojump.view.compra.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.compra-formulario',
    onSelectProducto:function(combo, record, eOpts){
        let g = Ext.ComponentQuery.query("#dgvCompraDet")[0]
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
                cantidad : 1,
                preciocompra : record.get("preciocompra"),
                total : record.get("preciocompra") * 1
            });
        }
        g.getView().refresh();
        this.onCalcularTotalOrdenCompraEditar();
    },
    onEditorCalcularTotalOrdenCompraEditar: function (editor, e) {
        let _cant = 0;
        let _pre = 0;
        _cant = e.record.get('cantidad');
        _pre = e.record.get('preciocompra');
        _tot = _pre * _cant;
        e.record.set('total', _tot.toFixed(2));
        this.onCalcularTotalOrdenCompraEditar();
    },
    onCalcularTotalOrdenCompraEditar: function () {
        me = this;
        let store = Ext.ComponentQuery.query('#dgvCompraDet')[0].getStore();
        let _tot = 0;
        store.each(function (record) {
            _tot = _tot + record.get('total');
        });
        Ext.ComponentQuery.query('#txtTotalVenta')[0].setValue(
            _tot.toFixed(2)
        );
    },
    onClickEliminar:function(e){
        let record = e.getWidgetRecord();
        let g = Ext.ComponentQuery.query("#dgvCompraDet")[0]
        let s = g.getStore();
        s.remove(record);
        g.getView().refresh();
        this.onCalcularTotalOrdenCompraEditar();
    }

});
