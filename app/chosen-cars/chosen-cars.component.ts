
import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/services/car.service';
import { CarStore } from '../shared/models/car-store.model';
import { Car } from '../shared/models/car.model';
import { FormsModule } from '@angular/forms';
import { CarTypeService } from '../shared/services/carType.service';
import { CarTypeStore } from '../shared/models/carType-store.model';
import { OrderService } from '../shared/services/order.service';
import { OrderStore } from '../shared/models/order-store.model';
@Component({
  selector: 'app-chosen-cars',
  templateUrl: './chosen-cars.component.html',
  styleUrls: ['./chosen-cars.component.css']
})
export class ChosenCarsComponent implements OnInit {
  chosenCarByManufacturerArray: Array<Car> = new Array<Car>();
  chosenCarByYearArray: Array<Car> = new Array<Car>();
  chosenCarByGearArray: Array<Car> = new Array<Car>();
  chosenCarByModelArray: Array<Car> = new Array<Car>();
  chosenCarArray: Array<Car> = new Array<Car>();

  orderStore: OrderStore;
  carStore: CarStore;
  carTypeStore: CarTypeStore;
  localCarGear: boolean = undefined;
  localCarYear: any;
  localCarManufacturer: string;
  localCarModel: string;
  localCarType: string;
  localCar: Car;
  constructor(private myCarService: CarService, private myCarTypeService: CarTypeService, private myOrderService: OrderService) { }

  ngOnInit() {
    this.carStore = this.myCarService.carInfo;
    this.carTypeStore = this.myCarTypeService.carTypeInfo;
    this.orderStore = this.myOrderService.orderInfo;
  }

  saveModel(model: string): void {
    this.localCarModel = model;
    console.log(this.localCarModel);
   }
  showCar(carNumber: string) {
    this.myCarService.getCar(carNumber);
  }
  chooseCarByModel(): void {
    this.chosenCarByModelArray = [];
    for (let i = 0 ; i < this.carStore.carList.length; i++) {
    if (this.carStore.carList[i].CarType.Model === this.localCarModel) {
      this.chosenCarByModelArray.push(this.carStore.carList[i]);
    }
  }
   for (let i = 0 ; i < this.chosenCarByModelArray.length; i++) {
    for (let j = 0 ; j < this.orderStore.orderList.length; j++) {
  // tslint:disable-next-line:max-line-length
  if (this.chosenCarByModelArray[i].CarNumber === this.orderStore.orderList[j].OrderCar.CarNumber && this.orderStore.orderList[j].OrderActualReturnDate == null) {
    this.chosenCarByModelArray.splice(i, 1);
  }
}
}

}
saveManufacturer(manufacturer: string): void {
  this.localCarManufacturer = manufacturer;
}
chooseCarByManufacturer(): void {
  this.chosenCarByManufacturerArray = [];
  for (let i = 0 ; i < this.carStore.carList.length; i++) {
  if (this.carStore.carList[i].CarType.Manufacturer === this.localCarManufacturer) {
    this.chosenCarByManufacturerArray.push(this.carStore.carList[i]);
  }
}
for (let i = 0 ; i < this.chosenCarByManufacturerArray.length; i++) {
  for (let j = 0 ; j < this.orderStore.orderList.length; j++) {
// tslint:disable-next-line:max-line-length
if (this.chosenCarByManufacturerArray[i].CarNumber === this.orderStore.orderList[j].OrderCar.CarNumber && this.orderStore.orderList[j].OrderActualReturnDate == null) {
  this.chosenCarByManufacturerArray.splice(i, 1);
}
}
}

}
saveYear(year: number): void {
  this.localCarYear = year;
  console.log(this.localCarYear);

}
chooseCarByYear(): void {
// this.localCarGear = gear;
  this.chosenCarByYearArray = [];
  for (let i = 0 ; i < this.carStore.carList.length; i++) {
  if (this.carStore.carList[i].CarType.ManufactureYear === this.localCarYear) {
    this.chosenCarByYearArray.push(this.carStore.carList[i]);
  }
}
for (let i = 0 ; i < this.chosenCarByYearArray.length; i++) {
  for (let j = 0 ; j < this.orderStore.orderList.length; j++) {
// tslint:disable-next-line:max-line-length
if (this.chosenCarByYearArray[i].CarNumber === this.orderStore.orderList[j].OrderCar.CarNumber && this.orderStore.orderList[j].OrderActualReturnDate == null) {
  this.chosenCarByYearArray.splice(i, 1);
}
}
}

}
chooseCarByGear(gear: boolean): void {
    this.chosenCarByGearArray = [];
    for (let i = 0 ; i < this.carStore.carList.length; i++) {
    if (this.carStore.carList[i].CarType.Gear === gear) {
      this.chosenCarByGearArray.push(this.carStore.carList[i]);
    }
  }
  for (let i = 0 ; i < this.chosenCarByGearArray.length; i++) {
    for (let j = 0 ; j < this.orderStore.orderList.length; j++) {
  // tslint:disable-next-line:max-line-length
  if (this.chosenCarByGearArray[i].CarNumber === this.orderStore.orderList[j].OrderCar.CarNumber && this.orderStore.orderList[j].OrderActualReturnDate == null) {
    this.chosenCarByGearArray.splice(i, 1);
  }
  }
  }

  }
  chooseAllAvailableCars(): void {
      this.chosenCarArray = [];
      this.chosenCarArray = this.carStore.carList;
      for (let i = 0 ; i < this.carStore.carList.length; i++) {
        for (let j = 0 ; j < this.orderStore.orderList.length; j++) {
      // tslint:disable-next-line:max-line-length
      if (this.carStore.carList[i].CarNumber === this.orderStore.orderList[j].OrderCar.CarNumber && this.orderStore.orderList[j].OrderActualReturnDate == null) {
        this.chosenCarArray.splice(i, 1);
      }
    }
    }

    }
}
