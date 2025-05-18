// ——— Form Validation ———
function validateForm() {
  let valid = true;
  const inputs = document.querySelectorAll(
    "#guestForm input[type=text], #guestForm input[type=email], #guestForm input[type=tel]"
  );
  inputs.forEach(input => {
    input.style.borderColor = "#ccc";
    const error = input.parentElement.querySelector(".error");
    if (error) error.style.display = "none";
  });

  // Full Name
  const fullName = document.getElementById("fullName");
  if (!fullName.value.trim()) {
    showError(fullName);
    valid = false;
  }

  // Email
  const email = document.getElementById("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showError(email);
    valid = false;
  }

  // Mobile
  const mobile = document.getElementById("mobile");
  const mobileRegex = /^9\d{9}$/;
  if (!mobileRegex.test(mobile.value.trim())) {
    showError(mobile);
    valid = false;
  }

  return valid;
}

function validateAddressForm() {
  const address = document.getElementById("address");
  if (!address.value.trim()) {
    address.focus();
    return false;
  }
  return true;
}


// ——— Address-Type Toggle ———
const addressBtns = document.querySelectorAll(".address-btn");
const addressInput = document.getElementById("addressType");
addressBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      // deselect
      btn.classList.remove("active");
      addressInput.value = "";
    } else {
      // select this one only
      addressBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      addressInput.value = btn.dataset.value;
    }
    checkAllValid();
  });
});

// ——— Confirm Order Button Enabling ———
const confirmBtn = document.getElementById("confirmOrderBtn");
const guestForm  = document.getElementById("guestForm");
const addressForm= document.getElementById("addressForm");

  function checkAllValid() {
    const fullName = document.getElementById("fullName").value.trim();
    const email    = document.getElementById("email").value.trim();
    const mobile   = document.getElementById("mobile").value.trim();
    const address  = document.getElementById("address").value.trim();
    const addressType = document.getElementById("addressType").value;

    // Check if any payment method is selected
    const paymentSelected = document.querySelector('input[name="payment"]:checked') !== null;

    const confirmBtn = document.getElementById("confirmOrderBtn");

    const isValid = fullName && email && mobile && address && addressType && paymentSelected;

    confirmBtn.disabled = !isValid;
    confirmBtn.style.opacity = isValid ? "1" : "0.5";
    confirmBtn.style.cursor = isValid ? "pointer" : "not-allowed";
  }

 document.addEventListener("DOMContentLoaded", function () {
    // 1. Clear address type
    const addressInput = document.getElementById("addressType");
    addressInput.value = "";

    // 2. Remove active class from address buttons
    document.querySelectorAll(".address-btn").forEach(btn => {
      btn.classList.remove("active");
    });

    // 3. Uncheck all payment method radios
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
      radio.checked = false;
    });

    // 4. Disable Confirm Order button initially
    const confirmBtn = document.getElementById("confirmOrderBtn");
    confirmBtn.disabled = true;
    confirmBtn.style.opacity = "0.5";
    confirmBtn.style.cursor = "not-allowed";
  });



guestForm.addEventListener("input", checkAllValid);
addressForm.addEventListener("input", checkAllValid);

// ——— Confirm Order Action ———
function confirmOrder() {
  // final validation
  if (!validateForm() || !validateAddressForm() || addressInput.value === "") {
    alert("Please complete all required fields and select an address type.");
    return;
  }
  // success
  alert("Order confirmed! Thank you for ordering.");
  // TODO: submit data or redirect here
}
// ——— Radio Buttons: Toggle on second click ———
let selectedRadio = null;

document.querySelectorAll('input[type="radio"][name="payment"]').forEach(radio => {
  radio.addEventListener("mousedown", (e) => {
    if (radio === selectedRadio) {
      // prevent it from staying selected
      radio.dataset.wasChecked = "true";
    } else {
      radio.dataset.wasChecked = "false";
    }
  });


  radio.addEventListener("click", (e) => {
    if (radio.dataset.wasChecked === "true") {
      radio.checked = false;
      selectedRadio = null;
    } else {
      selectedRadio = radio;
    }
  });
});
// ——— Make whole .payment-option clickable & allow deselect ———
let lastChecked = null;

document.querySelectorAll('.payment-option').forEach(option => {
  const radio = option.querySelector('input[type="radio"]');

  // track mousedown to know if this was already checked
  option.addEventListener('mousedown', () => {
    option.dataset.wasChecked = radio.checked;
  });

  // on click toggle the radio appropriately
  option.addEventListener('click', () => {
    if (option.dataset.wasChecked === 'true') {
      // clicking an already-checked option → deselect
      radio.checked = false;
      lastChecked = null;
    } else {
      // selecting a new one → clear previous, check this
      if (lastChecked && lastChecked !== radio) {
        lastChecked.checked = false;
      }
      radio.checked = true;
      lastChecked = radio;
    }
  });

  // ensure cursor shows clickable
  option.style.cursor = 'pointer';
});


