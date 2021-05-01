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
        paddingTop: 0,
        border: "1px solid rgba(0, 0, 0, 0.12)",
        height: "100%",
    },
}));

const Table = ({subjectId}) => {
    const [disableSaveButton, setDisableSaveButton] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(true);
    const [openAlert, setOpenAlert] = React.useState({
        isOpen: false,
        message: ''
    });
    const classes = useStyles();

    const onRecordUpdated = (newStore, record, operation, modifiedFieldNames, details) => {
        if (modifiedFieldNames) {
            const field = modifiedFieldNames[0];
            if (field === 'inn') {
                if (!isInn(record.get(field))) {
                    record.reject();
                    setOpenAlert({isOpen: true, message: 'Некорректный ИНН'});
                    console.log(openAlert)
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
        setSelectedRows([]);

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
                    const dataToStore = res.data;
                    for (let key in dataToStore) {
                        if (dataToStore.hasOwnProperty(key) && dataToStore[key] === null) {
                            dataToStore[key] = '';
                        }
                    }
                    store.loadData(dataToStore);
                } else {
                    store.loadData([]);
                }
            }).catch(e => console.log(e))
        }
    }, [subjectId, store])

    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = () => {
        setIsOpenModal(true);
    }

    const closeModal = () => {
        setIsOpenModal(false);
    }

    const submitModalForm = async (newOrgData) => {
        for (let key in newOrgData) {
            if (key.toString().includes('cena') || key.toString().includes('max')) {
                newOrgData[key] = newOrgData[key].replace(',', '.');
            }
            if (newOrgData[key] === '') {
                newOrgData[key] = null;
            }
        }
        await Axios({
            method: "POST",
            data: newOrgData,
            withCredentials: true,
            url: `http://localhost:5000/api/supply/subjects/${subjectId}/organizations`,
        }).then((res) => {
            for (let key in newOrgData) {
                if (newOrgData.hasOwnProperty(key) && newOrgData[key] === null) {
                    newOrgData[key] = '';
                }
            }
            store.add({...newOrgData, id: res.data.id})
            setOpenAlert({isOpen: true, message: 'Организация успешно добавлена'})
            setIsOpenModal(false);
        }).catch((err) => {
            setOpenAlert({isOpen: true, message: 'Произошла ошибка при добавлении'})
        })
    }

    const selectRows = (grid, records, isSelect, selectionObj) => {
        setSelectedRows(selectionObj._selected.items.map((item) => {
            return item.data.id
        }));
    }

    useEffect(() => {
        selectedRows.length === 0 ? setIsDeleteButtonDisabled(true) : setIsDeleteButtonDisabled(false)
    }, [selectedRows])

    const deleteRows = async () => {
        await Axios({
            method: "DELETE",
            data: selectedRows,
            withCredentials: true,
            url: `http://localhost:5000/api/supply/subjects/${subjectId}/organizations`,
        }).then((res) => {
            selectedRows.forEach((id) => {
                store.remove(store.findRecord('id', id));
            })
            setOpenAlert({isOpen: true, message: 'Организации успешно удалены'})
            setSelectedRows([]);
        }).catch(e => console.log(e));
    }

    return (
        <div className={classes.root}>
            <TableToolbar openModal={openModal} disableSaveButton={disableSaveButton}
                          isDeleteButtonDisabled={isDeleteButtonDisabled} deleteRows={deleteRows}/>
            <ExtGrid
                height="91%"
                store={store}
                plugins={['cellediting', 'rowoperations']}
                columnLines={true}
                listeners={{selectionchange: selectRows}}
                columns={[
                    {
                        text: "Организация-исполнитель",
                        menuDisabled: true,
                        columns: [{
                            text: "Наименование",
                            dataIndex: "naim_org",
                            editable: true,
                            draggable: false
                        }, {
                            text: "Местонахождение",
                            dataIndex: "adr_fact",
                            editable: true,
                            draggable: false
                        }, {
                            text: "ИНН",
                            dataIndex: "inn",
                            editable: true,
                            draggable: false
                        }]
                    },
                    {
                        text: "Плазма свежезамор.",
                        menuDisabled: true,
                        columns: [{
                            text: "Макс. об. (тыс. литров)",
                            dataIndex: "plazma_max",
                            editable: true,
                            draggable: false
                        }, {
                            text: "Цена (тыс. руб. за один литр)",
                            dataIndex: "plazma_cena",
                            editable: true,
                            draggable: false
                        }]
                    },
                    {
                        text: "Эритроцитарная масса",
                        menuDisabled: true,
                        columns: [{
                            text: "Макс. об. (тыс. литров)",
                            dataIndex: "erm_max",
                            editable: true,
                            draggable: false
                        }, {
                            text: "Цена (тыс. руб. за один литр)",
                            dataIndex: "erm_cena",
                            editable: true,
                            draggable: false
                        }]
                    },
                    {
                        text: "Иммуноглобулин человека",
                        menuDisabled: true,
                        columns: [{
                            text: "Макс. об. (тыс. литров)",
                            dataIndex: "immg_max",
                            editable: true,
                            draggable: false
                        }, {
                            text: "Цена (тыс. руб. за один литр)",
                            dataIndex: "immg_cena",
                            editable: true,
                            draggable: false
                        }]
                    },
                    {
                        text: "Альбумин 10-процентный",
                        menuDisabled: true,
                        columns: [{
                            text: "Макс. об. (тыс. литров)",
                            dataIndex: "alb_max",
                            editable: true,
                            draggable: false
                        }, {
                            text: "Цена (тыс. руб. за один литр)",
                            dataIndex: "alb_cena",
                            editable: true,
                            draggable: false
                        }]
                    },
                ]}
            />
            <Snackbar open={openAlert.isOpen} autoHideDuration={3000}
                      onClose={() => setOpenAlert({...openAlert, isOpen: false})}
                      message={openAlert.message}/>
            <AddOrganizationModal isOpenModal={isOpenModal} closeModal={closeModal} subjectId={subjectId}
                                  submitModalForm={submitModalForm}/>
        </div>
    )
}

export default Table;
