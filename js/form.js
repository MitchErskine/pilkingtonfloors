/**
 * Pilkington Floors — Form Validation & Submission
 * Client-side validation and Formspree AJAX submission.
 * Handles Quote Form and Contact Form with inline error messages.
 */

/* ============================================================
   Validation Rules
   ============================================================ */

const validationRules = {
  name:        { required: true, message: 'Please enter your name' },
  email:       { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
  phone:       { required: false },
  flooringType:{ required: true, message: 'Please select a flooring type' },
  description: { required: true, message: 'Please describe your project' },
  messageText: { required: true, message: 'Please enter your message' }
};

/* ============================================================
   Pure Helpers (exported for testability)
   ============================================================ */

/**
 * Checks whether a string matches the email validation pattern.
 * @param {string} value - The string to test
 * @returns {boolean} True if the string is a valid email format
 */
export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Validates a form element against the validation rules.
 * Reads form fields by name, checks required fields are non-empty (trimmed),
 * and checks email format.
 * @param {HTMLFormElement} formElement - The form to validate
 * @returns {{ valid: boolean, errors: Map<string, string> }}
 */
export function validateForm(formElement) {
  const errors = new Map();

  for (const [fieldName, rule] of Object.entries(validationRules)) {
    const field = formElement.elements[fieldName];
    if (!field) continue;

    const value = (field.value || '').trim();

    if (rule.required && value === '') {
      errors.set(fieldName, rule.message);
    } else if (rule.pattern && value !== '' && !rule.pattern.test(value)) {
      errors.set(fieldName, rule.message);
    }
  }

  return { valid: errors.size === 0, errors: errors };
}

/* ============================================================
   DOM Helpers
   ============================================================ */

/**
 * Removes all validation error indicators from a form.
 * Removes `.error` class from fields and removes `.form-error` spans.
 * @param {HTMLFormElement} formElement - The form to clear errors from
 */
export function clearValidationErrors(formElement) {
  const errorFields = formElement.querySelectorAll('.error');
  errorFields.forEach(function (field) {
    field.classList.remove('error');
  });

  const errorMessages = formElement.querySelectorAll('.form-error');
  errorMessages.forEach(function (span) {
    span.remove();
  });
}

/**
 * Displays validation errors on a form.
 * Adds `.error` class to invalid fields and inserts a `.form-error` span
 * after each invalid field.
 * @param {HTMLFormElement} formElement - The form to show errors on
 * @param {Map<string, string>} errors - Map of field names to error messages
 */
export function showValidationErrors(formElement, errors) {
  clearValidationErrors(formElement);

  errors.forEach(function (message, fieldName) {
    const field = formElement.elements[fieldName];
    if (!field) return;

    field.classList.add('error');

    const errorSpan = document.createElement('span');
    errorSpan.className = 'form-error';
    errorSpan.textContent = message;

    // Insert the error span after the field element
    field.parentNode.insertBefore(errorSpan, field.nextSibling);
  });
}

/**
 * Hides the form and shows a success confirmation message.
 * Looks for an existing `.form-success` sibling or creates one.
 * @param {HTMLFormElement} formElement - The form to hide
 */
export function showConfirmation(formElement) {
  formElement.style.display = 'none';

  let successEl = formElement.parentNode.querySelector('.form-success');
  if (!successEl) {
    successEl = document.createElement('div');
    successEl.className = 'form-success';
    successEl.textContent = 'Thank you! Your message has been sent. We will be in touch shortly.';
    formElement.parentNode.insertBefore(successEl, formElement.nextSibling);
  }
  successEl.style.display = '';
}

/* ============================================================
   Form Submission
   ============================================================ */

/**
 * Submits a form to a Formspree endpoint using fetch() POST.
 * Handles success (200), network errors, 429 rate limiting, and 5xx server errors.
 * @param {HTMLFormElement} formElement - The form to submit
 * @param {string} formspreeUrl - The Formspree endpoint URL
 * @returns {Promise<{ ok: boolean, message: string }>}
 */
export async function submitForm(formElement, formspreeUrl) {
  const formData = new FormData(formElement);

  try {
    const response = await fetch(formspreeUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      return { ok: true, message: 'Form submitted successfully.' };
    }

    if (response.status === 429) {
      return { ok: false, message: 'Too many requests. Please wait a moment and try again.' };
    }

    if (response.status >= 500 && response.status < 600) {
      return { ok: false, message: 'Our form service is temporarily unavailable. Please email us or call directly.' };
    }

    return { ok: false, message: 'Something went wrong. Please try again or call us directly.' };
  } catch (error) {
    return { ok: false, message: 'Something went wrong. Please try again or call us directly.' };
  }
}

/* ============================================================
   Initialisation
   ============================================================ */

/**
 * Attaches submit handlers to all forms with a [data-formspree] attribute.
 * On submit, validates the form, shows errors or submits via AJAX,
 * and displays confirmation or error messages.
 */
export function initForms() {
  const forms = document.querySelectorAll('form[data-formspree]');

  forms.forEach(function (form) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      clearValidationErrors(form);

      const result = validateForm(form);

      if (!result.valid) {
        showValidationErrors(form, result.errors);
        return;
      }

      const formspreeUrl = form.getAttribute('data-formspree');
      const submitBtn = form.querySelector('button[type="submit"]');

      // Disable submit button during request
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      const response = await submitForm(form, formspreeUrl);

      if (response.ok) {
        showConfirmation(form);
      } else {
        // Show a general error message at the top of the form
        clearValidationErrors(form);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.marginBottom = '1rem';
        errorDiv.textContent = response.message;
        form.insertBefore(errorDiv, form.firstChild);
      }

      // Re-enable submit button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
      }
    });
  });
}

/* ============================================================
   DOMContentLoaded
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  initForms();
});
