import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_KEY);
export default resend;
