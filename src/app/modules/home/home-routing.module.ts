import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { TableOverviewComponent } from './components/table-overview/table-overview.component'

const routes: Routes = [
    {
        path: '',
        component: TableOverviewComponent
    },
    {
        path: '*',
        redirectTo: '',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
