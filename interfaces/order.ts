import { Supplier } from "./supplier";
import {OrderStatus} from "../enums/orderStatus";

export interface Order {
    id: string;
    supplier: Supplier;
    status: OrderStatus
}