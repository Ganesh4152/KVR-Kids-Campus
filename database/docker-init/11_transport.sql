USE kvr_school;

DROP TABLE IF EXISTS transport;

CREATE TABLE transport (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    student_id BIGINT NOT NULL,

    class_id BIGINT NOT NULL,

    academic_year VARCHAR(20) NOT NULL,

    bus_number VARCHAR(20) NOT NULL,

    vehicle_number VARCHAR(30) NOT NULL,

    route_name VARCHAR(100) NOT NULL,

    pickup_point VARCHAR(150) NOT NULL,

    pickup_time TIME,

    drop_time TIME,

    driver_name VARCHAR(100),

    driver_mobile VARCHAR(15),

    attendant_name VARCHAR(100),

    transport_fee DECIMAL(10,2) DEFAULT 0,

    payment_status ENUM(
        'PAID',
        'PARTIAL',
        'PENDING'
    ) DEFAULT 'PENDING',

    remarks VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_transport_student
        FOREIGN KEY (student_id)
        REFERENCES students(id),

    CONSTRAINT fk_transport_class
        FOREIGN KEY (class_id)
        REFERENCES classes(id)

);