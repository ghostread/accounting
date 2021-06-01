import React from 'react'
import { useSelector } from 'react-redux';
import Tree from '../../_pxp/components/Tree'
import useJsonStore from '../../_pxp/hooks/useJsonStore';

const MenuTree = () => {
    const config = {
        icons: {
            collapse:'',
            expand: '',
            end:''
        }
    };
    const menu = useSelector((state) => state.auth.menu);
    const params = {
        url: 'seguridad/Subsistema/listarSubsistema',
        params: {"start":"0","limit":"50","sort":"id_subsistema","dir":"ASC","contenedor":"docs-SISTEM"}
    };
    const { data } = useJsonStore(params); 
    return (
        <div>
            <h1>Menu Tree</h1><hr/>
            <Tree config={ config } data={ menu }/>
        </div>
    )
}

export default MenuTree
