import { Injectable, isDevMode } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment as Dev } from 'src/environments/environment';
import { environment as Prod } from 'src/environments/environment.prod';

import { ToastService } from './toast/toast.service';

@Injectable({
	providedIn: 'root',
})
export class BaseService {
	protected endPoint: string = '';

	constructor(protected $http: HttpClient, protected _toast: ToastService) {
		const env = isDevMode() ? Dev.api_url : Prod.api_url;
		this.endPoint += env;
	}
}
