export async function onRequestPost(context) {
  try {
    const FROM_EMAIL = context.env.CONTACT_FROM_EMAIL;
    const FROM_EMAIL_FULL = `Portfolio Website <${FROM_EMAIL}>`;
    const TO_EMAIL = context.env.CONTACT_TO_EMAIL;
    // 1. Parse the incoming JSON request from the frontend
    const formData = await context.request.json();
    const { name, email, message } = formData;

    // 2. Validate input
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 3. Make request to Resend API using the environment variable
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${context.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: FROM_EMAIL_FULL,
        to: TO_EMAIL,
        reply_to: email,
        subject: `New Contact from ${name} via Resend.com`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        `
      })
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      console.error("Resend API Error:", resendData);
      return new Response(JSON.stringify({ error: "Failed to send email. Please try again." }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 4. Return success response
    return new Response(JSON.stringify({ success: true, id: resendData.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Contact Form Function Error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
