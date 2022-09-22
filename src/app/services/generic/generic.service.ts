import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject } from 'rxjs';
import { IPagedData } from 'src/app/interface/IPagedData';
import { IPaginationFilters } from 'src/app/interface/IPaginationFilters';
import { BaseService } from '../base.service';
import { ToastService } from '../toast/toast.service';

@Injectable({
	providedIn: 'root',
})
export abstract class GenericService<T> extends BaseService {
	abstract GetResource(): string;

	listSource = new AsyncSubject<IPagedData<T>>();
	list$ = this.listSource.asObservable();

	constructor(
		protected override $http: HttpClient,
		protected override _toast: ToastService
	) {
		super($http, _toast);
	}

	// Generic API methods

	GetAll(filters: IPaginationFilters): void {}
}
