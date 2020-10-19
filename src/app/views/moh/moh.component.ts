import { Component, OnInit } from '@angular/core';
import {MohService} from "../../services/moh.service";
import {Queue} from "../../dto/queue";
import {Count} from "../../dto/count";
import {Router} from "@angular/router";
import {PatientService} from "../../services/patient.service";
import {SharedServiceService} from "../../services/shared-service.service";

@Component({
  selector: 'app-moh',
  templateUrl: './moh.component.html',
  styleUrls: ['./moh.component.css']
})
export class MohComponent implements OnInit {

  queue : Queue[]=[]
  availableBedCounts: Count[]=[]

  constructor(private mohService:MohService, private router:Router , private patientService: PatientService, private sharedService: SharedServiceService) {
    this.sharedService.sendClickEvent();
  }

  ngOnInit(): void {

    this.mohService.getQueue().subscribe((resp)=>{
        this.queue=resp.data
    })

    this.mohService.getBedCount().subscribe((resp)=>{
        this.availableBedCounts=resp.data;
        console.log(resp.data)
    })

  }

  hospital(){
    this.router.navigate(['/addhospital'])
  }

  viewPatient(patientId){
    this.router.navigate( ['/patient'], {
      queryParams:{patientId:patientId, doctorId:"moh"}
    });
  }

}
