import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servics } from 'src/app/core/shared/models/service.model';
import { LoadScriptsService } from 'src/app/core/shared/services/load-scripts/load-scripts.service';
import { ServicsService } from 'src/app/core/shared/services/servics/servics.service';

@Component({
    selector: 'app-viewservice',
    templateUrl: './view-service.component.html',
    styleUrls:['./view-service.component.scss']

})

export class ViewserviceComponent implements OnInit {
    
    serviceID:string | any;
    currentService: Servics | any;

    constructor(private route:ActivatedRoute, private loadScript:LoadScriptsService, private servicsService: ServicsService) { 
        loadScript.loadS(["changeimg/change"]);
    }

    ngOnInit() { 
        this.serviceID = this.route.snapshot.paramMap.get('id');
        this.servicsService.getService(this.serviceID).subscribe(res => this.currentService = res[0]);
    }
}