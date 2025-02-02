/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Project } from '@/types';
import { ProfileUserService } from '@/service/ProfileUserService';
import { UserService } from '@/service/UserService';
import { ProfileService } from '@/service/ProfileService';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const ProfileUser = () => {
    let emptyProfileUser: Project.ProfileUser = {
        id: undefined,
        profile: { description: '' },
        user: { name: '', login: '', password: '', email: '' }
    };

    const [profilesUser, setProfilesUser] = useState<Project.ProfileUser[] | null>(null);
    const [profileUserDialog, setProfileUserDialog] = useState(false);
    const [deleteProfileUserDialog, setDeleteProfileUserDialog] = useState(false);
    const [deleteProfilesUserDialog, setDeleteProfilesUserDialog] = useState(false);
    const [profileUser, setProfileUser] = useState<Project.ProfileUser>(emptyProfileUser);
    const [selectedProfilesUser, setSelectedProfilesUser] = useState<Project.Profile[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const profileUserService = new ProfileUserService();
    const userService = new UserService();
    const profileService = new ProfileService();
    const [users, setUsers] = useState<Project.User[]>([]);
    const [profiles, setProfiles] = useState<Project.Profile[]>([]);


    useEffect(() => {
        if (!profilesUser) {
            profileUserService.listAll()
                .then((response) => {
                    console.log(response.data);
                    setProfilesUser(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }, [profileUserService, profilesUser]);

    useEffect(() => {
        if (profileUserDialog) {
            userService.listAll().then((response) => {
                setUsers(response.data);
                console.log(users);
            }).catch((error) => {
                console.log(error);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Error!',
                    detail: 'Error to load user list'
                })
            })

            profileService.listAll().then((response) => {
                setProfiles(response.data);
                console.log(profiles);
            }).catch((error) => {
                console.debug(error);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Error!',
                    detail: 'Error to load profile list'
                })
            })
        }
    }, [profileUserDialog])

    const openNew = () => {
        setProfileUser(emptyProfileUser);
        setSubmitted(false);
        setProfileUserDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProfileUserDialog(false);
    };

    const hideDeleteProfileUserDialog = () => {
        setDeleteProfileUserDialog(false);
    };

    const hideDeleteProfilesUserDialog = () => {
        setDeleteProfilesUserDialog(false);
    };

    const saveProfileUser = () => {
        setSubmitted(true);

        if (!profileUser.id) {
            profileUserService.create(profileUser)
                .then((response) => {
                    setProfileUserDialog(false);
                    setProfileUser(emptyProfileUser);
                    setProfilesUser(null);
                    toast.current?.show({
                        severity: 'info',
                        summary: 'Success',
                        detail: 'Profile registered successfull'
                    });
                })
                .catch((error) => {
                    console.log(error);
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: error
                    });
                })
        } else {
            profileUserService.update(profileUser)
                .then((response) => {
                    setProfileUserDialog(false);
                    setProfileUser(emptyProfileUser);
                    setProfilesUser(null);
                    toast.current?.show({
                        severity: 'info',
                        summary: 'Success',
                        detail: 'Profile changed successfull'
                    });
                })
                .catch((error) => {
                    console.log(error);
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Change error: ' + error.message
                    });
                })
        }
    };

    const editProfileUser = (profileUser: Project.ProfileUser) => {
        setProfileUser({ ...profileUser });
        setProfileUserDialog(true);
    };

    const confirmDeleteProfileUser = (profileUser: Project.ProfileUser) => {
        setProfileUser(profileUser);
        setDeleteProfileUserDialog(true);
    };

    const deleteProfileUser = () => {
        if (profileUser.id) {
            profileUserService.delete(profileUser.id)
                .then((response) => {
                    setProfileUser(emptyProfileUser);
                    setDeleteProfileUserDialog(false);
                    setProfilesUser(null);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Successful!',
                        detail: 'Profile User Deleted',
                        life: 3000
                    });
                }).catch((error) => {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error!',
                        detail: 'Error to delete profile user',
                        life: 3000
                    });
                })
        }
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProfilesUserDialog(true);
    };

    const deleteSelectedProfilesUser = () => {

        Promise.all(
            selectedProfilesUser.map(async (_profileUser) => {
                if (_profileUser.id) {
                    await profileUserService.delete(_profileUser.id);
                }
            })
        ).then((response) => {
            setProfilesUser(null);
            setSelectedProfilesUser([]);
            setDeleteProfilesUserDialog(false);
            toast.current?.show({
                severity: 'success',
                summary: 'Successful!',
                detail: 'Profiles Deleted',
                life: 3000
            })
        }).catch((error) => {
            toast.current?.show({
                severity: 'error',
                summary: 'Error!',
                detail: 'Error to delete profiles',
                life: 3000
            });
        })

    };


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _profileUser = { ...profileUser };
        _profileUser[`${name}`] = val;

        setProfileUser(_profileUser);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProfilesUser || !(selectedProfilesUser as any).length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const idBodyTemplate = (rowData: Project.ProfileUser) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    };

    const profileBodyTemplate = (rowData: Project.ProfileUser) => {
        return (
            <>
                <span className="p-column-title">Profile Description</span>
                {rowData.profile.description}
            </>
        );
    };

    const userBodyTemplate = (rowData: Project.ProfileUser) => {
        return (
            <>
                <span className="p-column-title">Profile Description</span>
                {rowData.user.name}
            </>
        );
    };

    const actionBodyTemplate = (rowData: Project.ProfileUser) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editProfileUser(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteProfileUser(rowData)} />
            </>
        );
    };

    const onSelectProfileChange = (profile: Project.Profile) => {
        let _profileUser = { ...profileUser };
        _profileUser.profile = profile;
        setProfileUser(_profileUser);
    }

    const onSelectUserChange = (user: Project.User) => {
        let _profileUser = { ...profileUser };
        _profileUser.user = user;
        setProfileUser(_profileUser);
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Profile User</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const profileUserDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProfileUser} />
        </>
    );
    const deleteProfileUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProfileUserDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteProfileUser} />
        </>
    );
    const deleteProfilesUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProfilesUserDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedProfilesUser} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={profilesUser}
                        selection={selectedProfilesUser}
                        onSelectionChange={(e) => setSelectedProfilesUser(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} profiles"
                        globalFilter={globalFilter}
                        emptyMessage="No profiles found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="profile" header="Profile" sortable body={profileBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="user" header="User" sortable body={userBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={profileUserDialog} style={{ width: '450px' }} header="Profile Details" modal className="p-fluid" footer={profileUserDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="description">Profile</label>
                            <Dropdown
                                optionLabel='description' value={profileUser.profile} options={profiles} filter
                                onChange={(e: DropdownChangeEvent) => onSelectProfileChange(e.value)} placeholder='Select a profile...'
                            >
                            </Dropdown>
                            {submitted && !profileUser.profile && <small className="p-invalid">Profile is required.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="description">User</label>
                            <Dropdown
                                optionLabel='name' value={profileUser.user} options={users} filter
                                onChange={(e: DropdownChangeEvent) => onSelectUserChange(e.value)} placeholder='Select a user...'
                            >
                            </Dropdown>
                            {submitted && !profileUser.user && <small className="p-invalid">User is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProfileUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProfileUserDialogFooter} onHide={hideDeleteProfileUserDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {profileUser && (
                                <span>
                                    Are you sure you want to delete <b>{profileUser.profile.description}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProfilesUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProfilesUserDialogFooter} onHide={hideDeleteProfilesUserDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {profileUser && <span>Are you sure you want to delete the selected profiles?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default ProfileUser;
