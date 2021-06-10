<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Compra extends \Phalcon\Mvc\Model
{
    public static function listar()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('public','sp_compra_listar',$parametros);
        return $sql;
    }
    
    public static function actualizar($data)
    {   
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('public','sp_compra_agregar',$param);
        return $sql;
    }

 

}
