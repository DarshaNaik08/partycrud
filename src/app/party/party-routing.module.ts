import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartyComponent } from './party.component';
import { ViewPartyComponent } from './view-party/view-party.component';
import { CreatePartyComponent } from './create-party/create-party.component';
import { UpdatePartyComponent } from './update-party/update-party.component';

const routes: Routes = [{ path: '', component: PartyComponent },
  {path: 'view-party', component: ViewPartyComponent},
  {path: 'create-party', component: CreatePartyComponent},
  {path: 'update-party', component: UpdatePartyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartyRoutingModule { }
