"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendInvitationRequest(formData: {
  fullName: string
  email: string
  gender: string
  country: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Gentlemen Roundtable <onboarding@resend.dev>",
      to: ["artheistlabs.osogbo@gmail.com"],
      subject: "New Invitation Request - Gentlemen Roundtable",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
            New Invitation Request
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Contact Details</h3>
            <p><strong>Full Name:</strong> ${formData.fullName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Gender:</strong> ${formData.gender}</p>
            <p><strong>Country:</strong> ${formData.country}</p>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            This request was submitted through the Gentlemen Roundtable landing page.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Email sending error:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, error: "Failed to send email" }
  }
}
