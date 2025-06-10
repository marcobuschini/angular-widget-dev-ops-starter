import { TestBed } from '@angular/core/testing'

import { WidgetService } from './widget.service'
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing'
import { Vendor } from './vendor'
import { ParkingSlot } from './parkingslot'
import { provideHttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WidgetService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
  })

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    const service = TestBed.inject(WidgetService)
    expect(service).toBeTruthy()
  })

  it('should load a vendor features', async () => {
    const service = TestBed.inject(WidgetService)
    const features = firstValueFrom(service.getVendorFeatures(dummyVendor))

    const req = httpMock.expectOne(
      '/assets/vendor/' +
        encodeURIComponent(dummyVendor.name) +
        '/features.json'
    )

    req.flush(dummyVendor.features)

    expect(await features).toEqual(dummyVendor.features)
  })

  it('should load a vendor parking slots', () => {
    const service = TestBed.inject(WidgetService)
    service.getParkingSlots(dummyVendor).subscribe((slots) => {
      expect(slots).toEqual(dummyParkingSlots)
    })

    const req = httpMock.expectOne(
      '/assets/vendor/' +
        encodeURIComponent(dummyVendor.name) +
        '/parkingslots.json'
    )

    req.flush(dummyParkingSlots)
  })
})
