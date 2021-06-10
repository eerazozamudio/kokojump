Ext.define('kokojump.model.DataModels',
{extend: 'Ext.data.Model',
fields: [{ name: 'id', type: 'int' }]});

// @Model : Categoria
Ext.define('kokojump.model.Categoria', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idcate', type: 'int' },
        { name: 'descripcion', type: 'string' }
      ]
});


// @Model : sub categoria
Ext.define('kokojump.model.SubCategoria', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idsubcate', type: 'int' },
        { name: 'idcate', type: 'int' },
        { name: 'descripcion', type: 'string' }
      ]
});


// @Model : Producto
Ext.define('kokojump.model.Producto', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idprod', type: 'int' },
        { name: 'nombre', type: 'string' },
        { name: 'idcate', type: 'int' },
        { name: 'categoria', type: 'string' },
        { name: 'idsubcate', type: 'int' },
        { name: 'subcategoria', type: 'string' },
        { name: 'precioventa', type: 'float' },
        { name: 'stock', type: 'int' },
        { name: 'imagen', type: 'boolean' },
        { name: 'llevacontrol', type: 'boolean' },
        { name: 'minutos', type: 'int' },
        { name: 'orden', type: 'int' },
        { name: 'item', type: 'int' },
        { name: 'codigobarra', type: 'string' },
        { name: 'esmembresia', type: 'boolean' },
        { name: 'contarvisita', type: 'boolean' },
        { name: 'stockminimo', type: 'int' },
        { name: 'manejastock', type: 'boolean' },
        { name: 'idpresentacion', type: 'int' }
      ]
});


// @Model : Persona
Ext.define('kokojump.model.Persona', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idtra', type: 'int' },
        { name: 'nombres', type: 'string' },
        { name: 'dni', type: 'string' },
        { name: 'direccion', type: 'string' },
        { name: 'celular', type: 'string' },
        { name: 'telefono', type: 'string' },
        { name: 'estado', type: 'int' },
      ]
});

// @Model : Cliente
Ext.define('kokojump.model.Cliente', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idclie', type: 'int' },
        { name: 'nombres', type: 'string' },
        { name: 'dni', type: 'string' },
        { name: 'estado', type: 'int' }
      ]
});

// @Model : Local
Ext.define('kokojump.model.Local', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idlocal', type: 'int' },
        { name: 'direccion', type: 'string' },
        { name: 'telefono', type: 'string' },
        { name: 'celular', type: 'string' },
        { name: 'estado', type: 'string' },
        { name: 'descripcion', type: 'string' },
        { name: 'usuario', type: 'string' }

      ]
});

// @Model : Forma Pago
Ext.define('kokojump.model.FormaPago', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idfpag', type: 'int' },
        { name: 'descripcion', type: 'string' },
        { name: 'estado', type: 'int' }

      ]
});


// @Model : Forma Listado Caja
Ext.define('kokojump.model.Pedidos', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idven', type: 'int' },
        { name: 'idclie', type: 'int' },
        { name: 'idlocal', type: 'int' },
        { name: 'dinerorecibido', type: 'float' },
        { name: 'dinerovuelto', type: 'float' },
        { name: 'formapago', type: 'string' },
        { name: 'numerorecibo', type: 'string' },
        { name: 'idemp', type: 'int' },
        { name: 'empleado', type: 'string' },
        { name: 'idest', type: 'int' },
        { name: 'estadopagostr', type: 'string' },
        { name: 'fechaventa', type: 'string' },
        { name: 'totalventa', type: 'float' },
        { name: 'cliente', type: 'string' },
        { name: 'milocal', type: 'string' }


      ]
});

// @Model : Detalle de Pedido
Ext.define('kokojump.model.DetallePedido', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idprod', type: 'int' },
        { name: 'nombre', type: 'string' },
        { name: 'cantidad', type: 'int' },
        { name: 'precio', type: 'float' },
        { name: 'total', type: 'float' },
        { name: 'nino', type: 'string' },
        { name: 'hdesde', type: 'string' },
        { name: 'hhasta', type: 'string' },
        { name: 'minutos', type: 'integer' }
      ]
});

// @Model : Hijo de apoderados
Ext.define('kokojump.model.Apoderado', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idhijo', type: 'int' },
        { name: 'nombres', type: 'string' },
        { name: 'apellidos', type: 'string' },
        { name: 'edad', type: 'int' },
        { name: 'idapoderado', type: 'int' },
        { name: 'estado', type: 'int' }
      ]
});



