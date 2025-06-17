import { Routes } from "@angular/router";
import { BasicComponent } from "./pages/basic/basic.component";
import { DynamicComponent } from "./pages/dynamic/dynamic.component";
import { SwitchesComponent } from "./pages/switches/switches.component";

const reactiveRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path:'basic',
                title: 'Básicos',
                component: BasicComponent,
            },
            {
                path:'dynamic',
                title: 'Dinámicos',
                component: DynamicComponent,
            },
            {
                path:'switches',
                title: 'Switches',
                component: SwitchesComponent,
            },
            {
                path: '**',
                redirectTo: 'basic'
            }
        ]
    }
];

export default reactiveRoutes;