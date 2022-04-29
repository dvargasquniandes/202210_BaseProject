import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Array<Vehicle> = []
  brandsCounter: { brand: string, counter: number}[] = []

  constructor(private vehicleService: VehicleService) { }

  getVehicles(): void {
    this.vehicleService.getVehicles().subscribe((vehicles)=>{
      this.vehicles = vehicles;
      this.brandsCounter = this.countBrands();
    })
  }

  countBrands(): { brand: string, counter: number}[] {
    const brandsGroup = this.vehicles.reduce((acc, vehicle) =>  
      ({ ...acc, [vehicle.marca]: acc[vehicle.marca] ? acc[vehicle.marca] + 1 : 1 })
    , {} as Record<string, number>);
    return Object.keys(brandsGroup).map(brand => ({ brand, counter: brandsGroup[brand] }))
  }

  ngOnInit(): void {
    this.getVehicles();
  }

}
