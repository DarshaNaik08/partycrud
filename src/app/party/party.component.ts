import { Component, OnInit,  } from '@angular/core';
import { PartyService } from '../services/party.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
partyDetails:any= [];
  config: any;
  selectedPartyId: any;
  
  constructor(private partyapi: PartyService, private route: ActivatedRoute, private router : Router, private fb: FormBuilder) {
   }
  
  ngOnInit(): void {
    this.getAllPartyDetails();
    this.config = {
      currentPage: 1,
      itemsPerPage: 10,

    };
    this.route.queryParamMap.pipe(map(params => params.get("page")))
      .subscribe(page => (this.config.currentPage = page));
  }
  

pageChange1(newPage: number) {
  this.config.currentPage  = newPage;
}

viewParty(id:any){
  console.log(id);
  this.router.navigate(['/main-layout/party/view-party'], { queryParams: {id: id} });
  }

editParty(id:any){
  console.log(id);
  this.router.navigate(['/main-layout/party/update-party'], { queryParams: {id: id} });
}


getAllPartyDetails(){
  this.partyapi.getAllParties().subscribe((data: any) => {
    // console.log(data);
    this.partyDetails=data;
    console.log(this.partyDetails);
  })
}


deleteParty(partyId: string): void {
  console.log(partyId);
  this.partyapi.deleteParty(partyId).subscribe(
    () => {
      console.log('Party deleted successfully');    
    },
    (error) => {
      console.error('Error deleting party', error);    
    }
  );
}


}
