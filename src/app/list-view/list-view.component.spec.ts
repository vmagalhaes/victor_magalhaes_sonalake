import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewComponent } from './list-view.component';
import { SharedModule } from '../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CharacterService } from '../shared/services/character.service';

describe('ListViewComponent', () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;
  let element: any;
  let service: CharacterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, RouterTestingModule ],
      declarations: [ ListViewComponent ],
      providers: [ CharacterService ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ListViewComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;
      element = fixture.debugElement.nativeElement;
      service = fixture.debugElement.injector.get(CharacterService);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render page title List View', async(() => {
    expect(element.querySelector('h1').textContent).toContain('List View');
  }));

  it('should render 10 characters in the list', async(() => {
    expect(component.characters.length).toBe(10);
  }));
});
