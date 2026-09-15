USE kvr_school;

-- ==========================================
-- SAMPLE SUBJECTS
-- ==========================================

INSERT INTO subjects
(
    subject_code,
    subject_name,
    subject_type,
    class_id,
    teacher_id,
    weekly_periods,
    total_marks,
    passing_marks,
    status
)
VALUES
(
    'MATH-G1',
    'Mathematics',
    'Core',
    4,
    1,
    6,
    100,
    35,
    'ACTIVE'
),
(
    'ENG-G2',
    'English',
    'Language',
    5,
    2,
    5,
    100,
    35,
    'ACTIVE'
),
(
    'SCI-G3',
    'Science',
    'Core',
    6,
    3,
    6,
    100,
    35,
    'ACTIVE'
),
(
    'SOC-G4',
    'Social Studies',
    'Core',
    7,
    4,
    5,
    100,
    35,
    'ACTIVE'
),
(
    'COMP-G5',
    'Computer Science',
    'Practical',
    8,
    5,
    4,
    100,
    35,
    'ACTIVE'
);


-- ==========================================
-- SAMPLE ATTENDANCE
-- ==========================================

INSERT INTO attendance
(student_id, class_id, attendance_date, status)
VALUES
(1, 4, CURDATE(), 'PRESENT'),
(2, 5, CURDATE(), 'ABSENT');


-- ==========================================
-- SAMPLE FEES
-- ==========================================

INSERT INTO fees
(
    receipt_no,
    student_id,
    class_id,
    academic_year,
    fee_category,
    payment_month,
    total_fee,
    discount,
    scholarship,
    late_fee,
    payable_amount,
    paid_amount,
    pending_amount,
    payment_date,
    due_date,
    payment_mode,
    transaction_id,
    payment_status,
    remarks
)
VALUES
(
    'KVR-FEE-0001',
    1,
    4,
    '2026-2027',
    'Monthly',
    'June',
    30000,
    0,
    0,
    0,
    30000,
    10000,
    20000,
    '2026-06-01',
    '2026-12-31',
    'Cash',
    NULL,
    'PARTIAL',
    'June fee payment'
),
(
    'KVR-FEE-0002',
    2,
    5,
    '2026-2027',
    'Monthly',
    'June',
    32000,
    0,
    0,
    0,
    32000,
    32000,
    0,
    '2026-06-01',
    '2026-12-31',
    'UPI',
    NULL,
    'PAID',
    'June fee payment'
);


-- ==========================================
-- SAMPLE EXAMS
-- ==========================================

INSERT INTO exams
(
    exam_code,
    exam_name,
    exam_type,
    class_id,
    subject_id,
    teacher_id,
    academic_year,
    exam_date,
    start_time,
    end_time,
    total_marks,
    passing_marks,
    exam_room,
    instructions,
    status
)
VALUES
(
    'FA1-G1-MATH',
    'Formative Assessment 1',
    'Monthly',
    4,
    1,
    1,
    '2026-2027',
    '2026-08-20',
    '09:00:00',
    '10:30:00',
    50,
    18,
    'Room 1',
    'Bring required stationery.',
    'SCHEDULED'
);


-- ==========================================
-- SAMPLE MARKS
-- ==========================================

INSERT INTO marks
(
    student_id,
    exam_id,
    subject_id,
    class_id,
    teacher_id,
    academic_year,
    max_marks,
    pass_marks,
    obtained_marks,
    percentage,
    grade,
    result,
    remarks
)
VALUES
(
    1,
    1,
    1,
    4,
    1,
    '2026-2027',
    50,
    18,
    45,
    90.00,
    'A',
    'PASS',
    'Good performance'
);


-- ==========================================
-- SAMPLE LIBRARY
-- ==========================================

INSERT INTO library
(
    book_code,
    book_title,
    author_name,
    category,
    total_copies,
    available_copies,
    status
)
VALUES
(
    'BK100',
    'English Grammar',
    'Wren & Martin',
    'English',
    10,
    8,
    'AVAILABLE'
),
(
    'BK101',
    'Science Basics',
    'NCERT',
    'Science',
    15,
    12,
    'AVAILABLE'
);


-- ==========================================
-- SAMPLE TRANSPORT
-- ==========================================

INSERT INTO transport
(
    student_id,
    class_id,
    academic_year,
    bus_number,
    vehicle_number,
    route_name,
    pickup_point,
    transport_fee,
    payment_status
)
VALUES
(
    1,
    4,
    '2026-2027',
    'BUS-01',
    'AP39AB1234',
    'Vayalpadu Route',
    'Bus Stand',
    12000,
    'PAID'
),
(
    2,
    5,
    '2026-2027',
    'BUS-02',
    'AP39CD5678',
    'Thamballapalle Route',
    'Main Road',
    12000,
    'PARTIAL'
);


-- ==========================================
-- SAMPLE NOTIFICATIONS
-- ==========================================

INSERT INTO notifications
(
    notification_code,
    title,
    message,
    notification_type,
    recipient_type,
    created_by,
    priority,
    delivery_status
)
VALUES
(
    'NOT100',
    'School Reopens',
    'School will reopen on June 10.',
    'NOTICE',
    'ALL',
    1,
    'HIGH',
    'SENT'
);


-- ==========================================
-- SAMPLE USERS
-- ==========================================

INSERT INTO users
(
    username,
    password,
    email,
    full_name,
    role_id
)
VALUES
(
    'teacher2',
    'teacher123',
    'teacher2@kvr.com',
    'Anitha Teacher',
    3
),
(
    'student2',
    'student123',
    'student2@kvr.com',
    'Sneha Reddy',
    4
);
