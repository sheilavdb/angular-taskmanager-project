import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { UserService } from '../../service/user.service';
import { ProjectService } from '../../service/project.service';
import { FormBuilder } from '@angular/forms';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  let mockTaskService: any;
  let mockUserService: any;
  let mockProjectService: any;
  let mockActivatedRoute: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockTaskService = {
      tasks: jest.fn(() => []),
      addTask: jest.fn(),
      updateTask: jest.fn(),
    };

    mockUserService = {
      users: jest.fn(() => [
        { id: 1, name: 'User One' },
        { id: 2, name: 'User Two' },
      ]),
    };

    mockProjectService = {
      projects: jest.fn(() => []),
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn(() => null), // create mode
        },
      },
    };

    mockRouter = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TaskFormComponent],
      providers: [
        FormBuilder,
        { provide: TaskService, useValue: mockTaskService },
        { provide: UserService, useValue: mockUserService },
        { provide: ProjectService, useValue: mockProjectService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize in create mode', () => {
    expect(component.taskId).toBe(1);
    expect(component.isEditMode).toBe(false);
  });

  it('should not call addTask if form is invalid', () => {
    component.taskForm.setValue({
      title: '',
      description: '',
      status: 'not-started',
      priority: 'medium',
      deadline: '',
      projectId: '',
      assignedUserId: [false, false],
    });
    component.saveTask();
    expect(mockTaskService.addTask).not.toHaveBeenCalled();
  });

  it('should call addTask with valid form', () => {
    component.taskForm.setValue({
      title: 'Test',
      description: 'Description',
      status: 'not-started',
      priority: 'medium',
      deadline: '2025-01-01',
      projectId: '101',
      assignedUserId: [true, true],
    });
    component.saveTask();
    expect(mockTaskService.addTask).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks']);
  });
});
