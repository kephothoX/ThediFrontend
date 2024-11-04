import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

import { AppService } from '../app.service';

@Component({
  selector: 'app-admin',
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
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  Records?: string;

  constructor (
    private _appService: AppService
  ) {}

  async ngOnInit() {
    await fetch(`${ this._appService.ThediServer }records`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LWJsb3gtMTczMDAzMDUzNDczNS5jbHVzdGVyLXF0cXdqajN3Z3pmZjZ1eHRrMjZ3ajdmenE2LmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTczMDIzMjQxMiwiZXhwIjoxNzMwMjM2MDEyfQ.InnJ7y8fRG4XgztVyi-txx5TScU-yi2G4bE3WWZQ2Un_d-tUhbB7gG0Tk66aUTqAWyGa6uXcBD2F4-Ya9abl8or-5o0V69PYylZ8thWhNcK_EVOXlgg7_yn8pWfyEr9PrTV5pq4zlA7ri6vOU43pMYTFsxVX6OxwyOfqceEIk-9cV0lFsOYqVZoGffy8bdk2R-FbR2ExOcSWNZtUOEk-yLX8_v77nnvuRWhFM0rJA943YIO6WNhvb5-7PAi3oDGoLAxcJDyp47ujxQkKXB2mwDOFqS8gNAtZ195GAfNXiBTY4FXGXTeX-mgO4Ui9AIzxBxapDVPcKmWRaZz7wmqfPg'
      }),

    })
    .then(async (response: any) => {
      const data = await response.json();

      console.log(data);

      this.Records = JSON.stringify(data.Records);
    })
    .catch((err: any) => {
      console.error(err);
    });
  }
    
}
