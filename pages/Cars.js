import React from 'react';
import * as Yup from 'yup';
import TablePxp from '../../_pxp/components/Table/TablePxp';
const Cars = () => {
  const cars = {
    nameForm: 'cars',
    dataReader: {
      dataRows: 'data',
      total: 'count', // this total is the count of whole data the count in the query for example the pxp ever sending count
    },
    columns: {
      code: {
        type: 'TextField',
        initialValue: '',
        // typeTextField: 'password',
        label: 'code',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'code', type: 'string' },
        search: true,
      },
      placa: {
        type: 'TextField',
        initialValue: '',
        // typeTextField: 'password',
        label: 'placa',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'placa', type: 'string' },
        search: true,
      },
      name: {
        type: 'TextField',
        initialValue: '',
        label: 'Name',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'name', type: 'string' },
        search: true,
      },
      color: {
        type: 'TextField',
        initialValue: '',
        label: 'Color',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'color', type: 'string' },
        search: true,
      },
      model: {
        type: 'TextField',
        initialValue: '',
        label: 'Modelo',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'model', type: 'string' },
        search: true,
      },
      brand: {
        type: 'TextField',
        initialValue: '',
        label: 'Marca',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'brand', type: 'string' },
        search: true,
      },
    },
    getDataTable: {
      method: 'GET',
      url: 'trading-nd/Cars/list',
      params: {
        start: '0',
        limit: '10',
        sort: 'code',
        dir: 'desc', // for seeing every time the last save
      },
      load: true,
    },
    idStore: 'carId',
    buttonDel: true,
    buttonNew: true,
    buttonEdit: true,
    actionsTableCell: {
      buttonDel: true,
      buttonEdit: true,
    },
    resetButton: true,
    onSubmit: {
      // when we work with v2 (pxp-nd) we need to add two service
      urlAdd: 'trading-nd/Cars/add',
      urlEdit: 'trading-nd/Cars/edit',
      extraParams: {},
      // todo need to add typeSend for change to send all in jsonFormat or normal pxp
    },
    urlDelete: 'trading-nd/Cars/delete',
    // paginationType: 'infiniteScrolling', // can be infiniteScrolling or pagination
  };
  return (
    <div>
      <h2>Desde Accounting</h2>
      <h1>Example Register of Cars </h1>
      <TablePxp dataConfig={cars} />
    </div>
  );
};

export default Cars;
