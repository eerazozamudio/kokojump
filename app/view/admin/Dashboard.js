Ext.define('kokojump.view.admin.Dashboard', {
  extend: 'Ext.panel.Panel',
  xtype: 'wAdminDashBoard',
  alias: 'widget.wAdminDashBoard',
  requires: [
    'Ext.layout.container.HBox',
    // 'kokojump.view.producto.ProductoController',
    'Ext.grid.*',
    'Ext.form.field.Number'
  ],
  layout: {
    type: 'fit',
    pack: 'start',
    align: 'stretch'
  },

  defaults: {
    frame: false
  },
  // controller:'productos',
  initComponent: function () {
    var storeControl = Ext.create('kokojump.store.Control');
    /*storeControl.load({
        params:{
            idlocal :Ext.util.Cookies.get('idlocal')
        }
    });*/

    Ext.apply(this, {
      items: [{
        flex: 3,
        margin: '0 3 0 0',
        layout: 'fit',
        items: [{
          xtype: 'grid',
          itemId: 'dgvControl',
          store: storeControl,
          reference: 'dgvControl',
          sortableColumns: false,
          columns: [{
              text: 'Padre',
              dataIndex: 'papa',
              flex: 2,
              align: 'center',
              renderer: function (value) {
                return '<h2>' + value + '</h2>'
              }
            },
            {
              text: 'NIÑO',
              dataIndex: 'nino',
              flex: 2,
              align: 'center',
              renderer: function (value) {
                return '<h2>' + value + '</h2>'
              }
            },
            {
              text: 'BRAZALETE',
              dataIndex: 'numerocinta',
              flex: 1,
              align: 'center',
              renderer: function (value, metadata, record) {
                switch (record.get('orden')) {
                  case 1:
                    metadata.style = 'background-color:#F1C40F';
                    return '<h2>' + value + '</h2>';
                    break;
                  case 2:
                    metadata.style = 'background-color:#E59866';
                    return '<h2>' + value + '</h2>';
                    break;
                  case 3:
                    metadata.style = 'background-color:#229954';
                    return '<h2>' + value + '</h2>';
                    break;

                };

              }
            },
            {
              text: 'HORA DESDE',
              dataIndex: 'hdesde',
              flex: 1,
              align: 'center',
              renderer: function (value) {
                return '<h2 style="color:red;">' + value + '</h2>'
              }
            },
            {
              text: 'HORA HASTA',
              dataIndex: 'hhasta',
              flex: 1,
              align: 'center',
              renderer: function (value) {
                return '<h2 style="color:red;">' + value + '</h2>'
              }
            }

          ],
          viewConfig: {
            stripeRows: false,
            loadMask: false
          },
          selModel: {
           // selType: 'checkboxmodel',
           // itemId: 'chkSelection',
           // showHeaderCheckbox: false,
            pruneRemoved: false
          },
          listeners: {
            celldblclick: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
              if (record) {
                Ext.Ajax.request({
                  url: kokojump.util.Rutas.quitarNino,
                  params: {
                    idven: record.get('idven'),
                    orden: record.get('item')
                  },
                  success: function (response) {
                    var respuesta = kokojump.util.Json.decodeJSON(response.responseText);
                    if (respuesta.error > 0) {
                        grid = Ext.ComponentQuery.query('#dgvControl')[0];
                        posicion = grid.getSelectionModel().getSelection()[0];
                        grid.getStore().reload({
                        scope: this,
                        callback: function (records, operation, success) {
                             grid.getSelectionModel().select(record); 
                        }

                      });
                    }

                  }
                });
              }

            }
          }


        }]
      }]
    });
    this.callParent();


    //var _posicion = _grid.getSelectionModel().getSelection()[0].get('id');

    var autoLoadControl = {
      run: function () {
        grid = Ext.ComponentQuery.query('#dgvControl')[0];
        posicion = grid.getSelectionModel().getSelection()[0];
        storeControl.load({
          params: {
            idlocal: Ext.util.Cookies.get('idlocal')
          },
          scope: this,
          callback: function (records, operation, success) {
                grid.getSelectionModel().select(posicion,true); 
          }
        });
      },
      interval: 10000 //* 1 => segundo => 1000
    }
    Ext.TaskManager.start(autoLoadControl);
  }
});
