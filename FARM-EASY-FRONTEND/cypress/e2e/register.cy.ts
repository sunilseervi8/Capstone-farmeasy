import mount from 'cypress';

// 1st test case to show validation on directly clicking the submit button
describe('register page', () => {
  it('passes', () => {
    cy.visit('/register')
    cy.get('[data-cy="submit"]').click()
  })
});

// 2nd test case to check validity of fields
describe('Registration Page Validations', () => {
  beforeEach(() => {
    cy.visit('/register'); 
  });

  it('should show validation messages for invalid inputs', () => {
    // Check validation for empty username
    cy.get('#fullName').focus().blur(); 
    cy.contains('Full Name is required').should('be.visible');

    // Check validation for invalid email
    cy.get('#email').type('chai').blur();
    cy.contains('Invalid email address').should('be.visible');

    // Check validation for short password
    cy.get('#password').type('123').blur(); 
    cy.contains('Password must be at least 8 characters').should('be.visible');

    // Check validation for non-matching confirm password
    cy.get('#confirmPassword').type('12345678').blur(); 
    cy.contains('Passwords must match').should('be.visible');
  });
});

// 3nd test case to show the entire registration process
describe('Email OTP Verification and Form Submission', () => {
  beforeEach(() => {
    cy.visit('/register'); 
  });

  it('should verify email using OTP before allowing form submission', () => {
    const randomString = Math.random().toString(36).substring(2, 7); // Generate a random string for uniqueness
    const email = `user_${randomString}@example.com`; // Dynamic email for each test run
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit random OTP

    //entering the name
    cy.get('#fullName').type('Name'); 
    

    //validating the email id using otp verification
    cy.get('#email').type(email);

    cy.contains('Get OTP').should('be.visible');
    cy.contains('Get OTP').click();

    //intercepting the mock otp generated to the actual endpoint
    cy.intercept('POST', 'https://localhost:7119/api/User/SendOtp', { statusCode: 200, body: { otpSent: true } }).as('sendOtp'); 
    cy.wait('@sendOtp');

    cy.get('input[placeholder="Enter OTP"]').should('be.visible'); //checking if textfield is visible
    cy.get('input[placeholder="Enter OTP"]').type(otp); //entering the mock otp generated

    //intercepting the mock otp generated to the actual endpoint
    cy.intercept('POST', 'https://localhost:7119/api/User/VerifyOtp', { statusCode: 200, body: { otpVerified: true } }).as('verifyOtp'); 
    cy.wait('@verifyOtp');

    cy.get('input[placeholder="Email"]').should('be.disabled');
    cy.get('input[placeholder="Enter OTP"]').should('not.exist');


    cy.get('input[placeholder="Enter phone number"]').type('+919876543210');


  
    cy.get('#password').type('Chaitra@123').blur(); 
    cy.get('#confirmPassword').type('Chaitra@123').blur(); 
    

   
    // Ensure no validation messages are visible
    cy.contains('Full Name is required').should('not.exist');
    cy.contains('Invalid email address').should('not.exist');
    cy.contains('Password must be at least 8 characters long').should('not.exist');
    cy.contains('Passwords must match').should('not.exist');

    // Submit the form
    cy.get('button[type="submit"]').click();

    //successful registration leads to a welcome message 
    cy.contains('Registration successful!',{timeout: 10000}).should('be.visible'); 
  });
});

