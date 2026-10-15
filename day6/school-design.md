# School Database Design

## Table Explanations
- **`students`**: Stores demographic and contact details for each registered student, including a unique identifier, full name, and a unique email address.
- **`courses`**: Stores information about each subject or class offered by the institution, including its title and a unique course code.
- **`enrolments`**: A junction/join table connecting students to courses. It tracks which student is registered in which course and stores their assigned grade.

## Relationships & Join Table Explanation
- **One-to-Many Relationships**: A single student can have multiple course enrolments over time, but each individual enrolment record belongs to exactly one student. Similarly, a single course can have many students enrolled in it, but each enrolment entry belongs to one specific course.
- **Many-to-Many Relationship & Join Table**: Students and courses share a many-to-many relationship because one student can take many courses, and one course can hold many students. A join table (`enrolments`) is necessary to bridge them together, preventing data duplication and allowing us to store attributes specific to that relationship, such as the student's grade.


## Database Indexing

I recommend adding an index on `enrolments(course_id)` to make it faster to find students enrolled in a particular course. The UNIQUE(student_id, course_id) constraint already creates an index that can help find enrolments by student ID. Therefore, a separate index on student_id is not necessary for this design. The additional index on course_id helps the database search enrolments by course, although it uses extra storage space.


## SQL vs. NoSQL Justification
For a school management system that tracks structured records like students, courses, and grades, **SQL (Relational Database)** is the optimal choice. Relational databases enforce strict data integrity rules, foreign key constraints, unique email validation, and ACID compliance, ensuring that student and course data remains accurate and consistent. NoSQL document stores are better suited for unstructured, rapidly shifting data schemas, whereas a school system relies heavily on structured relationships, precise filtering, grouping, and transactional updates.