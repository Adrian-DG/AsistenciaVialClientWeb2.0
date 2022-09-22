import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ToastrModule.forRoot({
			autoDismiss: true,
			closeButton: true,
			progressBar: true,
			progressAnimation: 'increasing',
			positionClass: 'toast-bottom-right',
			countDuplicates: true,
			newestOnTop: true,
		}),
	],
})
export class SharedModule {}
