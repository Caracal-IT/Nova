import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {GeoLocation, SpatialClient} from "nova-analytics";

@Injectable()
export class NovaSpatialClient extends SpatialClient {
    constructor(private http: HttpClient){
        super();
    }

    getLocation(): Observable<any>{
        return this.http
            .get("//freegeoip.net/json/?callback=");
    }

    getLocationNew(): Observable<GeoLocation>{
        return this.http
            .get("//freegeoip.net/json/?callback=")
            .map((geodata: any) => {
                const loc = new GeoLocation();
                
                loc.country = {
                    key: geodata.country_code, 
                    value: geodata.country_name
                };

                loc.region = {
                    key: geodata.region_code,
                    value: geodata.region_name
                };
                
                loc.city = geodata.city;
                loc.timeZone = geodata.time_zone;
                loc.latitude = geodata.latitude;
                loc.longitude = geodata.longitude;
                
                return loc;
            });
    }
}