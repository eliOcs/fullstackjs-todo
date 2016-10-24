const Http = require("@angular/http").Http;
const Headers = require("@angular/http").Headers;

require("rxjs/add/operator/toPromise");
const BehaviorSubject = require("rxjs").BehaviorSubject;

class UserService {

    constructor(http) {
        this.http = http;
        this.headers = new Headers({"Content-Type": "application/json"});
    }

    getUser() {
        if (this.user) {
            return Promise.resolve(this.user);
        }

        if (this.getUserPromise) {
            return this.getUserPromise;
        }

        this.getUserPromise = this.http
            .get("/api/users/me")
            .toPromise().then(
                (response) => {
                    this.getUserPromise = null;
                    this.user = new BehaviorSubject(response.json());
                    return this.user;
                },
                (response) => {
                    this.getUserPromise = null;
                    if (response.status === 401) {
                        this.user = new BehaviorSubject(null);
                        return Promise.resolve(this.user);
                    } else {
                        return new Error("Couldn't get user");
                    }
                }
            ).catch(this.handleError);
            
        return this.getUserPromise;
    }

    signIn(email, password) {
        return this.http
            .post(
                "/api/auth/local/signin",
                JSON.stringify({email, password}),
                {headers: this.headers}
            )
            .toPromise().then(
                (response) => {
                    this.user.next(response.json());
                    return true;
                },
                (response) => {
                    if (response.status === 401) {
                        false;
                    }

                    throw new Error("Unexpected error");
                }
            ).catch(this.handleError);
    }

    signUp(name, email, password) {
        return this.http
            .post(
                "/api/auth/local/signup",
                JSON.stringify({name, email, password}),
                {headers: this.headers}
            )
            .toPromise().then(
                (response) => {
                    this.user.next(response.json());
                    return true;
                },
                (response) => {
                    if (response.status === 401) {
                        return Promise.resolve(false);
                    }

                    return new Error("Couldn't sign up user");
                }
            ).catch(this.handleError);
    }

    signOut() {
        return this.http
            .post("/api/auth/signout")
            .toPromise()
            .then(() => {
                this.user.next(null);
            });
    }

    handleError(err) {
        console.error(err.message);
    }

}

UserService.parameters = [Http];

module.exports = UserService;
