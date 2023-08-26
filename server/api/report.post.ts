import resend from "@/lib/resend";
import { useValidatedBody, z } from "h3-zod";

export default defineEventHandler(async (event) => {
  try {
    const { message, type, email } = await useValidatedBody(event, {
      message: z.string(),
      type: z.enum(["Bug", "Feature", "Other"]),
      email: z.string().email().optional(),
    });
    await resend.emails.send({
      from: "Feedful Report <hi@feedful.app>",
      to: ["hi@feedful.app"],
      subject: `Report: ${type}`,
      text: `Message: ${message}\nEmail: ${email}`,
      tags: [
        {
          name: "type",
          value: "feedful-report",
        },
      ],
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Report sent",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while processing the report.",
      }),
    };
  }
});
