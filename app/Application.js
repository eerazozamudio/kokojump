
Ext.define('kokojump.Application', {
    extend: 'Ext.app.Application',
    name: 'kokojump',
    controllers:[
        'DataStatica'
    ],
    stores: [
        'kokojump.store.Productos',
        'kokojump.store.DataTemp',
        'kokojump.store.Empleados',
        'kokojump.store.Ventas',
        'kokojump.store.Clientes',
        'kokojump.store.Presentacion',
        'EventosMes',
        'kokojump.store.Proveedores'

    ],
    views:[
        'pdv.Contenedor',
        'main.Main',
        'producto.Listado',
        'producto.Mantenimiento',
        'admin.ListadoClientes',
        'admin.Dashboard',
        'admin.ListadoProveedores',
        'admin.ListadoPagos',
        'admin.ListadoConfig',
        'pdv.Nino',
        'pdv.NinoMenbresia',
        'pdv.Apoderado',
        'producto.RegistroGastos',
        'main.Login',
        'pdv.ContenedorVenta',
        'pdv.MainVenta',
        'producto.MantenimientoVenta',
        'calendario.Calendario',
        'producto.ListServicio',
        'kokojump.view.compra.Contenedor',
        'kokojump.view.compra.Listado',
        'kokojump.view.compra.Formulario'

    ],
     models: [
        'kokojump.model.DataModels'
     ],
    init: function () {
        Ext.util.Format.decimalSeparator = '.';
        Ext.util.Format.thousandSeparator = ' ';

        Ext.getBody().on('keydown', function(ev){
            if(ev.getKey() === ev.self.F2){
                Ext.ComponentQuery.query('#codigobarra')[0].focus(1);
                // megafilmperu.util.Util.crearWindowOpenMantenimiento('Tipo de Cambio','wfrmTipoCambio',450,130,null,'wTipoCambio');
              }
        });

        Ext.create('kokojump.view.main.Login');
        

    }
});
