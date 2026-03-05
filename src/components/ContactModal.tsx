import React from "react";
import "./ContactModal.css";
import ReactDOM from "react-dom";
import careerApi from "@/api/careerApi";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ContactModal = ({ open, onClose }: Props) => {
  if (!open) return null;

  const [status, setStatus] = React.useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      setLoading(true);
      const res = await careerApi.sendContact(payload as any);
      setStatus({ type: "success", message: res.message || "Message sent!" });
      setTimeout(onClose, 1500);
    } catch (err: any) {
      setStatus({ type: "error", message: err.message || "Failed to send" });
    } finally {
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
     <div className="contact-modal fixed inset-0 z-[9999] flex items-center justify-center">
    <div className="contact-backdrop absolute inset-0" onClick={onClose} />

    <div className="form-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Contact Us</h3>
          <button
            aria-label="Close"
            onClick={onClose}
            style={{ background: "transparent", border: "none", color: "#bbb", cursor: "pointer", fontSize: 18 }}
          >
            ×
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" placeholder="Your name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="How can we help?" />
          </div>

          <button type="submit" className="form-submit-btn" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
          {status && (
            <div className={`mt-4 text-sm ${status.type === "success" ? "text-green-400" : "text-red-400"}`}>{status.message}</div>
          )}
        </form>
      </div>
    </div>
    , document.body
  );
};

export default ContactModal;
