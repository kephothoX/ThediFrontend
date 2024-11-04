import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { FileVaultComponent } from './file-vault/file-vault.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SigninComponent } from './signin/signin.component';
import { AdminComponent } from './admin/admin.component';


export const routes: Routes = [
    { path: 'signup', title: 'Sign-Up', component: SignupComponent },
    { path: 'signin', title: 'Sign-In', component: SigninComponent },
    { path: 'file-vault', title: 'File Vault', component: FileVaultComponent },
    { path: 'transactions',  title: 'Transactions', component: TransactionsComponent },
    { path: 'admin', title: 'Admin', component: AdminComponent }
];


