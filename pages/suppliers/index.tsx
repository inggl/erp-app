import {NextPage} from "next";
import React from "react";
import {Supplier} from "../../interfaces/supplier";
import makeData from "../../utils/makeData";
import {ColumnDef} from "@tanstack/react-table";
import {Table} from "../../components/Table";
import { useIntl } from "react-intl";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Box, IconButton, Tooltip} from "@mui/material";
import {useRouter} from "next/router";

const Supplier: NextPage = () => {
    const executedRef = React.useRef(false);
    const intl = useIntl();
    const router = useRouter();

    const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);

    React.useEffect(() => {
        if (executedRef.current) {
            return;
        }

        if (process.env.MOCK) {
            const data = makeData('supplier', 60) as Supplier[];
            setSuppliers(data)
        }

        executedRef.current = true;
    }, []);

    const columns = React.useMemo<ColumnDef<Supplier>[]>(
        () => [
            {
                header: () => <></>,
                accessorFn: originalRow => originalRow.id,
                id: 'actions',
                cell: props => (
                    <>
                        <Box sx={{display: 'flex'}}>
                            <Tooltip title={intl.formatMessage({id: "edit"})}>
                                <IconButton size="small" onClick={() => router.push(`/suppliers/${props.getValue()}`)}>
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
                header: () => <>{intl.formatMessage({id: "supplier.name"})}</>,
                footer: props => props.column.id
            },
            {
                accessorFn: originalRow => originalRow.address.address,
                id: 'address',
                cell: props => props.getValue(),
                header: () => <>{intl.formatMessage({id: "supplier.address"})}</>,
                footer: props => props.column.id
            }
        ], []
    );

    return (
        <>
            <Table data={suppliers} columns={columns} />
        </>
    );
}

export default Supplier;