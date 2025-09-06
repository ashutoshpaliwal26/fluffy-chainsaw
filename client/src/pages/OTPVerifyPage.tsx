import React, { useState, useRef, useEffect } from 'react';
import { Check, ArrowLeft, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '@/lib/apiClient';
import toast from 'react-hot-toast';

const OTPVerifyPage: React.FC = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const email = queryParams.get("email");
  const { userId } = useParams();
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) return;

    setIsLoading(true);

    try {
      const res = await apiClient.post(`/auth/verify/${userId}`, { otp: otpCode }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`
        }
      })
      if (res.status === 200) {
        setIsLoading(false);
        setIsVerified(true);
      }
    } catch (err) {
      toast.error("Server Error !!!");
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const isComplete = otp.every(digit => digit !== '');

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-md text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Verification Successful!</h1>
          <p className="text-gray-600 mb-6">Your phone number has been verified successfully.</p>
          <button onClick={() => navigate("/")} className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-violet-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <button onClick={() => navigate("/")} className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-3">Verify Your Email</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            We've sent a 6-digit verification code to<br />
            <span className="font-semibold text-gray-800">{email}</span>
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value.replace(/[^0-9]/g, ''))}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-200 hover:border-gray-300"
                autoComplete="off"
              />
            ))}
          </div>

          {<Button size="lg" onClick={handleVerify} disabled={!isComplete} loading={isLoading} className="group w-full">
            Verify
          </Button>}

          <div className="text-center text-sm">
            <p className="text-gray-600 mb-2">
              Didn't receive the code?
            </p>
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-violet-600 font-semibold hover:text-violet-700 transition-colors"
              >
                Resend Code
              </button>
            ) : (
              <p className="text-gray-500">
                Resend in <span className="font-semibold text-violet-600">{timeLeft}s</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerifyPage;