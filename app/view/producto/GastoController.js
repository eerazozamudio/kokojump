Ext.define('kokojump.view.producto.GastoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gastos',
    onClickNuevoGasto : function(){
        var frm = this.lookupReference('myFrmGasto');
        frm.reset();
        Ext.ComponentQuery.query('#descripcion')[0].focus(this);
    },
    onClickGuardarGasto:function(){
       var frm = this.lookupReference('myFrmGasto');
       if(frm.isValid()){
          
          frm.submit({
               waitMsg: 'Guardando información...',
               success: function (form, action) {
                   _dgv = Ext.ComponentQuery.query('#dgvGastos')[0];
                   _dgv.getStore().load({
                            params:{
                                idlocal : Ext.util.Cookies.get('idlocal')
                        }
                   });
              },
               failure: function () {
                   Ext.Msg.alert("Aviso", action.result.msg);
               }
           });
       }else{
         Ext.Msg.alert("Aviso","Ingresar los campos!");return false;
       }
    },
    onClickItemGasto: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var form = this.lookupReference('myFrmGasto');
        form.loadRecord(record);
    },
    onClickBuscarPorFechas:function(){
      __desde =  Ext.ComponentQuery.query('#dfDesde')[0].getRawValue();
      __hasta =  Ext.ComponentQuery.query('#dfHasta')[0].getRawValue();
      __store = Ext.ComponentQuery.query('#dgvGastos')[0].getStore();

      if (Ext.util.Cookies.get('sa') == 1){
        __store.load({
            params :{
              desde : __desde,
              hasta : __hasta,
              admin : 1
            }
          });
      }else{
        __store.load({
            params :{
              desde : __desde,
              hasta : __hasta,
              idlocal : Ext.util.Cookies.get('idlocal')
            }
          });
      }
    },
    onClickEliminarGasto:function(btn){
      _dgv = Ext.ComponentQuery.query('#dgvGastos')[0];
      rec = btn.getWidgetRecord();

      Ext.Msg.confirm("Aviso", "Desea anular el gasto?", function(btn){
      if (btn == 'yes'){
          Ext.Ajax.request({
            url: kokojump.util.Rutas.gastoAnular,
            params: {
                idgasto: rec.get('idgasto')
            },
            success: function(response){
                var respuesta = kokojump.util.Json.decodeJSON(response.responseText);
                if(respuesta.error!=0)
                {
                    //_dgv.getStore().reload();
                    _store = _dgv.getStore()
                    _totalVenta = 0;
                    _store.reload({
                      params : {
                          desde  : Ext.ComponentQuery.query("#dfDesde")[0].getRawValue(),
                          hasta  : Ext.ComponentQuery.query("#dfHasta")[0].getRawValue(),
                      },
                      /*callback : function(records, operation, success){
                          if(success == true){
                            _store.each(function(record) {
                                  if(record.data.estadopagostr !='ANULADO')
                                      _totalVenta = _totalVenta + record.data.totalventa;
                            });
                             Ext.ComponentQuery.query('#txtTotalGeneral')[0].setValue(_totalVenta);
                          }
                      }*/
                    });

                }

            }
        });
      }
    });
  },
  onClickReporteGastos:function(){
        desde    = Ext.ComponentQuery.query("#dfDesde")[0].getRawValue();
        hasta    = Ext.ComponentQuery.query("#dfHasta")[0].getRawValue();
        idlocal  = Ext.util.Cookies.get('idlocal');

        if (Ext.util.Cookies.get('sa') == 1){
            var _url = 'resources/api/gastos_exportar?desde=' + desde+"&hasta="+ hasta+"&admin=1";
            var obj  = window.open(_url);
        }else{
            var _url = 'resources/api/gastos_exportar?desde=' + desde+"&hasta="+ hasta+"&local="+idlocal.toString();
            var obj  = window.open(_url);
        }


    }
});
