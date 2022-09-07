import { announce } from './toast';
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

class Ratelimiter {
	constructor() {
		this.reset = Infinity;
		this.remaining = 1;
		this.limit = -1;
		this.resetAfter = -1;

		// Queue;
		this.chain = Promise.resolve();
	}

	get limited() {
		return this.remaining <= 0 && Date.now() < this.reset;
	}

	getAPIOffset(date) {
		return new Date(date).getTime() - Date.now();
	}
	calculateReset(reset, date) {
		return new Date(Number(reset) * 1000).getTime() - this.getAPIOffset(date);
	}

	update({ serverDate, limit, remaining, resetAfter, reset }) {
		this.limit = limit ? Number(limit) : Infinity;
		this.remaining = remaining ? Number(remaining) : 1;
		this.resetAfter = resetAfter ? Number(resetAfter * 1000) : -1;
		const resetCalc = this.calculateReset(reset, serverDate);
		this.reset = this.reset !== Infinity && resetCalc <= this.reset ? this.reset : resetCalc;

	}

	async newQueue(...args) {
		if (this.limited) {
			await sleep(this.resetAfter);
		}
		//console.log('running request', (({ path }) => path)(...args), Date.now());
		return this.req(...args);
	}

	queue(...args) {
		return new Promise((resolve, reject) => {
			this.chain = this.chain.then(async () => {
				if (this.limited) {
					await sleep(this.resetAfter);
				}

				await this.req(...args).then(resolve, reject);
			});
		});
	}

	async req({ method, path, headers, payload, body }, options = {}) {
		/*console.log('{ method, path, headers, payload, body }', {
			method,
			path,
			headers,
			payload,
			body
		});*/
		const result = {
			err: false,
			res: false,
			rawRes: false
		};

		let request = false;

		const controller = new AbortController();
		if (!options.notimeout) {
			setTimeout(
				() => controller.abort(`Aborting request [${path}] because of a timeout.`),
				options.timeout || 30000
			);
		}

		try {
			request = await fetch(path, {
				method: (method || 'GET').toUpperCase(),
				...(!options.cached ? { cache: 'no-store' } : {}),
				headers: {
					...headers,
					...(typeof (payload || body) == "object" ? {"content-type": "application/json"} : {})
				},
				body: (payload || body) && typeof (payload || body) == "object" ? JSON.stringify(payload || body) : null,

				// ! AbortController;
				signal: controller.signal
			});
		} catch (e) {
			console.error(`<REST_HANDLER> Request [${path}] failure:`, e.message);
			result.err = {
				status: 500,
				msg: e.message
			};
		} 

		if (!result.err && request && request.headers.get('x-ratelimit-retry-after')) {
			this.update({
				serverDate: request.headers.get('date'),
				limit: request.headers.get('x-ratelimit-limit'),
				remaining: request.headers.get('x-ratelimit-remaining'),
				resetAfter: request.headers.get('x-ratelimit-retry-after'),
				reset: request.headers.get('x-ratelimit-Reset')
			});
		}

		return {
			request,
			result
		};
	}
}

export const RatelimitHandler = new Ratelimiter();

export const handledFetch = async (reqPayload, options = {}) => {
	//console.log('reqPayload', reqPayload);
	const { request, result } = await RatelimitHandler.newQueue(reqPayload, options); // reqPayload={ method, path, headers, payload }

	if (!result.err) {
		if (request) {
			if (request.ok) {
				if (request.status >= 300 && request.status < 400) {
					if (request.url) {
						// ! we have been given the URL to redirect....
						if (
							(request.url.includes('/auth/') || request.url.includes('discord.com')) &&
							request.url.includes('https')
						) {
							return location.reload();
						}
					}
					options.nopopup = false; // we need to tell the client....
					result.err = {
						status: result.status,
						msg: `You are somehow being redirected... Try to reload this page.`
					};
				} else {
					result.rawRes = request;
					result.res = await (async () => {
						if (options.returnFormat) return request[options.returnFormat]();
						else {
							if (request.headers.get('content-type') === 'application/json') {
								return request.json();
							} else {
								try {
									return request.json();
								} catch {
									return request.text();
								}
							}
						}
					})();
				}
			} else {
				if (request.status >= 500) {
					result.err = {
						status: result.status,
						msg: `The server is currently not responding..`
					};
				} else if (request.status >= 400) {
					if (request.status == 429) {
						// ! We got ratelimited!
						const retry = request.headers.get('x-ratelimit-retry-after');
						announce['warning'](
							retry
								? `You are making too many requests, ratelimit ends in ${Number(retry)} seconds.`
								: `You have been ratelimited, cooldown with the requests.`
						);
						options.nopopup = true; // 429 ratelimits are special;
					}

					result.err = {
						status: request.status,
						msg: (() => {
							switch (request.status) {
								case 400:
									return 'Bad request has been made, contact the support team.';
								case 401:
									return 'You are not authorized to make this request.';
								case 403:
									return 'You do not have access rights to the content you are requesting, try to reload this page.';
								case 429:
									return 'You are being ratelimited..';
									default:
								return `${request.status} Error`;
							}
						})()
					};
				}
			}
		} else
			result.err = {
				status: 0,
				msg: 'An error while fetching occured, please contact the support.'
			};
	}

	if (!options.nopopup) {
		if(!result.err.msg) console.log('critical error?', result.err)
		if (result.err && result.err.msg)
			announce[result.err.status >= 500 || !result.err.status ? 'failure' : 'warning'](
				result.err.msg
			);
	}

	return options.pure ? result.res : result;
};
