import { IServerResponse } from './iserver-response';

export interface ILoginResponse extends IServerResponse {
	token: string | null;
}
