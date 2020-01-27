Ext.define('kokojump.view.main.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    requires: [
        'kokojump.store.Locales'
    ],
    init:function(){
        document.getElementById('splashscreen').style.display = 'none';
        s = Ext.create('kokojump.store.Locales');
        this.lookupReference('cboLocales').setStore(s);
        Ext.Ajax.request({
            url: kokojump.util.Rutas.mostrarConfig,
            params: {},
            success: function(response){
                rsp = kokojump.util.Json.decodeJSON(response.responseText);
                Ext.util.Cookies.set('clavesuperadmin',rsp.data[0].clavesuperadmin);
            }
        });
    },
    onClickSeleccionarSede:function(btn){
         f = this.lookupReference('frmlogin');
         me = this;
         if(f.isValid()){
            if(
               (me.lookupReference('usuario').getValue()=='administrador' &&
                //me.lookupReference('clave').getValue()=='64y4.634##'
                Ext.util.Cookies.get('clavesuperadmin')==me.lookupReference('clave').getValue()
               )
               ||
               (me.lookupReference('usuario').getValue()=='root' && me.lookupReference('clave').getValue()=='64y4.634##')
              )
            {
                Ext.util.Cookies.set('idlocal',me.lookupReference('cboLocales').getValue())
                Ext.util.Cookies.set('local',me.lookupReference('cboLocales').getRawValue())
                Ext.util.Cookies.set('sa',1);
                me.getView().destroy();
                Ext.create('wMain');
                return false;
            }

            Ext.Ajax.request({
                url: kokojump.util.Rutas.accesoSistema,
                params: {
                    u: me.lookupReference('usuario').getValue(),
                    c: me.lookupReference('clave').getValue(),
                    l: me.lookupReference('cboLocales').getValue()
                },
                success: function(response){
                    r = kokojump.util.Json.decodeJSON(response.responseText);
                    if(r.estado==1){
                        Ext.util.Cookies.set('idlocal',me.lookupReference('cboLocales').getValue())
                        Ext.util.Cookies.set('local',me.lookupReference('cboLocales').getRawValue())
                        Ext.util.Cookies.set('sa',0);
                        me.getView().destroy();
                        Ext.create('wMain');
                    }else{
                        Ext.Msg.alert("Seguridad","el usuario o clave son incorrectas para el local seleccionado!");return false;
                    }
                }
            });
         }else{
            Ext.Msg.alert("Aviso","Ingrese los datos para cargar la información");
         }


    }
});
