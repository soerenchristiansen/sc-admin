import { LoginStatusUpdated } from './../shared/messages';
import { EventAggregator } from 'aurelia-event-aggregator';
import { User } from '../models/user';
import { Router } from 'aurelia-router';
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject, observable } from 'aurelia-framework';
import oidcConfig from '../../oidc-config';

@inject(HttpClient, Router, EventAggregator)
export class AuthenticationService {
	public redirectUrl: string = "";
	private isSignedIn = false;

	constructor(private http: HttpClient, private router: Router, private ea: EventAggregator) {
	}

	login(userName: string, password: string): Promise<any> {

		return new Promise((resolve, reject) => {
			let body = `grant_type=password&client_id=${oidcConfig.client_id}&scope=${oidcConfig.scope}&username=${userName}&password=${password}`;

			let headers = {
				'Content-Type': 'application/x-www-form-urlencoded'
			};

			this.http.fetch(oidcConfig.token_endpoint, {
				method: 'post',
				body: body,
				headers: headers
			})
				.then(response => response.json())
				.then((result: any) => {
					if (result.error) {
						console.error(result.error, result.error_description);
						this.clearStorage();
						reject(result);
						this.publishSigninStatus(false);
						return;
					}
					this.storeAccessToken(result);
					resolve(result);
					this.publishSigninStatus(true);
					this.router.navigate("/");
				})
				.catch(error => {
					console.error('Error performing password flow', error);
					reject(error);
				});
		});
	}

	refreshToken(): Promise<any> {
		return new Promise((resolve, reject) => {
			let refreshToken = localStorage.getItem('refresh_token');
			let body = `grant_type=refresh_token&client_id=${oidcConfig.client_id}&scope=${oidcConfig.scope}&refresh_token=${refreshToken}`;

			let headers = {
				'Content-Type': 'application/x-www-form-urlencoded'
			};

			this.http.fetch(oidcConfig.token_endpoint, {
				method: 'post',
				body: body,
				headers: headers
			})
				.then(response => response.json() as Promise<any>)
				.then((result: any) => {
					if (result.error) {
						this.clearStorage();
						reject(result);
						return;
					}
					this.storeAccessToken(result);
					resolve(result);
				})
				.catch(error => {
					console.error('Error performing password flow', error);
					reject(error);
				});
		});
	}

	hasValidAccessToken(): boolean {
		if (this.getAccessToken()) {
			let expiresAt = localStorage.getItem('expires_at');
			let now = new Date();
			if (expiresAt && parseInt(expiresAt, 10) < now.getTime()) {
				return false;
			}

			return true;
		}

		return false;
	}

	getAccessToken(): any {
		return localStorage.getItem('access_token');
	}

	isLoggedIn(): Promise<boolean> {
		if (!this.hasValidAccessToken()) {
			return this.refreshToken()
				.then((result: any) => {
					if (result.error) {
						console.error(result.error, result.error_description);
						this.publishSigninStatus(false);
						return false;
					}
					this.publishSigninStatus(true);
					return true;
				})
				.catch(err => {
					console.error(err);
					this.publishSigninStatus(false);
					return false;
				});
		}

		this.publishSigninStatus(true);
		return new Promise(resolve => resolve(true));
	}

	getUser(): Promise<User> {
		const user: User = new User();
		if (this.hasValidAccessToken()) {
			let accessToken = this.getAccessToken();
			return this.http.fetch(oidcConfig.userinfo_endpoint, {
				headers: {
					'Authorization': `Bearer ${accessToken}`
				}
			})
			.then(response => response.json())
			.then(result => {
				user.userName = result.preferred_username;
				user.firstName = result.name;
				user.roles = result.role;
				return user;
			})
			.catch(err => err);
		}

		return new Promise(resolve => resolve(user));
	}

	signOut() {
		this.clearStorage();
		this.publishSigninStatus(false);
		this.router.navigate('login');
	}

	clearStorage(): void {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('expires_in');
		localStorage.removeItem('expires_at');
	}

	storeAccessToken(tokenResponse: any): void {
		localStorage.setItem('access_token', tokenResponse.access_token);
		localStorage.setItem('refresh_token', tokenResponse.refresh_token);
		localStorage.setItem('expires_in', tokenResponse.expires_in);
		if (tokenResponse.expires_in) {
			let expiresInMilliSeconds = tokenResponse.expires_in * 1000; // in milliseconds
			let now = new Date();
			let expiresAt = now.getTime() + expiresInMilliSeconds;
			localStorage.setItem('expires_at', '' + expiresAt);
		}
	}

	publishSigninStatus(siginStatus: boolean): void {
		this.ea.publish(new LoginStatusUpdated(siginStatus));
	}
}