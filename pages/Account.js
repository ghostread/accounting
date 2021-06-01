import React from 'react'
import * as Yup from 'yup';
import TablePxp from '../../_pxp/components/Table/TablePxp';

const Account = () => {

    const account = {
        nameForm: 'account',
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
          // parent: {
          //   type: 'TextField',
          //   initialValue: '',
          //   label: 'parent',
          //   gridForm: { xs: 12, sm: 4 },
          //   variant: 'outlined',
          //   validate: {
          //     shape: Yup.string().required('Required'),
          //   },
          //   filters: { pfiltro: 'parent', type: 'string' },
          //   search: true,
          // },
        },
        getDataTable: {
          method: 'GET',
          url: 'accounting/Acount/find',
          params: {
            start: '0',
            limit: '10',
            sort: 'code',
            dir: 'desc', // for seeing every time the last save
          },
          load: true,
        },
        idStore: 'acountId',
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
          urlAdd: 'accounting/Acount/add',
          urlEdit: 'accounting/Acount/edit',
          extraParams: {},
          // todo need to add typeSend for change to send all in jsonFormat or normal pxp
        },
        urlDelete: 'accounting/Acount/delete',
        // paginationType: 'infiniteScrolling', // can be infiniteScrolling or pagination
      };

    return (
        <div>
            <h2 >Account Component</h2><hr/>
            <TablePxp dataConfig={account} />
        </div>
    );
}

export default Account
