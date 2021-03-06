import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

class EnvData {
    env: string;
}

@Injectable()
export class InitService {

    /*
    public user: any;
    getValue(): Promise<String> {
        console.log('get user called');
        var promise = this.http.get('/auth/getuser').toPromise();
        promise.then(user => {
        this.user = user;});
    return promise;
    } */

    //VERSION 2
    private forms: Object = null
    private config: Object = null;
    private env: Object = null;

    constructor(private http: Http) { }

    public getForms(key: any) {
        return this.forms[key];
    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    /**
     * Use to get the data found in the first file (env file)
     */
    public getEnv(key: any) {
        return this.env[key];
    }

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('assets/properties/env.json').map(res => res.json()).catch((error: any): any => {
                console.log('Configuration file "env.json" could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            }).subscribe((envResponse: EnvData) => {
                this.env = envResponse;
                let request: any = null;

                switch (envResponse.env) {
                    case 'production': {
                        request = this.http.get('assets/properties/config.' + envResponse.env + '.json');
                    } break;

                    case 'development': {
                        request = this.http.get('assets/properties/config.' + envResponse.env + '.json');
                    } break;

                    case 'default': {
                        console.error('Environment file is not set or invalid');
                        resolve(true);
                    } break;
                }

                if (request) {
                    request
                        .map(res => res.json())
                        .catch((error: any) => {
                            console.error('Error reading ' + envResponse.env + ' configuration file');
                            resolve(error);
                            return Observable.throw(error.json().error || 'Server error');
                        })
                        .subscribe((responseData) => {
                            this.config = responseData;
                            resolve(true);
                        });
                } else {
                    console.error('Env config file "env.json" is not valid');
                    resolve(true);
                }
            });
        });
    }

    public loadForms() {
        return new Promise((resolve, reject) => {
            this.http.get('assets/properties/forms.json').map(res => res.json()).catch((error: any): any => {
                console.log('Configuration file "forms.json" could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            }).subscribe((formsResponse: EnvData) => {
                this.forms = formsResponse;
            });
        });

    }

}