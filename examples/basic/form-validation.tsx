import React from 'react';

interface FormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

export const AccessibleForm: React.FC<FormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="form-title"
      role="form"
    >
      <h2 id="form-title">Login Form</h2>
      
      <div role="group" aria-labelledby="email-label">
        <label id="email-label" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          aria-required="true"
          aria-describedby="email-help"
        />
        <p id="email-help" className="help-text">
          Enter your registered email address
        </p>
      </div>

      <div role="group" aria-labelledby="password-label">
        <label id="password-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          aria-required="true"
          aria-describedby="password-help"
        />
        <p id="password-help" className="help-text">
          Password must be at least 8 characters
        </p>
      </div>

      <button
        type="submit"
        aria-label="Submit login form"
      >
        Login
      </button>
    </form>
  );
}; 