// @Model : Niño Busqueda
Ext.define('kokojump.model.Nino', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'nombres', type: 'string' },
        { name: 'apellidos', type: 'string' },
        { name: 'edad', type: 'int' },
        { name: 'estado', type: 'int' },
        { name: 'ultimavisita', type: 'int' },
        { name: 'usumenbre', type: 'int' },
        { name: 'membresiadesde', type: 'string' },
        { name: 'membresiahasta', type: 'string' },
        { name: 'idmembre', type: 'int' },


      ]
});

// @Model : Niños Todos
Ext.define('kokojump.model.NinoTodos', {
    extend: 'Ext.data.Model',
    fields: [
        { name: '_id', type: 'int' },
        { name: '_nombres', type: 'string' },
        { name: '_apellidos', type: 'string' },
        { name: '_ultimavisita', type: 'int' }
      ]
});



// @Model : Control de niños juegando
Ext.define('kokojump.model.Control', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idven', type: 'int' },
        { name: 'idnino', type: 'int' },
        { name: 'nino', type: 'string' },
        { name: 'edad', type: 'int' },
        { name: 'hdesde', type: 'string' },
        { name: 'hhasta', type: 'string' },
        { name: 'papa', type: 'string' },
        { name: 'numerocinta', type: 'string' },
        { name: 'fono', type: 'string' },
        { name: 'item', type: 'int' },
        
      ]
});



// @Model : Control Apoderados Listado Todos
Ext.define('kokojump.model.Apoderados', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idapo', type: 'int' },
        { name: 'nombres', type: 'string' },
        { name: 'apellidos', type: 'string' },
        { name: 'dni', type: 'string' },
        { name: 'telefono', type: 'string' },
        { name: 'correo', type: 'string' }
      ]
});


// @Model : Control de gastos
Ext.define('kokojump.model.Gasto', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idgasto', type: 'int' },
        { name: 'fecha', type: 'string' },
        { name: 'descripcion', type: 'string' },
        { name: 'montogasto', type: 'float' },
        { name: 'tienda', type: 'string' }
      ]
});



// @Model : sub categoria
Ext.define('kokojump.model.Evento', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'idclie', type: 'int' },
        { name: 'cliente', type: 'string' },
        { name: 'fecha', type: 'string' },
        { name: 'dfecha', type: 'date' },
        { name: 'horainicio', type: 'string' },
        { name: 'horatermino', type: 'string' },
        { name: 'nomevento', type: 'string' },
        { name: 'adelantos', type: 'float' },
        { name: 'total', type: 'float' },
        { name: 'idlocal', type: 'int' },
        { name: 'fechaadelanto', type: 'string' },
        { name: 'adelanto2', type: 'float' },
        { name: 'fechaadelanto2', type: 'string' },
        { name: 'adelanto3', type: 'string' },
        { name: 'fechaadelanto3', type: 'string' },
        { name: 'adelanto4', type: 'string' },
        { name: 'fechaadelanto4', type: 'string' },
        { name: 'direccion', type: 'string' },
        { name: 'estado', type: 'string' },
        { name: 'telefono', type: 'string' },
        { name: 'correo', type: 'string' }
      ]
});


// @Model : Presentacion
Ext.define('kokojump.model.Presentacion', {
  extend: 'Ext.data.Model',
  fields: [
      { name: 'idpresentacion', type: 'int' },
      { name: 'descripcion', type: 'string' }
    ]
});

// @Model : Detalle de compra
Ext.define('kokojump.model.Item',{
  extend: 'Ext.data.Model',
  fields: [
      { name: 'idprod', type: 'int' },
      { name: 'nombre', type: 'string' },
      { name: 'cantidad', type: 'int' },
      { name: 'total', type: 'float' },
    ]
  }
);


// @Model : Proveedor
Ext.define('kokojump.model.Proveedor',{
  extend: 'Ext.data.Model',
  fields: [
      { name: 'idprov', type: 'int' },
      { name: 'razonsocial', type: 'string' },
      { name: 'telefono', type: 'string' },
      { name: 'correo', type: 'string' },
      { name: 'idestado', type: 'int' }
    ]
  }
);

// @Model : Proveedor
Ext.define('kokojump.model.Compra',{
  extend: 'Ext.data.Model',
  fields: [
      { name: 'idcompra', type: 'int' },
      { name: 'idprov', type: 'string' },
      { name: 'razonsocial', type: 'string' },
      { name: 'fecha', type: 'string' },
      { name: 'documento', type: 'string' },
      { name: 'estado', type: 'int' },
      { name: 'total', type: 'float' },
    ]
  }
);

