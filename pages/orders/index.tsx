import React from "react";
import {NextPage} from "next";
import {Table} from "../../components/Table";
import {ColumnDef} from "@tanstack/react-table";
import {Order} from "../../interfaces/order";
import makeData from "../../utils/makeData";
import {useIntl} from "react-intl";
import {Box, IconButton, Tooltip} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useRouter} from "next/router";

const Order: NextPage = () => {
    const executedRef = React.useRef(false);
    const intl = useIntl();
    const router = useRouter();

    const [orders, setOrders] = React.useState<Order[]>([]);

    React.useEffect(() => {
        if (executedRef.current) {
            return;
        }

        if (process.env.MOCK) {
            const data = makeData('order', 60) as Order[];
            setOrders(data)
        }

        executedRef.current = true;
    }, []);

    const columns = React.useMemo<ColumnDef<Order>[]>(
        () => [
            {
                header: () => <></>,
                accessorFn: originalRow => originalRow.id,
                id: 'actions',
                cell: props => (
                    <>
                        <Box sx={{display: 'flex'}}>
                            <Tooltip title={intl.formatMessage({id: "edit"})}>
                                <IconButton size="small" onClick={() => router.push(`/orders/${props.getValue()}`)}>
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
                header: () => <>{intl.formatMessage({id: "status"})}</>,
                accessorKey: 'status',
                cell: props => props.getValue(),
                footer: props => props.column.id
            },
            {
                accessorFn: originalRow => originalRow.supplier.name,
                id: 'supplierName',
                cell: props => props.getValue(),
                header: () => <>{intl.formatMessage({id: "supplier.name"})}</>,
                footer: props => props.column.id
            },
            {
                accessorFn: originalRow => originalRow.supplier.address.address,
                id: 'supplierAddress',
                cell: props => props.getValue(),
                header: () => <>{intl.formatMessage({id: "supplier.address"})}</>,
                footer: props => props.column.id
            }
        ], []
    );

    return (
      <>
          <Table data={orders} columns={columns} />
      </>
    );
}

export default Order;