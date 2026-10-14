# School Database Design

## Table Explanations
- **`students`**: Stores demographic and contact details for each registered student, including a unique identifier, full name, and a unique email address.
- **`courses`**: Stores information about each subject or class offered by the institution, including its title and a unique course code.
- **`enrolments`**: A junction/join table connecting students to courses. It tracks which student is registered in which course and stores their assigned grade.

## Relationships & Join Table Explanation
- **One-to-Many Relationships**: A single student can have multiple course enrolments over time, but each individual enrolment record belongs to exactly one student. Similarly, a single course can have many students enrolled in it, but each enrolment entry belongs to one specific course.
- **Many-to-Many Relationship & Join Table**: Students and courses share a many-to-many relationship because one student can take many courses, and one course can hold many students. A join table (`enrolments`) is necessary to bridge them together, preventing data duplication and allowing us to store attributes specific to that relationship, such as the student's grade.

## Database Indexing
- **Index Recommendation**: Adding an index on `enrolments(student_id)` and `enrolments(course_id)` speeds up query performance when performing frequent joins between students, courses, and enrolments. (Note: SQLite automatically creates indexes on columns with `PRIMARY KEY` and `UNIQUE` constraints like `students.email`).

## SQL vs. NoSQL Justification
For a school management system that tracks structured records like students, courses, and grades, **SQL (Relational Database)** is the optimal choice. Relational databases enforce strict data integrity rules, foreign key constraints, unique email validation, and ACID compliance, ensuring that student and course data remains accurate and consistent. NoSQL document stores are better suited for unstructured, rapidly shifting data schemas, whereas a school system relies heavily on structured relationships, precise filtering, grouping, and transactional updates.