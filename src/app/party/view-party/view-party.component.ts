import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartyService } from 'src/app/services/party.service';

@Component({
  selector: 'app-view-party',
  templateUrl: './view-party.component.html',
  styleUrls: ['./view-party.component.css']
})
export class ViewPartyComponent implements OnInit {
  partyDetails:any=[];
  id: any;
  constructor(private route: ActivatedRoute, private partyapi:PartyService) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.id = params["id"]
      console.log(this.id);
    }
    );
this.getSingleParty();
 
  }
  getSingleParty(){
    this.partyapi.getSingleParty(this.id).subscribe((data: any) => {
      console.log(data);
     this.partyDetails=data;
    console.log(this.partyDetails, 'compDetails')
    })
}

}
