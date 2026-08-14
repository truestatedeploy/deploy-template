import { useState, useEffect, useRef } from "react";
import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Xmark } from "iconoir-react";

const API_BASE = "https://canvas-homes-campaign-service-test-dot-canvas-homes-497109.el.r.appspot.com";

const OtpModal = ({ phoneNumber, enquiryId, enquiryCollection, onVerified, onSkip }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(true);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    sendOtp();
    return () => clearRecaptcha();
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setResendTimer((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const clearRecaptcha = () => {
    if (window.recaptchaVerifier) {
      try { window.recaptchaVerifier.clear(); } catch (_) {}
      window.recaptchaVerifier = null;
    }
  };

  const sendOtp = async () => {
    setSending(true);
    setError("");
    try {
      clearRecaptcha();
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      const result = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(result);
    } catch (err) {
      console.error("OTP send error:", err);
      setError("Failed to send OTP. Please check the phone number or try again.");
    } finally {
      setSending(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setCanResend(false);
    setResendTimer(30);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    await sendOtp();
  };

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    digits.split("").forEach((d, i) => { next[i] = d; });
    setOtp(next);
    const lastFilled = Math.min(digits.length, 5);
    inputRefs.current[lastFilled]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter the full 6-digit OTP.");
      return;
    }
    if (!confirmationResult) {
      setError("OTP session expired. Please resend.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await confirmationResult.confirm(code);

      const res = await fetch(`${API_BASE}/update-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enquiryId, enquiryCollection }),
      });

      if (!res.ok) throw new Error("Verification update failed");

      clearRecaptcha();
      onVerified();
    } catch (err) {
      console.error("OTP verify error:", err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const maskedPhone = phoneNumber
    ? phoneNumber.slice(0, -4).replace(/\d/g, "*") + phoneNumber.slice(-4)
    : "";

  return (
    <div>
      <div id="recaptcha-container" style={{ position: "fixed", top: "-9999px", left: "-9999px" }}></div>

      <div className="fixed inset-0 bg-black opacity-80 z-50" />

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-sm p-8 shadow-2xl relative">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
            onClick={onSkip}
          >
            <Xmark />
          </button>

          <h2 className="text-2xl font-semibold text-center mb-1">Verify Your Number</h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            {sending
              ? "Sending OTP…"
              : `OTP sent to ${maskedPhone}`}
          </p>

          <div className="flex justify-center gap-2 mb-4" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                disabled={sending || loading}
                className={`w-10 h-12 text-center text-xl border-2 focus:outline-none transition-colors ${
                  digit ? "border-primary" : "border-gray-300"
                } ${sending ? "bg-gray-100" : "bg-white"}`}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-3">{error}</p>
          )}

          <button
            onClick={handleVerify}
            disabled={loading || sending || otp.join("").length !== 6}
            className={`w-full p-3 text-white font-medium rounded-lg transition-colors ${
              loading || sending || otp.join("").length !== 6
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primaryDark"
            }`}
          >
            {loading ? "Verifying…" : "Verify OTP"}
          </button>

          <div className="mt-4 text-center text-sm text-gray-500">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-primary underline font-medium"
              >
                Resend OTP
              </button>
            ) : (
              <span>Resend OTP in {resendTimer}s</span>
            )}
          </div>

          <div className="mt-3 text-center">
            <button
              onClick={onSkip}
              className="text-xs text-gray-400 underline hover:text-gray-600"
            >
              Skip verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
