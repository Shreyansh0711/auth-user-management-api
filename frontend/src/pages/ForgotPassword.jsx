
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { authAPI } from "../api/auth";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await authAPI.forgotPassword(email.trim());

      setSuccessMessage(response.data.message);

      setEmail("");
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Unable to send password reset email right now. Please try again later.";

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 backdrop-blur-3xl bg-[#0f172a]/70 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-3xl">
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="h-12 w-12 rounded-2xl bg-red-600 flex items-center justify-center text-white mb-4">
              <Mail size={24} />
            </div>

            <h1 className="text-2xl font-bold mb-2">
              Forgot your password?
            </h1>

            <p className="text-textMuted">
              Enter your email address and we'll send you a password reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {successMessage && (
                <div className="mt-3 rounded-lg border border-green-500/30 bg-green-500/10 p-3">
                  <p className="text-sm text-green-400 leading-6">
                    {successMessage}
                  </p>
                </div>
              )}

              {errorMessage && (
                <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                  <p className="text-sm text-red-400 leading-6">
                    {errorMessage}
                  </p>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 border-none"
              isLoading={loading}
            >
              Send Reset Link
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-textMuted">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="text-white font-medium hover:text-red-400 transition-colors"
            >
              Back to sign in
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

