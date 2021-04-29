import React, {useEffect, useState} from 'react'
import {ExtGrid, ExtColumn} from '@sencha/ext-react-modern';
import {makeStyles} from '@material-ui/core/styles';
import Axios from "axios";

const Ext = window['Ext'];


const Table = ({subjectId}) => {

    const onRecordUpdated = (store, record, operation, modifiedFieldNames, details) => {
        const field = modifiedFieldNames[0];
        console.log(`${field} updated to  ${record.get(field)} TALANT: ${record.get('talent')}`)
    }

    const [store, setStore] = useState(new Ext.data.Store({
        data: [],
        listeners: {
            update: onRecordUpdated,
        },
    }));

    useEffect(() => {
        async function getSubjectOrg(subjectId) {
            let organizations = await Axios({
                method: "GET",
                withCredentials: true,
                url: `http://localhost:5000/api/supply/subjects/${subjectId}/organizations`,
            })
            return organizations
        }

        if (subjectId) {
            getSubjectOrg(subjectId).then((res) => {
                if (res.data.length !== 0) {
                    store.loadData(res.data)
                } else {
                    store.loadData([])
                }
            })
        }
    }, [subjectId, store])

    // useEffect(()=> {
    //     console.log('STORE EFFECT', store)
    // }, [store])

    useEffect(()=> {
        console.log('Mounted')
    }, [])



    const [selectedRows, setSelectedRows] = useState({});

    const rowOnSelect = (grid, selected) => {
        console.log(selected)
        console.log(grid)
        setSelectedRows(selected[0])
        console.log(selectedRows)
        //store.remove(selection); // all selections
    }

    const deleteRow = () => {
        console.log(selectedRows)
        store.remove(selectedRows);
        //setSelectedRows({})
    }

    const addNewRow = () => {
        store.add({naim_org: '', adr_fact: '', inn: '', plazma_max: '', plazma_cena: ''})
    }

    return (
        <div>
            <button onClick={addNewRow}>Add</button>
            <button onClick={deleteRow}>Delete</button>
            <ExtGrid
                height="500"
                store={store}
                plugins={['cellediting']}
                // listeners={{selectionchange: rowOnSelect}}
            >
                <ExtColumn
                    text="Наименование"
                    dataIndex="naim_org"
                    flex={1}
                    editable
                />
                <ExtColumn
                    text="Фактический Адрес"
                    dataIndex="adr_fact"
                    flex={1}
                    editable
                />
                <ExtColumn
                    text="ИНН"
                    dataIndex="inn"
                    flex={1}
                    editable
                />
                <ExtColumn
                    text="Плазма макс"
                    dataIndex="plazma_max"
                    flex={1}
                    editable
                />
                <ExtColumn
                    text="Плазма макс"
                    dataIndex="plazma_cena"
                    flex={1}
                    editable
                />
            </ExtGrid>
        </div>
    )
}

export default Table;
