TRUNCATE
    massage_users
    RESTART IDENTITY CASCADE;

INSERT INTO massage_users (full_name, email_address, username, password)
VALUES
    ('Jacob Moe', 'thisemailaddress@yahoo.com', 'jacobmoe', '$2a$12$SYOCbT5wm9WTFDSQhhLG5e9czskJ5M4SlcVSss1/jKRJZheMYPNc6'),
    ('Tom Foolery', 'tfools@gmail.com', 'tfooley', '$2a$12$0YVinq2AAem46yQ9VenxEeBnobnPtlNL4J2nFzw4DNlvn3DbwITHe'),
    ('John Hancock', 'hancockj@hotmail.com', 'johnnyh',  '$2a$12$GDVDiFUwyjcP5vOXXZkgxuuHB/8mG3slUVSpKdwxUARn0rixkPvK6'),
    ('Superman', 'sups@msn.com', 'supertheman', '$2a$12$ETDFrc04wGyj3xw4BR9R4eUo86wMzX.Ub2zNyxBPHQRZUmJBdgF8i'),
    ('Demo Account', 'demo_account@email.com', 'demo', '$2a$12$FBRiDsWdr3xFcSksdFLCw.M2qDwEnkBc9Y59Uz3ft/FF3F0edrtY.')