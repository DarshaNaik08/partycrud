import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PartyRoutingModule } from './party-routing.module';
import { PartyComponent } from './party.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewPartyComponent } from './view-party/view-party.component';
import { CreatePartyComponent } from './create-party/create-party.component';
import { UpdatePartyComponent } from './update-party/update-party.component';


@NgModule({
  declarations: [
    PartyComponent,
    ViewPartyComponent,
    CreatePartyComponent,
    UpdatePartyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PartyRoutingModule,
    NgxPaginationModule
  ]
})
export class PartyModule { }
