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
import React, { useEffect, useRef, useState } from 'react';
import { Project } from '@/types';
import { ProfileService } from '@/service/ProfileService';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { ProfileResourceService } from '@/service/ProfileResourceService';
import { ResourceService } from '@/service/ResourceService';

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const ProfileResource = () => {
    let emptyProfileResource: Project.ProfileResource = {
        id: undefined,
        profile: { description: '' },
        resource: { name: '', key: ''}
    };

    const [profilesResources, setProfilesResources] = useState<Project.ProfileResource[] | null>(null);
    const [profileResourceDialog, setProfileResourceDialog] = useState(false);
    const [deleteProfileResourceDialog, setDeleteProfileResourceDialog] = useState(false);
    const [deleteProfilesResourcesDialog, setDeleteProfilesResourcesDialog] = useState(false);
    const [profileResource, setProfileResource] = useState<Project.ProfileResource>(emptyProfileResource);
    const [selectedProfilesResources, setSelectedProfilesResources] = useState<Project.Profile[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const profileResourceService = new ProfileResourceService();
    const resourceService = new ResourceService();
    const profileService = new ProfileService();
    const [resources, setResources] = useState<Project.Resource[]>([]);
    const [profiles, setProfiles] = useState<Project.Profile[]>([]);


    useEffect(() => {
        if (!profilesResources) {
            profileResourceService.listAll()
                .then((response) => {
                    console.log(response.data);
                    setProfilesResources(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }, [profileResourceService, profilesResources]);

    useEffect(() => {
        if (profileResourceDialog) {
            resourceService.listAll().then((response) => {
                setResources(response.data);
                console.log(resources);
            }).catch((error) => {
                console.log(error);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Error!',
                    detail: 'Error to load resource list'
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
    }, [profileResourceDialog])

    const openNew = () => {
        setProfileResource(emptyProfileResource);
        setSubmitted(false);
        setProfileResourceDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProfileResourceDialog(false);
    };

    const hideDeleteProfileResourceDialog = () => {
        setDeleteProfileResourceDialog(false);
    };

    const hideDeleteProfilesResourcesDialog = () => {
        setDeleteProfilesResourcesDialog(false);
    };

    const saveProfileResource = () => {
        setSubmitted(true);

        if (!profileResource.id) {
            profileResourceService.create(profileResource)
                .then((response) => {
                    setProfileResourceDialog(false);
                    setProfileResource(emptyProfileResource);
                    setProfilesResources(null);
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
            profileResourceService.update(profileResource)
                .then((response) => {
                    setProfileResourceDialog(false);
                    setProfileResource(emptyProfileResource);
                    setProfilesResources(null);
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

    const editProfileResource = (profileResource: Project.ProfileResource) => {
        setProfileResource({ ...profileResource });
        setProfileResourceDialog(true);
    };

    const confirmDeleteProfileResource = (profileResource: Project.ProfileResource) => {
        setProfileResource(profileResource);
        setDeleteProfileResourceDialog(true);
    };

    const deleteProfileResource = () => {
        if (profileResource.id) {
            profileResourceService.delete(profileResource.id)
                .then((response) => {
                    setProfileResource(emptyProfileResource);
                    setDeleteProfileResourceDialog(false);
                    setProfilesResources(null);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Successful!',
                        detail: 'Profile Resource Deleted',
                        life: 3000
                    });
                }).catch((error) => {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error!',
                        detail: 'Error to delete profile resource',
                        life: 3000
                    });
                })
        }
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProfilesResourcesDialog(true);
    };

    const deleteSelectedProfilesResources = () => {

        Promise.all(
            selectedProfilesResources.map(async (_profileResource) => {
                if (_profileResource.id) {
                    await profileResourceService.delete(_profileResource.id);
                }
            })
        ).then((response) => {
            setProfilesResources(null);
            setSelectedProfilesResources([]);
            setDeleteProfilesResourcesDialog(false);
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
        let _profileResource = { ...profileResource };
        _profileResource[`${name}`] = val;

        setProfileResource(_profileResource);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProfilesResources || !(selectedProfilesResources as any).length} />
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

    const idBodyTemplate = (rowData: Project.ProfileResource) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    };

    const profileBodyTemplate = (rowData: Project.ProfileResource) => {
        return (
            <>
                <span className="p-column-title">Profile Description</span>
                {rowData.profile.description}
            </>
        );
    };

    const resourceBodyTemplate = (rowData: Project.ProfileResource) => {
        return (
            <>
                <span className="p-column-title">Profile Description</span>
                {rowData.resource.name}
            </>
        );
    };

    const actionBodyTemplate = (rowData: Project.ProfileResource) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editProfileResource(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteProfileResource(rowData)} />
            </>
        );
    };

    const onSelectProfileChange = (profile: Project.Profile) => {
        let _profileResource = { ...profileResource };
        _profileResource.profile = profile;
        setProfileResource(_profileResource);
    }

    const onSelectResourceChange = (resource: Project.Resource) => {
        let _profileResource = { ...profileResource };
        _profileResource.resource = resource;
        setProfileResource(_profileResource);
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Profile Resource Permissions</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const profileResourceDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProfileResource} />
        </>
    );
    const deleteProfileResourceDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProfileResourceDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteProfileResource} />
        </>
    );
    const deleteProfilesResourcesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProfilesResourcesDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedProfilesResources} />
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
                        value={profilesResources}
                        selection={selectedProfilesResources}
                        onSelectionChange={(e) => setSelectedProfilesResources(e.value as any)}
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
                        <Column field="resource" header="Resource" sortable body={resourceBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={profileResourceDialog} style={{ width: '450px' }} header="Profile Details" modal className="p-fluid" footer={profileResourceDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="description">Profile</label>
                            <Dropdown
                                optionLabel='description' value={profileResource.profile} options={profiles} filter
                                onChange={(e: DropdownChangeEvent) => onSelectProfileChange(e.value)} placeholder='Select a profile...'
                            >
                            </Dropdown>
                            {submitted && !profileResource.profile && <small className="p-invalid">Profile is required.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="description">Resource</label>
                            <Dropdown
                                optionLabel='name' value={profileResource.resource} options={resources} filter
                                onChange={(e: DropdownChangeEvent) => onSelectResourceChange(e.value)} placeholder='Select a resource...'
                            >
                            </Dropdown>
                            {submitted && !profileResource.resource && <small className="p-invalid">Resource is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProfileResourceDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProfileResourceDialogFooter} onHide={hideDeleteProfileResourceDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {profileResource && (
                                <span>
                                    Are you sure you want to delete <b>{profileResource.profile.description}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProfilesResourcesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProfilesResourcesDialogFooter} onHide={hideDeleteProfilesResourcesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {profileResource && <span>Are you sure you want to delete the selected profiles?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default ProfileResource;
