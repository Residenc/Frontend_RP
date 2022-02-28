import { Component, Input, OnInit } from '@angular/core';
import { Servics } from 'src/app/core/shared/models/service.model';
import { ServicsService } from 'src/app/core/shared/services/servics/servics.service';

@Component({
    selector: 'app-services-businessByDate',
    templateUrl: './services-businessByDate.component.html',
    styleUrls: ['./services-businessByDate.component.scss']
})

export class ServicesbusinessDateComponent implements OnInit {

    @Input() businessID:string | any;

    services: Servics | any;

    constructor(private servicsService: ServicsService) { }

    ngOnInit() {
        this.loadServices();
    }

    loadServices(){
        this.servicsService.getAllServicesOfBusiness(this.businessID).subscribe(services =>{ 
            this.services = services
            const reader = new FileReader();
            reader.onload =(this.services)});
    }
}