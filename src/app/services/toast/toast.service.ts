import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	constructor(private _toastr: ToastrService) {}

	displayToast(text: string, status: boolean): void {
		status ? this._toastr.success(text) : this._toastr.error(text);
	}
}
