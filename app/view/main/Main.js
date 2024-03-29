Ext.define('kokojump.view.main.Main', {
    extend: 'Ext.container.Viewport',
    layout: 'border',
    alias: 'wMain',
    requires: [
        'kokojump.view.main.MainController',
        'kokojump.view.menu.Tree'
    ],
    controller: 'main',
    items:[
        {
        region: 'west',
        title: '.: KokoJump :.',
        iconCls :'fa fa-cogs',
        titleCollapse: false,
        width: 210,
        collapsed :false,
        collapsible :true,
        layout: {
          type:'vbox',
          align:'streach'
          /* type: 'accordion',
           titleCollapse: false,
           collapsed :false,
           fill: false,
           animate: true,*/
        },
        items:
        [
          {
            xtype  :'image',
            src    : 'resources/images/empresa.jpeg',
            padding: 10,
            width  : 210,
            height : 100,
          },
            {
                itemId: 'panGestionkokojump', //'panGestionCliente',
                //layout:'anchor',
                layout:'vbox',
                defaultType:'button',
                defaults: {
                  scale : 'large',
                 // anchor :'100%',
                  iconAling:'left',
                  width: 202
                },
                items: [
                  //{xtype:'menutree',reference: 'treekokojump', //'treeGestionClientes',layout: 'fit',listeners: {itemClick: 'onClickOpcionMenu'}}
                  {
                    flex : 1,
                    text: 'Nuevo Servicio',
                    itemId: "wPdvContenedor",
                    titulo: "..: Servicio :.." ,
                    textAlign : 'left',
                    margin: '3 3 1 3',
                    iconCls : 'fa fa-ticket fa-2x',
                    handler:'onClickOpcionBotonMenu'
                  },
                  {
                    flex : 1,
                    text: 'Venta Producto',
                    itemId: "wPdvContenedorVenta",
                    titulo: "..: Venta :.." ,
                    margin: '3 3 1 3',
                    handler:'onClickOpcionBotonMenu',
                    textAlign : 'left',
                    iconCls : 'fa fa-gift fa-2x',

                  },
                  {
                    flex : 1,
                    text: 'Control',
                    itemId: "wAdminDashBoard",
                    margin: '3 3 1 3',
                     titulo: "..: Control de Niños :.." ,
                    handler:'onClickOpcionBotonMenu',
                    iconCls : 'fa fa-eye fa-2x',
                    textAlign : 'left',
                  },
                  {
                    flex : 1,
                    text: 'Configuraciones',
                    itemId: "wRegConfig",
                    titulo: "..: Configuraciones :..",
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu',
                    iconCls : 'fa fa-codepen fa-2x',
                    textAlign : 'left',

                  },
                  {
                    flex : 1,
                    text: 'Caja / Pagos',
                    itemId: "wListadoPagos",
                    titulo: "..: Caja :.." ,
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu',
                    iconCls : 'fa fa-line-chart fa-2x',
                    textAlign : 'left',

                  },
                  {
                    flex : 1,
                    text: 'Servicios',
                    itemId: "wRegProducto",
                    titulo: "..: Servicios :..",
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu',
                    iconCls : 'fa fa-lightbulb-o fa-2x',
                    textAlign : 'left',
                  },
                  {
                    flex : 1,
                    text: 'Productos',
                    itemId: "wRegProductoVenta",
                    titulo: "..: Productos :..",
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu',
                    textAlign : 'left',
                    iconCls : 'fa fa-shopping-cart fa-2x',

                  },
                  {
                    flex : 1,
                    text: 'Compras',
                    itemId: "wRegCompras",
                    titulo: "..: Ingresos :..",
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu',
                    textAlign : 'left',
                    iconCls : 'fa fa-truck fa-2x',

                  },
                  {
                    flex : 1,
                    text: 'Salidas Internas',
                    itemId: "wRegSalidaInterna",
                    titulo: "..: Salidas Internas :..",
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu',
                    textAlign : 'left',
                    iconCls : 'fa fa-truck fa-2x',

                  },
                  {
                    flex : 1,
                    text: 'Gastos',
                    itemId: "wRegGastos",
                    titulo: "Gastos",
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu',
                    textAlign : 'left',
                    iconCls : 'fa fa-cc fa-2x',

                  },
                  {
                    flex : 1,
                    text: 'Eventos',
                    itemId: "wcalendario",
                    titulo: "Calendario de Eventos",
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu',
                    textAlign : 'left',
                    iconCls : 'fa fa-calendar fa-2x',

                  }

                ]
            }
          ]
       },//fin west
       {
        region: 'center',
        padding: 5,
        reference: 'tabPrincipal',
        itemId : 'tabPrincipal',
        defaults: {bodyPadding: 0},
        scrollable: true,
        layout:'fit',
          items: [
            {
              xtype : 'wcalendario',
              title : 'Calendario de Eventos'
            }
           /* {
              title: 'Nosotros',
              bodyPadding:200,
              //layout:'fit',
              layout:'vbox',
              items:[
                {
                  xtype  :'image',
                  src    : 'resources/images/lgsis.png',
                  width  : 300,
                  height : 80,
                },
                {
                  xtype  :'label',
                  text : 'Direccion : Urb. Santo Domingo Mz. D Lote 5'
                },
                {
                  xtype  :'label',
                  text : 'Ing. : Eddy Erazo'
                },
                {
                  xtype  :'label',
                  text : 'Telefono : 925 183 347'
                },
                             ]
            }  */
          ]
      },
      {
        region:'south',
        padding : 0,
        layout:'hbox',
        items:[
          {xtype:'panel', itemId:'panDetalleLocal',flex:3 },
          {xtype:'button',text :'CERRAR SESSION',flex:1,height:36.5,handler:'onclickSalirApp'},
        ]
      }
    ]
});
