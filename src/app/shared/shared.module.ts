import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { WarningModalComponent } from './warning-modal/warning-modal.component';



@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [AlertModalComponent, WarningModalComponent],
    exports: [AlertModalComponent, WarningModalComponent],
    entryComponents: [AlertModalComponent, WarningModalComponent]
})

export class SharedModule {}