import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaTrabajadorPage } from './vista-trabajador.page';

describe('VistaTrabajadorPage', () => {
  let component: VistaTrabajadorPage;
  let fixture: ComponentFixture<VistaTrabajadorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VistaTrabajadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
