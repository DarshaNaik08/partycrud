import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyService } from 'src/app/services/party.service';

@Component({
  selector: 'app-update-party',
  templateUrl: './update-party.component.html',
  styleUrls: ['./update-party.component.css']
})
export class UpdatePartyComponent implements OnInit {
  partyForm!: FormGroup;
  id:any;
  constructor( private fb: FormBuilder, private partyService: PartyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.partyForm = this.fb.group({
      name: ['', Validators.required],
      company_name: [''],
      mobile_no: ['', Validators.required],
      telephone_no: [''],
      whatsapp_no: [''],
      email: ['', [Validators.required, Validators.email]],
      remark: [''],
      date_of_birth: [''],
      anniversary_date: [''],
      gstin: [''],
      pan_no: [''],
      apply_tds: [false],
      credit_limit: [''],
      is_active: [true],
      address: this.fb.array([]),
      bank_id: this.fb.array([])
    });
   
    this.route.queryParams
    .subscribe(params => {
      this.id = params["id"]
      console.log(this.id);
    }
    );
    this.partyService.getSingleParty(this.id).subscribe(
      partyDetails => {
        this.patchForm(partyDetails); 
      },
      error => {
        console.error('Error fetching party details:', error);
      }
    );
  }

  patchForm(partyDetails: any) {
    this.partyForm.patchValue(partyDetails);
    this.patchAddresses(partyDetails.address);
    this.patchBankDetails(partyDetails.bank_id);
  }

  patchAddresses(addresses: any[]) {
    const addressFormArray = this.partyForm.get('address') as FormArray;
    addresses.forEach(address => {
      addressFormArray.push(this.fb.group(address));
    });
  }

  patchBankDetails(bankDetails: any[]) {
    const bankFormArray = this.partyForm.get('bank_id') as FormArray;
    bankDetails.forEach(bankDetail => {
      bankFormArray.push(this.fb.group(bankDetail));
    });
  }

  addAddress() {
    const address = this.fb.group({
      address_line_1: [''],
      address_line_2: [''],
      city: [''],
      state: [''],
      country: [''],
      pincode: ['']
    });
    this.addressForms.push(address);
  }

  removeAddress(i: number) {
    this.addressForms.removeAt(i);
  }

  addBank() {
    const bank = this.fb.group({
      bank_ifsc_code: [''],
      bank_name: [''],
      branch_name: [''],
      account_no: [''],
      account_holder_name: ['']
    });
    this.bankForms.push(bank);
  }

  removeBank(i: number) {
    this.bankForms.removeAt(i);
  }

  onSubmit() {
    if (this.partyForm.valid) {

      this.partyService.updateParty(this.partyForm.value, this.id).subscribe(response => {
        console.log('Update successful', response);
        this.router.navigate(['/main-layout/party']);
      }, error => {
        console.error('Update failed', error);
      });
    }
  }

  get addressForms() {
    return this.partyForm.get('address') as FormArray;
  }

  get bankForms() {
    return this.partyForm.get('bank_id') as FormArray;
  }

}
