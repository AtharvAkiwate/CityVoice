const form = document.getElementById("reportForm");
const submitBtn = document.getElementById("submitBtn");
const statusMessage = document.getElementById("statusMessage");

const WEBHOOK_URL = "https://atharvakiwate.app.n8n.cloud/webhook/cityvoice-report";

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Submitting...";
    statusMessage.innerHTML = "";

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        location: document.getElementById("location").value,
        issueType: document.getElementById("issueType").value,
        description: document.getElementById("description").value
    };

    try {

        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {

            statusMessage.className = "success";

            statusMessage.innerHTML =
            "✅ Your complaint has been submitted successfully. A confirmation email has been sent.";

            form.reset();

        } else {

            throw new Error("Request Failed");

        }

    } catch (error) {

        statusMessage.className = "error";

        statusMessage.innerHTML =
        "❌ Something went wrong. Please try again.";

    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = "🚀 Submit Report";
});