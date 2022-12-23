/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';


@Resolver(() => Student)
export class StudentResolver {
  constructor(private studentsService: StudentsService, private enrollmentdService: EnrollmentsService) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField(() => [Enrollment])
  enrollments(@Parent() student: Student) {
    return this.enrollmentdService.listEnrollmentByStudentId(student.id);
  }

}