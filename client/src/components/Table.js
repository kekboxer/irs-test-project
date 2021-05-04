import React, {useEffect, useState} from 'react'
import {Grid, ToolBar, Button, Spacer} from '@sencha/ext-react-modern';
import {makeStyles} from '@material-ui/core/styles';
import Axios from "axios";
import isInn from 'is-inn-js'
import {Snackbar} from "@material-ui/core";
import AddOrganizationModal from '../components/Modals/AddOrganizationModal';

const Ext = window['Ext'];

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 0,
        border: "1px solid rgba(0, 0, 0, 0.12)",
        height: "100%",
    },
}));

const Table = ({subjectId}) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [openAlert, setOpenAlert] = useState({
        isOpen: false,
        message: ''
    });
    const classes = useStyles();

// Get modified record, create new instance, modify and send to server
    const onRecordUpdated = async (newStore, record, operation, modifiedFieldNames, details) => {
        if (modifiedFieldNames) {
            const field = modifiedFieldNames[0];
            if (field === 'inn') {
                if (!isInn(record.get(field))) {
                    record.reject();
                    setOpenAlert({isOpen: true, message: 'Некорректный ИНН'});
                    return
                }
            }
            const dataToUpdate = {
                id: record.data.id,
                modified: modifiedFieldNames[0],
                value: record.data[modifiedFieldNames]
            }
            if ((modifiedFieldNames[0].includes('cena') || modifiedFieldNames[0].includes('max')) && record.data[modifiedFieldNames] === '') {
                dataToUpdate.value = null
            }
            if (record.data[modifiedFieldNames].includes(',')) {
                dataToUpdate.value = dataToUpdate.value.replace(',', '.');
            }
            await Axios({
                method: "PUT",
                data: dataToUpdate,
                withCredentials: true,
                url: `http://${process.env.REACT_APP_SERVER}/api/supply/subjects/${subjectId}/organizations`,
            }).then((res) => {
                record.commit();
                setOpenAlert({isOpen: true, message: 'Изменения успешно сохранены'});
            }).catch((e) => {
                    console.log(e);
                    record.reject();
                    setOpenAlert({isOpen: true, message: 'Произошла ошибка. Изменения отменены'});
                }
            )
        }
    }

// Create new store for Grid
    const [store] = useState(new Ext.data.Store({
        data: [],
        listeners: {
            update: onRecordUpdated,
        },
    }));

// Reload data to store if new subject was selected
    useEffect(() => {
        async function getSubjectOrg(subjectId) {
            return Axios({
                method: "GET",
                withCredentials: true,
                url: `http://${process.env.REACT_APP_SERVER}/api/supply/subjects/${subjectId}/organizations`,
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

    const openModal = () => {
        setIsOpenModal(true);
    }

    const closeModal = () => {
        setIsOpenModal(false);
    }

// Modified data from 'Add' modal and send req to server
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
            url: `http://${process.env.REACT_APP_SERVER}/api/supply/subjects/${subjectId}/organizations`,
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

// Get id's of selected rows and deleting them
    const deleteRows = async (event) => {
        const records = event.sender.up().up().getSelections();
        const selectedRows = records.map((item) => {
            return item.data.id
        })
        if (selectedRows.length !== 0) {
            await Axios({
                method: "DELETE",
                data: selectedRows,
                withCredentials: true,
                url: `http://${process.env.REACT_APP_SERVER}/api/supply/subjects/${subjectId}/organizations`,
            }).then((res) => {
                selectedRows.forEach((id) => {
                    store.remove(store.findRecord('id', id));
                })
                setOpenAlert({isOpen: true, message: 'Организации успешно удалены'})
            }).catch(e => console.log(e));
        }
    }

    return (
        <div className={classes.root}>
            <Grid store={store} plugins={{cellediting: true}} height="100%" columnLines={true}
                  selectable={{checkbox: true}}
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
            >
                <ToolBar docked="top">
                    <Button text="Добавить" ui="action" onTap={() => openModal()}/>
                    <Spacer/>
                    <Button text="Удалить" ui="action" onTap={deleteRows}/>
                </ToolBar>
            </Grid>
            <Snackbar open={openAlert.isOpen} autoHideDuration={3000}
                      onClose={() => setOpenAlert({...openAlert, isOpen: false})}
                      message={openAlert.message}/>
            <AddOrganizationModal isOpenModal={isOpenModal} closeModal={closeModal} subjectId={subjectId}
                                  submitModalForm={submitModalForm}/>
        </div>
    )
}

export default Table;
