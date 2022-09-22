import {
	HttpClient,
	HttpErrorResponse,
	HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, ReplaySubject, Subject } from 'rxjs';
import { IPagedData } from 'src/app/interface/IPagedData';
import { IPaginationFilters } from 'src/app/interface/IPaginationFilters';
import { BaseService } from '../base.service';
import { ToastService } from '../toast/toast.service';

import { catchError } from 'rxjs/operators';
import { IServerResponse } from 'src/app/interface/iserver-response';

@Injectable({
	providedIn: 'root',
})
export abstract class GenericService<T> extends BaseService {
	abstract GetResource(): string;

	listSource = new ReplaySubject<IPagedData<T>>();
	list$ = this.listSource.asObservable();

	currentSource = new Subject<T>();
	current$ = this.currentSource.asObservable();

	constructor(
		protected override $http: HttpClient,
		protected override _toast: ToastService
	) {
		super($http, _toast);
	}

	// Generic API methods

	GetAll(filters: IPaginationFilters): void {
		const params = new HttpParams()
			.set('page', filters.page)
			.set('size', filters.size)
			.set('searchTerm', filters.searchTerm)
			.set('status', filters.status);

		this.$http
			.get<IPagedData<T>>(this.endPoint, { params: params })
			.subscribe((resp: IPagedData<T>) => this.listSource.next(resp));
	}

	GetById(id: string): void {
		this.$http
			.get<T>(`${this.endPoint}/${id}`)
			.subscribe((resp: T) => this.currentSource.next(resp));
	}

	Post(model: T): void {
		this.$http
			.post<IServerResponse>(this.endPoint, model)
			.subscribe((resp: IServerResponse) =>
				this._toast.displayToast(resp.message, resp.status)
			);
	}

	Put(model: T): void {
		this.$http
			.put<IServerResponse>(this.endPoint, model)
			.subscribe((resp: IServerResponse) =>
				this._toast.displayToast(resp.message, resp.status)
			);
	}

	Delete(id: string): void {
		this.$http
			.delete<IServerResponse>(this.endPoint, { body: id })
			.subscribe((resp: IServerResponse) =>
				this._toast.displayToast(resp.message, resp.status)
			);
	}
}
