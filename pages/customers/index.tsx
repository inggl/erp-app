import {NextPage} from "next";
import React from "react";
import * as yup from "yup";
import {FastField, Form, Formik} from 'formik';
import {toast} from "react-toastify";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Tooltip
} from "@mui/material";
import {FormattedMessage, useIntl} from "react-intl";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from "../../components/TextField";
import {Table} from "../../components/Table";
import {ColumnDef} from "@tanstack/react-table";
import {Customer} from "../../interfaces/customer";
import makeData from "../../utils/makeData";
import {useRouter} from "next/router";

const customerValidationSchema = yup.object({
    name: yup.string().required("Please add customer name"),
    address: yup.object().default({}).required("Please provide customer address")
});

interface CustomerFormValues extends yup.InferType<typeof customerValidationSchema> {
}

const Customer: NextPage = () => {
    const executedRef = React.useRef(false);
    const intl = useIntl();
    const router = useRouter();

    const [customers, setCustomers] = React.useState<Customer[]>([]);
    const [addDialogOpen, setAddDialogOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (executedRef.current) {
            return;
        }

        if (process.env.MOCK) {
            const data = makeData('customer', 60) as Customer[];
            setCustomers(data)
        }

        executedRef.current = true;
    }, []);

    const handleAddDialogOpen = () => {
        setAddDialogOpen(true);
    }

    const handleAddDialogClose = () => {
        setAddDialogOpen(false);
    }

    const columns = React.useMemo<ColumnDef<Customer>[]>(
        () => [
            {
                header: () => <></>,
                accessorFn: originalRow => originalRow,
                id: 'actions',
                cell: props => (
                    <>
                        <Box sx={{display: 'flex'}}>
                            <Tooltip title={intl.formatMessage({id: "edit"})}>
                                <IconButton size="small" onClick={() => router.push(`/customers/${props.getValue()}`)}>
                                    <EditIcon fontSize={"inherit"} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={intl.formatMessage({id: "delete"})}>
                                <IconButton size="small" color="error">
                                    <DeleteIcon fontSize={"inherit"} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </>
                ),
                footer: props => props.column.id
            },
            {
                header: () => <>ID</>,
                accessorKey: 'id',
                cell: props => props.getValue(),
                footer: props => props.column.id
            },
            {
                accessorFn: originalRow => originalRow.name,
                id: 'name',
                cell: props => props.getValue(),
                header: () => <>{intl.formatMessage({id: "customer.name"})}</>,
                footer: props => props.column.id
            },
            {
                accessorFn: originalRow => originalRow.address.address,
                id: 'address',
                cell: props => props.getValue(),
                header: () => <>{intl.formatMessage({id: "customer.address"})}</>,
                footer: props => props.column.id
            }
        ], []
    );

    return (
        <>
            <Paper sx={{my: 1, p: 1}}>
                <Tooltip title={intl.formatMessage({id: "add"})}>
                    <Button onClick={handleAddDialogOpen} startIcon={<AddIcon/>}>
                        <FormattedMessage id={"add"}/>
                    </Button>
                </Tooltip>
            </Paper>

            <Table data={customers} columns={columns}/>

            <Dialog
                open={addDialogOpen}
                fullScreen
                onClose={handleAddDialogClose}>
                <DialogTitle>
                    <FormattedMessage id={"add"}/>
                </DialogTitle>
                <DialogContent>
                    <Paper sx={{my: 1, p: 1}}>
                        <Formik<CustomerFormValues>
                            initialValues={{
                                name: "",
                                address: {
                                    id: "",
                                    address: "",
                                    zip: 0,
                                    createdBy: "",
                                    createdDate: new Date(),
                                    lastModifiedBy: "",
                                    lastModifiedDate: new Date()
                                }
                            }}
                            validationSchema={customerValidationSchema}
                            onSubmit={(values, actions) => {
                                actions.validateForm().then(res => {
                                    toast.success("Customer created")
                                }).catch(err => {
                                    toast.error("Error customer validation")
                                })
                            }}>
                            {({isSubmitting}) => (
                                <Form>
                                    <FastField
                                        type="name"
                                        name="name"
                                        label="Name"
                                        disabled={isSubmitting}
                                        component={TextField}>
                                    </FastField>
                                </Form>
                            )}
                        </Formik>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddDialogClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Customer;