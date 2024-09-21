document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("demoForm");
  const emailInput = document.getElementById("email");
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");
  const departmentInput = document.getElementById("department");

  emailInput.addEventListener("input", () =>
    validateField(emailInput, validateEmail)
  );
  dayInput.addEventListener("input", validateDate);
  monthInput.addEventListener("change", validateDate);
  yearInput.addEventListener("change", validateDate);
  departmentInput.addEventListener("change", () =>
    validateField(departmentInput, validateDepartment)
  );

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully");
    }
  });

  function validateForm() {
    let isValid = true;
    isValid = validateField(emailInput, validateEmail) && isValid;
    isValid = validateDate() && isValid;
    isValid = validateField(departmentInput, validateDepartment) && isValid;
    return isValid;
  }

  function validateField(input, validationFunction) {
    const isValid = validationFunction(input.value);
    if (!isValid) {
      showError(input, input.dataset.errorMessage || "Invalid input");
    } else {
      hideError(input);
    }
    return isValid;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateDate() {
    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;

    if (day === "" || month === "" || year === "") {
      showError(dayInput, "Please enter a complete date");
      return false;
    }

    const date = new Date(year, month - 1, day);
    const isValid =
      date.getFullYear() == year &&
      date.getMonth() == month - 1 &&
      date.getDate() == day;

    if (!isValid) {
      showError(dayInput, "Please enter a valid date");
    } else {
      hideError(dayInput);
    }

    return isValid;
  }

  function validateDepartment(department) {
    return department !== "";
  }

  function showError(input, message) {
    const formGroup = input.closest(".form-group");
    const errorElement = formGroup.querySelector(".error-message");
    formGroup.classList.add("error");
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  function hideError(input) {
    const formGroup = input.closest(".form-group");
    const errorElement = formGroup.querySelector(".error-message");
    formGroup.classList.remove("error");
    errorElement.style.display = "none";
  }
});
