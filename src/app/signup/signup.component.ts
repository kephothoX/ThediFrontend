import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { Router } from '@angular/router';

import { CountriesService } from '../countries.service';

import { PinataSDK } from "pinata";

import { Observable, catchError, from } from 'rxjs';
import { ErrorService } from '../error.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

import { AppService } from '../app.service';


const PinataJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmYmQxODlhMS00OTIwLTQ4MGItYWU1ZS1hZDUwMTMyOWNmODUiLCJlbWFpbCI6ImtlcGhvdGhvbWVkaWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjIxYzM1ZGZhM2NhZThkZmVkMzQ2Iiwic2NvcGVkS2V5U2VjcmV0IjoiZWQ4MTFkM2ZhMzdiNjI5ZWVkMDJlNWZhMGQ0ODFjMTI2OWJkNzQ3MDUyMGM4OThlODRlNzVmNDIzYTYxMDU2MCIsImV4cCI6MTc2MDk5NTY1OH0.ir293WSX6PMKEklTZBzgt7_6PY7saE--TuTNXprvOfI";

const pinata = new PinataSDK({
      pinataJwt: PinataJwt,
      pinataGateway: "amaranth-past-ladybug-860.mypinata.cloud"
    });


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  PassportSizedPhotoCID?: string;
  IdentificationDocCID?: string;
  CreditReportDocCID?: string;
  Countries?: Country[] = new Array();
  Phone_Prefix?: string;
  formData = new FormData();

  constructor(
    private _appService: AppService,
    private _errorService: ErrorService,
    private _httpClient: HttpClient,
    private _router: Router,
    private _countriesService: CountriesService
  ) {}

  async ngOnInit()  {
    this.getCountryCodes().subscribe((response: any) => {
      this.Countries?.push(response);
    });

    try {  
      const url = await pinata.gateways.createSignedURL({
           cid: "bafkreicffdeod3rrn3qa75azasbgftimve3mqsa7usqlzssfl6s7delyui",
        expires: 1800,
      })
      console.log(url)
  
    } catch (error) {
      console.log(error);
    }

    
  }

  

  getCountryPrefix(prefix: string) {
    this.Phone_Prefix = prefix;
  }


  getCountryCodes(): Observable<any>{

    return  from(this._countriesService.Countries.Countries);
  }

  signUpForm = new FormGroup({
    name: new FormControl(' '),
    dob: new FormControl(' '),
    email: new FormControl(' '),
    passport_sized_photo_CID: new FormControl(' '),
    identification_doc_CID: new FormControl(' '),
    credit_report_doc_CID: new FormControl(' '),
    city: new FormControl(' '),
    country: new FormControl(' '),
    phone: new FormControl(' ')
  });

  async ngOnSubmit() {
    const formValues = this.signUpForm.value;

    const data = {
      name: formValues.name,
      dob: formValues.dob,
      email: formValues.email,
      passport_sized_photo_CID: formValues.passport_sized_photo_CID,
      identification_doc_CID: formValues.identification_doc_CID,
      credit_report_doc_CID: formValues.credit_report_doc_CID,
      city: formValues.city,
      country: formValues.country,
      phone: `${ this.Phone_Prefix }${ formValues.phone }`
    }

    console.log(data);

    await fetch(`${ this._appService.ThediServer }auth`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LWJsb3gtMTczMDAzMDUzNDczNS5jbHVzdGVyLXF0cXdqajN3Z3pmZjZ1eHRrMjZ3ajdmenE2LmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTczMDIzMjQxMiwiZXhwIjoxNzMwMjM2MDEyfQ.InnJ7y8fRG4XgztVyi-txx5TScU-yi2G4bE3WWZQ2Un_d-tUhbB7gG0Tk66aUTqAWyGa6uXcBD2F4-Ya9abl8or-5o0V69PYylZ8thWhNcK_EVOXlgg7_yn8pWfyEr9PrTV5pq4zlA7ri6vOU43pMYTFsxVX6OxwyOfqceEIk-9cV0lFsOYqVZoGffy8bdk2R-FbR2ExOcSWNZtUOEk-yLX8_v77nnvuRWhFM0rJA943YIO6WNhvb5-7PAi3oDGoLAxcJDyp47ujxQkKXB2mwDOFqS8gNAtZ195GAfNXiBTY4FXGXTeX-mgO4Ui9AIzxBxapDVPcKmWRaZz7wmqfPg'
      }),
      body: JSON.stringify(data)
    })
    .then(async (response: any) => {
      const data = await response.json();

      window.sessionStorage.setItem('SignedVC', data.SignedVC);
      window.sessionStorage.setItem('Record', JSON.stringify(data.Record));

      this._router.navigate(['/transactions']);
    })
    .catch((err: any) => {
      console.error(err);
    });


  }

  resetForm() {
    this.signUpForm.reset();
  }


  async uploadPassportSizedPhoto(event: any) {
    if (event.target.files && event.target.files.length) {

      const _file = event.target.files[0];


      const res = await pinata.upload.file(_file);
      this.PassportSizedPhotoCID = res.cid;         
    }

  } 

  async uploadIdentificationDoc(event: any) {
    if (event.target.files && event.target.files.length) {

      const _file = event.target.files[0];

      const res = await pinata.upload.file(_file);
      this.IdentificationDocCID = res.cid;       
    }

  } 

  async uploadCreditReportDoc(event: any) {
    if (event.target.files && event.target.files.length) {

      const _file = event.target.files[0];

      const res = await pinata.upload.file(_file);
      this.CreditReportDocCID = res.cid;       
    }

  } 


  async deleteFile(file: string) {
    const deletedFiles = await pinata.files.delete([
      `${ file }`
    ]);


  }

}


export interface Country {
  Fifa: string;
  Phone_Prefix: string;
  Country_Code_2: string;
  Country_Code_1: string;
  Country_Name: string;
}
