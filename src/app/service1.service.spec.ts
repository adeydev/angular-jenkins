import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Service1Service } from './service1.service';


describe('Service1Service', () => {

  let service: Service1Service;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Service1Service]
    });

    service = TestBed.get(Service1Service);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([Service1Service], (service: Service1Service) => {
    expect(service).toBeTruthy();
  }));

  it('should get the correct star wars character', () => {
    //the unit test, written as if it's a standard http call
    service.getSingle(1).subscribe((data: any) => {
      expect(data.name).toBe('Luke Skywalker');
    });
    
    //the URL must match the one in the service call above
    const req = httpMock.expectOne('http://replace.with.api/anything/1', 'call to api');
    expect(req.request.method).toBe('GET'); 

    //the URL call has been intercepted, now return some data in the mock response
    req.flush({
      name: 'Luke Skywalker'
    });

    
    httpMock.verify();
  });
});


