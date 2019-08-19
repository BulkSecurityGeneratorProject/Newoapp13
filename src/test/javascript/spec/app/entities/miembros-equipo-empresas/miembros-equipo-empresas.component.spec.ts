/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { NewoApp13TestModule } from '../../../test.module';
import { MiembrosEquipoEmpresasComponent } from 'app/entities/miembros-equipo-empresas/miembros-equipo-empresas.component';
import { MiembrosEquipoEmpresasService } from 'app/entities/miembros-equipo-empresas/miembros-equipo-empresas.service';
import { MiembrosEquipoEmpresas } from 'app/shared/model/miembros-equipo-empresas.model';

describe('Component Tests', () => {
  describe('MiembrosEquipoEmpresas Management Component', () => {
    let comp: MiembrosEquipoEmpresasComponent;
    let fixture: ComponentFixture<MiembrosEquipoEmpresasComponent>;
    let service: MiembrosEquipoEmpresasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NewoApp13TestModule],
        declarations: [MiembrosEquipoEmpresasComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(MiembrosEquipoEmpresasComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MiembrosEquipoEmpresasComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MiembrosEquipoEmpresasService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MiembrosEquipoEmpresas(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.miembrosEquipoEmpresas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MiembrosEquipoEmpresas(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.miembrosEquipoEmpresas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should re-initialize the page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MiembrosEquipoEmpresas(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);
      comp.reset();

      // THEN
      expect(comp.page).toEqual(0);
      expect(service.query).toHaveBeenCalledTimes(2);
      expect(comp.miembrosEquipoEmpresas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('should calculate the sort attribute for an id', () => {
      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,asc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,asc', 'id']);
    });
  });
});