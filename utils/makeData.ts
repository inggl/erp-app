import {faker} from '@faker-js/faker';
import {Order} from "../interfaces/order";
import {OrderStatus} from "../enums/orderStatus";
import {Supplier} from "../interfaces/supplier";
import {Address} from "../interfaces/address";
import {Customer} from "../interfaces/customer";
import {Notification} from "../interfaces/notification";
import {Product} from "../interfaces/product";

export type DataType = 'address' | 'product' | 'supplier' | 'customer' | 'order' | 'notification';

const range = (len: number) => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const newAddress = (): Address => {
    return {
        id: faker.datatype.uuid(),
        address: faker.address.streetAddress(true),
        zip: faker.address.zipCode(),
    }
}

const newProduct = (): Product => {
    return {
        id: faker.datatype.uuid(),
        name: faker.name.findName() + faker.name.lastName(),
        description: faker.lorem.sentence(10)
    }
}

const newSupplier = (): Supplier => {
    return {
        id: faker.datatype.uuid(),
        name: faker.name.findName() + faker.name.lastName(),
        address: {...newAddress()},
    }
}

const newCustomer = (): Customer => {
    return {
        id: faker.datatype.uuid(),
        name: faker.name.findName() + faker.name.lastName(),
        address: {...newAddress()},
    }
}

const newOrder = (): Order => {
    return {
        id: faker.datatype.uuid(),
        supplier: {...newSupplier()},
        status: faker.helpers.shuffle<Order['status']>([
            OrderStatus.DRAFT, OrderStatus.COMPLETED
        ])[0],
    }
}

const newNotification = (): Notification => {
    return {
        id: faker.datatype.uuid(),
        title: faker.lorem.words(5),
        message: faker.lorem.words(15),
        createdAt: faker.date.past().toString(),
    }
}

const makeData = (dataType: DataType, lens: number): Address[] | Product[] | Supplier[] | Order[] | Notification[] | [] => {
    switch (dataType) {
        case "address":
            return range(lens).map((): Address => {
                return {
                    ...newAddress()
                }
            });
        case "product":
            return range(lens).map((): Product => {
                return {
                    ...newProduct()
                }
            });
        case "supplier":
            return range(lens).map((): Supplier => {
                return {
                    ...newSupplier()
                }
            });
        case "customer":
            return range(lens).map((): Customer => {
                return {
                    ...newCustomer()
                }
            });
        case "order":
            return range(lens).map((): Order => {
                return {
                    ...newOrder()
                }
            });
        case "notification":
            return range(lens).map((): Notification => {
                return {
                    ...newNotification()
                }
            });
        default:
            return [];
    }
}

export default makeData;