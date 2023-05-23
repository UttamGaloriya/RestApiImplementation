import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { AuthGuard } from './_services/auth.guard';
import { Auth2Guard } from './_services/auth2.guard';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule)
const userModule = () => import('./user/user.module').then(x => UserModule)

const routes: Routes = [
  { path: 'account', loadChildren: accountModule, canLoad: [Auth2Guard] },
  { path: 'user', loadChildren: userModule, canLoad: [AuthGuard] },
  { path: '**', redirectTo: '/user' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
