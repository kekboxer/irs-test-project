import React, {useEffect, useState} from 'react'
import {ExtGrid} from '@sencha/ext-react-modern';
import {makeStyles} from '@material-ui/core/styles';
import Axios from "axios";
import TableToolbar from "./TableToolbar";
import isInn from 'is-inn-js'
import {Snackbar} from "@material-ui/core";
import AddOrganizationModal from '../components/Modals/AddOrganizationModal'

const Ext = window['Ext'];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        paddingTop: 0,
        border: "1px solid rgba(0, 0, 0, 0.12)",
        height: "100%",
    },
}));

const Table = ({subjectId}) => {
    const [disableSaveButton, setDisableSaveButton] = useState(true);
    const classes = useStyles();

    const onRecordUpdated = (newStore, record, operation, modifiedFieldNames, details) => {
        if (modifiedFieldNames) {
            const field = modifiedFieldNames[0];
            if (field === 'inn') {
                if (!isInn(record.get(field))) {
                    record.reject();
                    setOpenAlert(true);
                }
            }
            record.commit();
            setDisableSaveButton(false)
        }
    }

    const [store] = useState(new Ext.data.Store({
        data: [],
        listeners: {
            update: onRecordUpdated,
        },
    }));

    useEffect(() => {
        async function getSubjectOrg(subjectId) {
            return Axios({
                method: "GET",
                withCredentials: true,
                url: `http://localhost:5000/api/supply/subjects/${subjectId}/organizations`,
            })
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

    const [openAlert, setOpenAlert] = React.useState(false);

    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = () => {
        setIsOpenModal(true);
    }

    const closeModal = () => {
        setIsOpenModal(false);
    }

    const submitModalForm = (data) => {
        console.log(data);
        store.add(data)
        setIsOpenModal(false);
    }

    return (
        <div className={classes.root}>
            <TableToolbar openModal={openModal} disableSaveButton={disableSaveButton}/>
            <ExtGrid
                width="100%"
                height="91%"
                store={store}
                plugins={['cellediting']}
                columnLines={true}
                // listeners={{selectionchange: rowOnSelect}}
                columns={[
                    {
                        text: "Организация-исполнитель",
                        flex: 3,
                        menuDisabled: true,
                        columns: [{
                            text: "Наименование",
                            dataIndex: "naim_org",
                            flex: 1,
                            editable: true,
                            draggable: false
                        }, {
                            text: "Местонахождение",
                            dataIndex: "adr_fact",
                            flex: 1,
                            editable: true,
                            draggable: false
                        }, {
                            text: "ИНН",
                            dataIndex: "inn",
                            flex: 1,
                            editable: true,
                            draggable: false
                        }]
                    },
                    {
                        text: "Плазма свежезамор.",
                        flex: 2,
                        menuDisabled: true,
                        columns: [{
                            text: "Макс. об. (тыс. литров)",
                            dataIndex: "plazma_max",
                            flex: 1,
                            editable: true,
                            draggable: false
                        }, {
                            text: "Цена (тыс. руб. за один литр)",
                            dataIndex: "plazma_cena",
                            flex: 1,
                            editable: true,
                            draggable: false
                        }]
                    },
                    {
                        text: "Эритроцитарная масса",
                        flex: 2,
                        menuDisabled: true,
                        columns: [{
                            text: "Макс. об. (тыс. литров)",
                            dataIndex: "erm_max",
                            flex: 1,
                            editable: true,
                            draggable: false
                        }, {
                            text: "Цена (тыс. руб. за один литр)",
                            dataIndex: "erm_cena",
                            flex: 1,
                            editable: true,
                            draggable: false
                        }]
                    },
                    {
                        text: "Иммуноглобулин человека",
                        flex: 2,
                        menuDisabled: true,
                        columns: [{
                            text: "Макс. об. (тыс. литров)",
                            dataIndex: "immg_max",
                            flex: 1,
                            editable: true,
                            draggable: false
                        }, {
                            text: "Цена (тыс. руб. за один литр)",
                            dataIndex: "immg_cena",
                            flex: 1,
                            editable: true,
                            draggable: false
                        }]
                    },
                    {
                        text: "Альбумин 10-процентный",
                        flex: 2,
                        menuDisabled: true,
                        columns: [{
                            text: "Макс. об. (тыс. литров)",
                            dataIndex: "alb_max",
                            flex: 1,
                            editable: true,
                            draggable: false
                        }, {
                            text: "Цена (тыс. руб. за один литр)",
                            dataIndex: "alb_cena",
                            flex: 1,
                            editable: true,
                            draggable: false
                        }]
                    },
                ]}
            />
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)}
                      message="Некорректный номер ИНН!"/>
            <AddOrganizationModal isOpenModal={isOpenModal} closeModal={closeModal} subjectId={subjectId} submitModalForm={submitModalForm}/>
        </div>
    )
}

export default Table;
