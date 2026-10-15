PRAGMA foreign_keys = ON;


-- ----------------------------------------------------
-- 1. DROP EXISTING TABLES (Clean Slate)
-- ----------------------------------------------------
DROP TABLE IF EXISTS enrolments;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS courses;

-- ----------------------------------------------------
-- 2. CREATE ALL TABLES FIRST
-- ----------------------------------------------------
-- Students Table
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- Courses Table
CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE
);

-- Enrolments Table
CREATE TABLE enrolments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    grade VARCHAR(5),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE(student_id, course_id)
);

-- ----------------------------------------------------
-- 3. INSERT SAMPLE DATA SECOND
-- ----------------------------------------------------
-- Insert Students
INSERT INTO students (name, email) VALUES 
('Alice Smith', 'alice@example.com'),
('Bob Jones', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com'),
('Diana Prince', 'diana@example.com');

-- Insert Courses
INSERT INTO courses (title, code) VALUES 
('Web Development 101', 'WEB101'),
('Database Fundamentals', 'DB101'),
('JavaScript Advanced', 'JS201');

-- Insert Enrolments
INSERT INTO enrolments (student_id, course_id, grade) VALUES 
(1, 1, 'A'),
(1, 2, 'B+'),
(2, 1, 'B'),
(2, 3, 'A-'),
(3, 2, 'C');

-- ----------------------------------------------------
-- 4. REQUIRED QUERIES
-- ----------------------------------------------------

-- Query 1: All courses for one student (Alice Smith)
SELECT c.title, c.code, e.grade 
FROM courses c
JOIN enrolments e ON c.id = e.course_id
JOIN students s ON s.id = e.student_id
WHERE s.name = 'Alice Smith';

-- Query 2: All students enrolled in "Web Development 101"
SELECT s.name, s.email, e.grade
FROM students s
JOIN enrolments e ON s.id = e.student_id
JOIN courses c ON c.id = e.course_id
WHERE c.title = 'Web Development 101';

-- Query 3: Count of students enrolled in each course
SELECT c.title, COUNT(e.student_id) AS student_count
FROM courses c
LEFT JOIN enrolments e ON c.id = e.course_id
GROUP BY c.id, c.title;

-- Query 4: Students who have no enrolments (Diana Prince)
SELECT s.name, s.email
FROM students s
LEFT JOIN enrolments e ON s.id = e.student_id
WHERE e.id IS NULL;

-- Query 5: Update an enrolment grade
UPDATE enrolments
SET grade = 'A+'
WHERE student_id = 1 AND course_id = 1;

CREATE INDEX idx_enrolments_course_id
ON enrolments(course_id);