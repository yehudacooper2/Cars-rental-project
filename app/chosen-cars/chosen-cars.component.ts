
import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/services/car.service';
import { CarStore } from '../shared/models/car-store.model';
import { Car } from '../shared/models/car.model';

@Component({
  selector: 'app-chosen-cars',
  templateUrl: './chosen-cars.component.html',
  styleUrls: ['./chosen-cars.component.css']
})
export class ChosenCarsComponent implements OnInit {

  chosenCarArray: Array<Car> = new Array<Car>();
  carStore: CarStore;
  localCarGear: boolean;
  localCarYear: number;
  localCarManufacturer: string;
  localCarModel: string;
  localCarType: string;
  localCar: Car;
  constructor(private myCarService: CarService) { }

  ngOnInit() {
    this.carStore = this.myCarService.carInfo;
  }

  showCar(carNumber: string) {
    this.myCarService.getCar(carNumber);
  }
  chooseGear(): void {
  //  if (this.userStore.userList.find(x => x.UserName === this.localUserName && x.UserRole === 'manager')) {
    for (let i = 0 ; i < this.carStore.carList.length; i++) {
    if (this.carStore.carList[i].CarType.Model === this.localCarModel) {
      this.chosenCarArray.push(this.carStore.carList[i]);
    }
  //  }
  }

}
}
