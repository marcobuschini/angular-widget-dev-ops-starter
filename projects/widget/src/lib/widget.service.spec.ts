import { TestBed, inject, fakeAsync, flush } from '@angular/core/testing'

import { WidgetService } from './widget.service'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { Vendor } from './vendor'
import { ParkingSlot } from './parkingslot'

const dummyVendor: Vendor = {
  name: 'Test Vendor',
  description: 'This is a test vendor',
  features: [
    { name: 'Feature 1' },
    { name: 'Feature 2' },
    { name: 'Feature 3' },
  ],
}

const dummyParkingSlots: ParkingSlot[] = [
  { id: 1, name: 'Slot 1', features: ['Feature 1'] },
  { id: 2, name: 'Slot 2', features: ['Feature 1', 'Feature 2'] },
]

describe('WidgetService', () => {
  let httpMock: HttpTestingController
  let service: WidgetService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
  })

  beforeEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    service = TestBed.inject(WidgetService)
    httpMock = mock
  }))

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should load a vendor features', fakeAsync(async () => {
    service.getVendorFeatures(dummyVendor).subscribe(features => {
      expect(features).toEqual(dummyVendor.features)
    })

    const req = httpMock.expectOne(
      '/assets/vendor/' +
        encodeURIComponent(dummyVendor.name) +
        '/features.json'
    )

    req.flush(dummyVendor.features)

    flush()
  }))

  it('should load a vendor parking slots', fakeAsync(async () => {
    service.getParkingSlots(dummyVendor).subscribe(slots => {
      expect(slots).toEqual(dummyParkingSlots)
    })

    const req = httpMock.expectOne(
      '/assets/vendor/' +
        encodeURIComponent(dummyVendor.name) +
        '/parkingslots.json'
    )

    req.flush(dummyParkingSlots)

    flush()
  }))
})
