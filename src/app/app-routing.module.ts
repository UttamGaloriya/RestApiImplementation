import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule)
const userModule = () => import('./user/user.module').then(x => UserModule)

const routes: Routes = [
  { path: 'account', loadChildren: accountModule },
  { path: 'user', loadChildren: userModule },
  { path: '**', redirectTo: 'account' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
