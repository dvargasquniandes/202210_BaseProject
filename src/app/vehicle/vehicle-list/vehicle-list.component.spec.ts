/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { VehicleListComponent } from './vehicle-list.component';
import { faker } from '@faker-js/faker';
import { Vehicle } from '../vehicle';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Vehicle tests', () => {
    let component: VehicleListComponent;
    let fixture: ComponentFixture<VehicleListComponent>;
    let debug: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VehicleListComponent],
            imports: [HttpClientTestingModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VehicleListComponent);
        component = fixture.componentInstance;

        component.vehicles = Array(3).fill(new Vehicle(
            faker.datatype.number(),
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word(),
            faker.datatype.number(),
            faker.datatype.number(),
            faker.lorem.word(),
            faker.lorem.word(),
        ));

        fixture.detectChanges();
        debug = fixture.debugElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a table', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            let tableRows = fixture.nativeElement.querySelectorAll('tr');
            expect(tableRows.length).toBe(4);

            let headerRow = tableRows[0];
            expect(headerRow.cells[0].innerHTML).toBe('#');
            expect(headerRow.cells[1].innerHTML).toBe('Marca');
            expect(headerRow.cells[2].innerHTML).toBe('Linea');
            expect(headerRow.cells[3].innerHTML).toBe('Modelo');

            let row1 = tableRows[1];
            const vehicle = component.vehicles[0];
            expect(row1.cells[0].innerHTML).toBe(vehicle.id);
            expect(row1.cells[1].innerHTML).toBe(vehicle.marca);
            expect(row1.cells[2].innerHTML).toBe(vehicle.linea);
            expect(row1.cells[3].innerHTML).toBe(vehicle.modelo);

        });
    });
});