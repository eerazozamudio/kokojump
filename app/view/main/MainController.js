Ext.define('kokojump.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.window.MessageBox',
        'Ext.tab.Panel',
        'Ext.tree.Panel'
    ],
    alias: 'controller.main',
    onExpandPanel: function(pan, obj) {
        switch (pan.itemId)
        {
            case "panGestionPacientes":
                _panel = this.getView().down('tabpanel');
                if (!_panel.getChildByElement(pan.itemId)) {
                    _panel.add({
                        title: ':..: Registros :..: ',
                        closable: true,
                        id: pan.itemId,
                        items: [{ xtype: 'DashBoardCrm' }]
                    });

                }
                _panel.setActiveTab(pan.itemId);
                break;
        }
    },
    renderformulario:function(view,opts){
        var _ref = this.getReferences();
    },
    init: function() {
        /* |------ Cargar Menu Dinamico ------| */

      /*  var _ref = this.getReferences();
        var store   = Ext.create('kokojump.store.tree.kokojump');
        var storeU  = Ext.create('kokojump.store.tree.Usuarios');
        _ref.treekokojump.setStore(store);
        _ref.treeUsuarios.setStore(storeU);*/
        Ext.ComponentQuery.query('#panDetalleLocal')[0].setTitle(
                '  TIENDA    CODIGO : '+ Ext.util.Cookies.get('idlocal').toString() + ' - DIRECCION : '+  Ext.util.Cookies.get('local').toString()
        );


    },
    onClickOpcionMenu: function(obj, record, item, index, e, eOpts) {
        _view = record.get("itemId");
        _tit = record.get("titulo");
        _panel = this.getView().down('tabpanel');
        try {
            if (!_panel.getChildByElement(_view)) {
                _panel.add({
                    title: _tit,
                    closable: true,
                    id: _view,
                    layout: 'fit',
                    items: [{ xtype: _view }]
                });

            }
            _panel.setActiveTab(_view);
        } catch (err) {
            console.info(err);
        }
    },
    onClickOpcionBotonMenu:function( btn, e, eOpts){
    _view = btn.getItemId();
    _tit = btn.titulo;
   _panel = this.lookupReference('tabPrincipal');  //this.getView().down('tabpanel');
   try {
     if(_tit =='..: Configuraciones :..' && Ext.util.Cookies.get('sa')==0){
       Ext.Msg.alert("Seguridad","Usted no tiene permisos para entrar");
       return false;
     }
     /*if(_tit =='Gastos' && Ext.util.Cookies.get('sa')==0){
        Ext.Msg.alert("Seguridad","Usted no tiene permisos para entrar");
        return false;
     }*/
     _panel.removeAll();
     if(_tit == ''){return 0;}
     if (!_panel.getChildByElement(_view)) {
       _panel.add({
         title: _tit,
         closable: false,
         id: _view,
         layout: 'fit',
         items: [{
           xtype: _view
         }]
       });
     }
     if(Ext.util.Cookies.get('sa')==0 && _tit=='..: Caja :..'){
        Ext.ComponentQuery.query('#dfDesdeCaja')[0].setReadOnly(true);
        Ext.ComponentQuery.query('#dfHastaCaja')[0].setReadOnly(true);
     }else{
        try{
            Ext.ComponentQuery.query('#dfDesdeCaja')[0].setReadOnly(false);
            Ext.ComponentQuery.query('#dfHastaCaja')[0].setReadOnly(false);
        }catch(e){
            return '';
        }
        
     }
   } catch (err) {
     console.info(err);
   }

    },
    onclickSalirApp:function(){
        Ext.Msg.confirm('Salir del Sistema', 'Esta seguro de cerrar la seccion?',
                    function(e) {
                      if (e == 'yes') {
                        /*Ext.Ajax.request({
                          url : 'index.php/usuarios/logout',
                          success : function() {*/
                            Ext.util.Cookies.clear();
                            window.location = '';
                        /* }
                        });*/
                      }
                    });
    }


});
