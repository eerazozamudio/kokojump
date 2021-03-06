Ext.define('kokojump.view.admin.ListadoConfig', {
    extend: 'Ext.tab.Panel',
    xtype: 'wRegConfig',
    alias: 'widget.wRegConfig',
    requires: [
        'Ext.layout.container.HBox',
        'kokojump.view.admin.ListadoConfigController',
        'Ext.grid.*',
        'Ext.form.field.Number',
        'kokojump.view.admin.PanelConfigGeneral',
        'kokojump.view.admin.PanelLocales'
    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 5,
    defaults: {}
    ,
    controller: 'admin-listadoconfig',
    initComponent: function () {
        Ext.apply(this, {
            items: [
                this.getConfigGeneral(),
                this.getPanelLocales()
            ]
        });
        this.callParent();
    },

    getConfigGeneral:function(){
        return obj = {
            title: 'General',
            xtype: 'wRegConfigGeneral'
        };
    },

    getPanelLocales:function(){
        return obj = {
            title: 'Locales',
            xtype: 'wRegLocales'
        };
    }



});
