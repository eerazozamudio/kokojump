Ext.define('kokojump.view.pdv.AccionesNinosMembresia', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.window.MessageBox',
        'Ext.window.Toast'
    ],
    alias: 'controller.accionesninosmembresia',
    onKeyPressTextoDeBusquedaNino: function (txt, e, eOpts) {
        me = this;
        if (e.getCharCode() == 13) {
            var store = me.lookupReference('dgvNinos').getStore();
            store.load({
                params: {
                    nombresapellidos: txt.getValue()
                }
            });

        }


    },
    seleccionarRegistroNino: function (grid, record, element, rowIndex, e, eOpts) {
        var formnino = this.lookupReference('myFrmNino');
        formnino.loadRecord(record);
    },
    seleccionarRegistroNinoVenta: function (grid, record, element, rowIndex, e, eOpts) {
        me = this;
        var _idprod = Ext.ComponentQuery.query('#txtIdProducto')[0].getValue();
        var _grid = Ext.ComponentQuery.query("#dgvDetallePedidoMesa1")[0];
        var _posicion = _grid.getSelectionModel().getSelection()[0].get('id');
        var _record = _grid.getStore().findRecord("id", _posicion);
        //eddy

        if (_idprod == 41) {
            _obj = Ext.create('Ext.window.Window', {
                width: 300,
                height: 150,
                title: 'Ingresar Periodo Menbresia',
                layout: 'vbox',
                bodyPadding: 10,
                autoShow: true,
                modal: true,
                items: [{
                        xtype: 'datefield',
                        fieldLabel: 'Desde',
                        itemId: 'txtPeriodoDesde',
                        allowBlank: false,
                        value: new Date()
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Hasta',
                        itemId: 'txtPeriodoHasta',
                        allowBlank: false,
                        value: new Date()
                    },
                    {
                        xtype: 'button',
                        text: 'Ingresar',
                        handler: function () {
                            if (_record) {
                                _visita = parseInt(record.get('ultimavisita')) + 1;
                                _record.set("idnino", record.get('id'));
                                _record.set("nino", record.get('nombres') + ' ' + record.get('apellidos'));
                                _record.set("hdesde", me.lookupReference('txtHDesde').getRawValue());
                                _record.set("hhasta", me.lookupReference('txtHHasta').getRawValue());
                                _record.set("hmenbresiadesde", Ext.ComponentQuery.query('#txtPeriodoDesde')[0].getRawValue());
                                _record.set("hmenbresiahasta", Ext.ComponentQuery.query('#txtPeriodoHasta')[0].getRawValue());
                                /*if (_visita == 5) {
                                    _record.set("total", 0);
                                }*/


                                _record.endEdit();
                                _record.commit();
                                /*if (_visita == 5) {
                                    Ext.Msg.alert("PROMOCION", "EL CLIENTE ES SU VISITA NÚMERO 5");
                                    me.onCalcularTotalVenta(1);
                                }*/
                                _obj.close();
                                me.getView().close();

                            } else {
                                Ext.Msg.alert("Aviso", "Seleccionar un item de la lista!");
                                return false;
                            }
                        }
                    }
                ]
            });
        } else {

            console.log("test");
            me = this;
            if (_record) {
                _visita = parseInt(record.get('ultimavisita')) + 1;
                _record.set("idnino", record.get('id'));
                _record.set("nino", record.get('nombres') + ' ' + record.get('apellidos'));
                _record.set("hdesde", me.lookupReference('txtHDesde').getRawValue());
                _record.set("hhasta", me.lookupReference('txtHHasta').getRawValue());
                /*if (_visita == 5) {
                    _record.set("total", 0);
                }*/


                _record.endEdit();
                _record.commit();
                /*if (_visita == 5) {
                    Ext.Msg.alert("PROMOCION", "EL CLIENTE ES SU VISITA NÚMERO 5");
                    me.onCalcularTotalVenta(1);
                }*/
                me.getView().close();

            } else {
                Ext.Msg.alert("Aviso", "Seleccionar un item de la lista!");
                return false;
            }
        }
    },
    onClickNuevoNino: function () {
        this.lookupReference('myFrmNino').reset();
        this.lookupReference('txtnombres').focus();
    },
    onClickGuardarNino: function () {
        var _form = Ext.ComponentQuery.query('#myFrmNino')[0];
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    var ojson = kokojump.util.Json.decodeJSON(action.response.responseText);
                    if (parseInt(ojson.error) != 0) {
                        _form.reset();
                        Ext.ComponentQuery.query('#txtBuscarCodigoProd')[0].focus();
                        Ext.ComponentQuery.query('#dgvNinos')[0].getStore().load();
                    }
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", "Erro en conexion de datos");
                }
            });
        }
    },
    onCalcularTotalVenta: function (_numeromesa) {
        me = this;
        var store = Ext.ComponentQuery.query('#dgvDetallePedidoMesa' + _numeromesa.toString())[0].getStore();
        var _tot = 0;
        store.each(function (record) {
            _tot = _tot + record.get('total');
        });
        Ext.ComponentQuery.query('#txtTotalVenta' + _numeromesa.toString())[0].setValue(
            _tot.toFixed(2)
            //Ext.util.Format.number(_tot.toFixed(2), "0,000.00")
        );
    },
    onClickEliminarNino: function (btn) {
        _dgv = Ext.ComponentQuery.query('#dgvNinos')[0];
        rec = btn.getWidgetRecord();

        Ext.Ajax.request({
            url: kokojump.util.Rutas.ninoEliminar,
            params: {
                id: rec.get('id')
            },
            success: function (response) {
                var respuesta = kokojump.util.Json.decodeJSON(response.responseText);
                console.log(respuesta.msg);
                if (respuesta.error > 0) {
                    _dgv.getStore().load();
                }

            }
        });
    },

    onKeyPressTextoDeBusquedaApoderado: function (txt, e, eOpts) {
        me = this;
        if (e.getCharCode() == 13) {
            var store = Ext.ComponentQuery.query('#dgvApoderados')[0].getStore();
            store.load({
                params: {
                    datos: txt.getValue()
                }
            });

        }
    },
    seleccionarRegistroApoderado: function (grid, record, element, rowIndex, e, eOpts) {
        var formnino = this.lookupReference('frmGuardarApoderado');
        formnino.loadRecord(record);
    },
    onClickNuevoApoderado:function(){
      this.lookupReference('frmGuardarApoderado').reset();
      this.lookupReference('txfIdApoderado').setValue('0');
    },
    onClickGuardarApoderado:function(){
      __form = this.lookupReference('frmGuardarApoderado');
      if(__form.isValid()){
        __form.submit({
            waitMsg: 'Guardando informacion...',
            success: function (form, action) {
                var ojson = kokojump.util.Json.decodeJSON(action.response.responseText);
                //if (parseInt(ojson.error) != 0) {
                  //  _form.reset();
                    Ext.ComponentQuery.query('#dgvApoderados')[0].getStore().reload();
                    //Ext.ComponentQuery.query('#txtBuscarCodigoProd')[0].focus();
                //}
            },
            failure: function () {
                Ext.Msg.alert("Aviso", "Erro en conexion de datos");
            }
        });
      }
    },
    onChangeValidarNacimiento:function( obj, newValue, oldValue, eOpts ){
        if(Ext.isDate(newValue)==false){
          obj.setValue(new Date());
        }
    },
    onClickBajaMembresia:function(btn){
         Ext.MessageBox.confirm("Aviso", "Desea dar de baja la membresia?", function(btn){
         if(btn == "yes"){
           Ext.Ajax.request({
               url :kokojump.util.Rutas.membresiaBaja,
               params:{
                 id : Ext.ComponentQuery.query('#idmembre')[0].getValue()
               },
               success:function(response){
                  __obj = Ext.JSON.encode(response.responseText);
                  Ext.each(__obj,function(record,i){
                     console.log(record);
                  });
                  Ext.ComponentQuery.query('#dgvNinos')[0].getStore().load();
               }
           });
         }
      });
    },
    onClickExportarMembresia:function(btn){
      var _url = 'resources/api/exportarmembresias';
      var obj  = window.open(_url);
    }


});
