import React, { useState,useEffect } from 'react'
import * as Yup from 'yup';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Toolbar from '@material-ui/core/Toolbar';
import Tree from './Tree';
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ModalForm from '../components/ModalForm';
import Confirm from '../../_pxp/components/Alert/Confirm';
import Pxp from '../../Pxp'
import { useSnackbar } from 'notistack';

// import Demo from './Demo'
const TreeMaterial = () => {

  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
  });
  const [isSelectNode,setIsSelectNode]=useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  const [showTree, setShowTree] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [configNode,setConfigNode]=useState({
    nodeId:null,
    url:'accounting/Acount/save',
    method:'POST',
  });
  const [values, setValues] = useState({
    code: null,
    name: null,
    parent: null
  });

  const addParentId = (idParent) => {
    setValues({
      ...values,
      parentId: idParent.toString()
    })
  }

  const handleClose = () => {
    setOpenDialog(false);
    setShowTree(true);
    setIsSelectNode(false);
  };
  const handleOpen = () => {
    setShowTree(false);
    setIsEdit(false);
    setOpenDialog(true);
   
  }
  const handleOpenEdit = () => {
    setShowTree(false);
    setIsEdit(true);
    setOpenDialog(true);
  }

  const handleConfirmDelete=()=>{
    setShowTree(false);
    Pxp.apiClient
    .doRequest({
      url: config.urlDelete,
      ...(Pxp.apiClient.backendVersion === 'v2' && {
        method: 'DELETE',
        url: `${config.urlDelete}/${values.acountId}`,
      })
    })
    .then((resp) => {
      enqueueSnackbar('Success', {
        variant: 'success',
        action: <Button>See all</Button>,
      });
      // handleRefresh();
    })
    .catch((err) => {
      enqueueSnackbar(err.message, {
        variant: 'error',
      });
      // handleRefresh();
    })
  }

  const handleDelete=()=>{
   
    setConfirmDelete({
      open: true,
    })
    console.log('Delete');

  }

  const nodeValues = (nodo) => {
    setIsSelectNode(true);
    setValues({
        parentId:nodo.parentId,
        acountId:nodo.acountId,
        name:nodo.name,
        code:nodo.code
      })
  }

  const config = {
    nameForm: 'Nodos',
    columns: {
      name: {
        type: 'TextField',
        initialValue: '',
        label: 'Nombre',
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        search: true,
        filters: {
          pfiltro: 'name',
          type: 'string'
        }
      },
      code: {
        type: 'TextField',
        label: 'Codigo',
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
      },
      
    },
    getData: {
      method: 'GET',
      url: 'accounting/Acount/list',
      params: {
        // start: '0',
        // limit: '10',
        sort: 'acountId',
        dir: 'asc',
      },
      load: true,
    },
    idStore: 'acountId',
    // display: 'code',
    onSubmit: {
      url: configNode.url,
      method:configNode.method,
      extraParams:{
        acountId:configNode.nodeId,
        parentId:configNode.parentId?configNode.parentId:null,
      },
      callback:(data)=>{
        setShowTree(true);
        setOpenDialog(false);
        setIsSelectNode(false);
        console.log('callback ');
      }
      // urlAdd: 'accounting/Acount/save',
      // urlEdit: 'accounting/Acount/edit',
    },
    urlDelete: 'accounting/Acount/delete',
    buttonDel: false,
    buttonNew: true,
    buttonEdit: false,
    resetButton: true,
    buttonPdf: true,
    buttonXlsx: true,
    actionsTableCell: {
      buttonDel: true,
      buttonEdit: true,
    },
  }
  
    // useEffect(() => {
    //   console.log('values',values)
    //   if(values.acountId){
    //     setConfigNode({
    //       nodeId:values.acountId,
    //       url:'accounting/Acount/edit/'+values.acountId,
    //       method:'PATCH'
    //     })
    //   }
      
    // }, [values])
  
    useEffect(() => {
    
      if(!isEdit){
        setConfigNode({
          parentId:values.acountId?values.acountId:null,
          nodeId:null,
          url:'accounting/Acount/save/',
          method:'POST'
        })
      }else{
        setConfigNode({
          parentId:values.parentId,
          nodeId:values.acountId,
          url:'accounting/Acount/edit/'+values.acountId,
          method:'PATCH'
        })
      }

    }, [openDialog])

    useEffect(() => {
      if(confirmDelete.open){
        // setShowTree(false);
      }else{
        setShowTree(true);
      }
    }, [confirmDelete])



  return (
    <div>
      <h1> Tree Material-UI</h1><hr />
      <AppBar position="static">
        <Toolbar>
          <Button onClick={handleOpen} color="inherit"><AddIcon /></Button>
          <Button  onClick={()=>isSelectNode && handleOpenEdit()} color="inherit"><EditIcon /></Button>
          <Button  onClick={()=>isSelectNode && handleDelete()} color="inherit"><DeleteIcon /></Button>
        </Toolbar>
      </AppBar>
      <Confirm
        openConfirm={confirmDelete.open}
        disagree = 'Canselar'
        agree = 'Eliminar'
        // dialogTitle = 'Esta Seguro que quiere eliminar el nodo?'
        setOpenConfirm={setConfirmDelete}
        dialogContentText="??Est?? seguro de eliminar el nodo?"
        // data={confirmDelete.data}
        onConfirm={handleConfirmDelete}
      />
      { showTree && <Tree
      
        config={config}
        addParentId={addParentId}
        nodeValues={nodeValues} />
        }

      {
        openDialog && (
          <ModalForm
            isEdit={isEdit}
            schema={config}
            values={values}
            open={openDialog}
            handleClose={handleClose}
          />
        )
      }
      {/* <Demo config={config}/> */}
    </div >
  )
}

export default TreeMaterial
