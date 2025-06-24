import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TaskService } from '../../service/task.service';
import { Router } from '@angular/router';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  const mockTaskService = {
    addTask: jest.fn().mockReturnValue(of({})),
    updateTask: jest.fn().mockReturnValue(of({})),
    tasks: jest.fn().mockReturnValue([]),
  };

  const mockRouter = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TaskFormComponent], // import standalone component here
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;

    component.taskId = 1;

    // Initialize the component (calls ngOnInit and sets up the form)
    if (component.ngOnInit) {
      component.ngOnInit();
    }

    // Set all assignedUserId checkboxes to false initially
    component.assignedUserIdArray.controls.forEach((control) =>
      control.setValue(false)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize in create mode', () => {
    expect(component.isEditMode).toBe(false);
    expect(component.taskForm.valid).toBe(false);
    expect(component.taskId).toBeGreaterThan(0);
  });

  it('should build form with valid data and call saveTask()', () => {
    component.taskForm.patchValue({
      title: 'Test Task',
      description: 'A description',
      status: 'in-progress',
      priority: 'medium',
      deadline: '2025-12-31',
      projectId: 101,
    });

    component.assignedUserIdArray.controls.forEach((control) =>
      control.setValue(true)
    );

    component.saveTask();

    expect(component.taskForm.valid).toBe(true);
    expect(mockTaskService.addTask).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should not call saveTask() if form is invalid', () => {
    component.taskForm.patchValue({
      title: '',
      description: '',
      status: '',
      priority: '',
      deadline: '',
      projectId: null,
    });

    component.saveTask();

    expect(component.taskForm.valid).toBe(false);
    expect(mockTaskService.addTask).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
