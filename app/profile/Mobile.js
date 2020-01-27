Ext.define('kokojump.profile.Mobile', {
    extend: 'Ext.app.Profile',
    //mainView: 'kokojump.view.mobil.AdminCajas',
    isActive: function () {
        return  !Ext.os.is.Desktop;
    },
    launch:function(){
        alert("aaa");
    }
    /*controllers:[
        'kokojump.controller.DataStatica'
    ],*/
    /*stores: [
        'kokojump.store.Ventas'
    ],
    views:[
        'kokojump.view.mobil.AdminCajas'
    ],
     models: [
        'kokojump.model.DataModels'
     ],*/
    /*launch: function () {
       Ext.util.Format.decimalSeparator = '.';
       Ext.util.Format.thousandSeparator = ' ';
       Ext.create('kokojump.view.mobil.AdminCajas');
    }*/
    
});