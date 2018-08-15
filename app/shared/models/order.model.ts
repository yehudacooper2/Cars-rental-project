import { Car } from './car.model';
import { User } from './user.model';

export interface Order {
    OrderStartDate: Date;
    OrderReturnDate: Date;
    OrderActualReturnDate: Date;
    OrderUser: User;
    OrderCar: Car;
}









