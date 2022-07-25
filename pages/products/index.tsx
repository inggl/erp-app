import {NextPage} from "next";
import React from "react";
import {Product} from "../../interfaces/product";
import makeData from "../../utils/makeData";
import {ColumnDef} from "@tanstack/react-table";
import {Table} from "../../components/Table";
import {useIntl} from "react-intl";
import {Box, IconButton, Tooltip} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/router";

const Product: NextPage = () => {
    const executedRef = React.useRef(false);
    const intl = useIntl();
    const router = useRouter();

    const [products, setProducts] = React.useState<Product[]>([]);

    React.useEffect(() => {
        if (executedRef.current) {
            return;
        }

        if (process.env.MOCK) {
            const data = makeData('product', 60) as Product[];
            setProducts(data)
        }

        executedRef.current = true;
    }, []);

    const columns = React.useMemo<ColumnDef<Product>[]>(
        () => [
            {
                header: () => <></>,
                accessorFn: originalRow => originalRow.id,
                id: 'actions',
                cell: props => (
                    <>
                        <Box sx={{display: 'flex'}}>
                            <Tooltip title={intl.formatMessage({id: "edit"})}>
                                <IconButton size="small" onClick={() => router.push(`/products/${props.getValue()}`)}>
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
                header: () => <>{intl.formatMessage({id: "product.name"})}</>,
                footer: props => props.column.id
            },
            {
                accessorFn: originalRow => originalRow.description,
                id: 'description',
                cell: props => props.getValue(),
                header: () => <>{intl.formatMessage({id: "product.description"})}</>,
                footer: props => props.column.id
            }
        ], []
    );

    return (
        <>
            <Table data={products} columns={columns} />
        </>
    );
}

export default Product;