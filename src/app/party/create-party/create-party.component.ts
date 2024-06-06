import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PartyService } from 'src/app/services/party.service';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.css']
})
export class CreatePartyComponent implements OnInit {
  partyForm!: FormGroup;
  submitted = false;
  id:any;
  nextId: any;
  constructor(private fb: FormBuilder, private partyapi: PartyService, private toastr: ToastrService, private router:Router ) { }

  ngOnInit(): void {
    this.partyForm = this.fb.group({
      name: ['', Validators.required],
      company_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date_of_birth: ['', Validators.required],
      anniversary_date: ['', Validators.required],
      telephone_no: ['', Validators.required],
      mobile_no: ['', Validators.required],
      whatsapp_no: ['', Validators.required],
      credit_limit: [''],
      pan_no: [''],
      gstin: ['', Validators.required],
      remark: [''],
      address: this.fb.array([this.createAddress()]),
      bank: this.fb.array([this.createBank()])
    });

    this.partyapi.getAllParties().subscribe((parties: any[]) => {
      this.nextId = this.calculateNextId(parties);
    });
  }

  calculateNextId(parties: any[]): number {
    if (parties.length === 0) {
      return 1;
    }
    const maxId = Math.max(...parties.map(party => party.id));
    return maxId + 1;
  }

  get name(){
    return this.partyForm.get('name') as FormControl;
  }
  get company_name(){
    return this.partyForm.get('company_name') as FormControl;
  }
  get email(){
    return this.partyForm.get('email') as FormControl;
  }
  get date_of_birth(){
    return this.partyForm.get('date_of_birth') as FormControl;
  }
  get anniversary_date(){
    return this.partyForm.get('anniversary_date') as FormControl;
  }
  get telephone_no(){
    return this.partyForm.get('telephone_no') as FormControl;
  }
  get mobile_no(){
    return this.partyForm.get('mobile_no') as FormControl;
  }
  get whatsapp_no(){
    return this.partyForm.get('whatsapp_no') as FormControl;
  }
  get addressFormArray(): FormArray {
    return this.partyForm.get('address') as FormArray;
  }

  get bankFormArray(): FormArray {
    return this.partyForm.get('bank') as FormArray;
  }

  createAddress(): FormGroup {
    return this.fb.group({
      address_line_1: ['', Validators.required],
      address_line_2: ['', Validators.required]
    });
  }

  createBank(): FormGroup {
    return this.fb.group({
      bank_ifsc_code: ['', Validators.required],
      bank_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      account_no: ['', Validators.required],
      account_holder_name: ['', Validators.required]
    });
  }

  addAddress(): void {
    this.addressFormArray.push(this.createAddress());
  }

  removeAddress(index: number): void {
    this.addressFormArray.removeAt(index);
  }

  addBank(): void {
    this.bankFormArray.push(this.createBank());
  }

  removeBank(index: number): void {
    this.bankFormArray.removeAt(index);
  }


  createParty() {
    this.submitted = true;
    console.log(this.nextId);
    console.log(this.partyForm.value);

    if (this.partyForm.valid) {
      this.partyapi.postParty(this.nextId, this.partyForm.value).subscribe((data: any) => {
        console.log(this.nextId);
        console.log(data, 'on submit');
        this.toastr.success('Party created');
        this.router.navigate(['main-layout/party']);
        this.partyForm.reset();
      },
        (err: any) => {
          console.log(err);
        }
      );
      this.submitted = false;
    } else {
      this.toastr.error('Please fill the form');
    }
  }
}
