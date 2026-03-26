import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
const contact = "/assets/contactus.webp";

import {
  Mail,
  Instagram,
  Clock,
  Users,
  Globe,
  Phone,
  MessageCircle,
  Smartphone,
  User,
} from "lucide-react";

const Contact = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const spcontact = [
    { name: "Mr. Pranjal Basu", phone: "+919330549983" },
    { name: "Mr. Atig Chandra", phone: "+919330301807" },
  ];

  const contactMethods = [
    {
      icon: Mail,
      label: "Email Us",
      value: "utopiaculturalfestmckvie@gmail.com",
      description: "Click to email us directly",
      action: "mailto:utopiaculturalfestmckvie@gmail.com",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@utopia.mckvie",
      description: "Follow us for the latest updates",
      action:
        "https://www.instagram.com/utopia.mckvie?igsh=MTExNWdhdWY3ZzExMg==",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp Channel",
      value: "Official Utopia WhatsApp",
      description: "Follow the Utopia channel for news.",
      action: "https://whatsapp.com/channel/0029Vb1611T8fewpIkWGQs0Z",
    },
    {
      icon: Globe,
      label: "Institute Website",
      value: "www.mckvie.edu.in",
      description: "Visit our official institute website.",
      action: "https://www.mckvie.edu.in",
    },
  ];

  return (
    <>
      <style>
        {`
          @keyframes ring-shake {
            0%, 100% { transform: rotate(0deg); }
            10%, 30%, 50%, 70%, 90% { transform: rotate(-12deg); }
            20%, 40%, 60%, 80% { transform: rotate(12deg); }
          }
          .animate-ringing {
            animation: ring-shake 2s ease-in-out infinite;
          }
          @keyframes wave-ripple {
            0% { transform: scale(0.8); opacity: 1; }
            100% { transform: scale(2.5); opacity: 0; }
          }
          .animate-wave-1 {
            animation: wave-ripple 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          .animate-wave-2 {
            animation: wave-ripple 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            animation-delay: 1s;
          }
        `}
      </style>

      {/* Intro Splash Screen Overlay */}
      <div
        className={`fixed inset-0 z-40 pt-24 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-in-out ${
          showIntro ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative flex items-center justify-center w-64 h-64 mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-wave-1"></div>
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-wave-2"></div>
          <div className="relative z-10 bg-background rounded-full p-6 shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-border">
            <Smartphone
              className="w-24 h-24 text-primary animate-ringing drop-shadow-lg"
              strokeWidth={1.5}
            />
          </div>
        </div>
        <p className="text-primary font-bold text-xl md:text-2xl animate-pulse tracking-wide">
          Connecting to Utopia...
        </p>
      </div>

      {/* Main Page */}
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* HERO IMAGE */}
        <div className="w-full pt-32 pb-10 px-4 sm:px-10 lg:px-20 text-center">
          <img
            src={contact}
            alt="Contact Us"
            className="w-full max-w-6xl mx-auto object-contain drop-shadow-xl"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-5">
          {/* Subtitle - Updated to match Gallery page bold styling */}
          <div className="text-center mb-16">
            <p className="mt-3 md:mt-6 max-w-4xl text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-bold leading-relaxed mx-auto">
              Have questions about Utopia? Reach out to us through any of the
              channels below and our team will get back to you as soon as
              possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT SECTION */}
            <div className="lg:col-span-2 space-y-12">
              {/* Contact Methods */}
              <section>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contactMethods.map((method, index) => (
                    <Card
                      key={index}
                      className="p-6 border border-border bg-card rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-md cursor-pointer flex items-start gap-4"
                      onClick={() =>
                        method.action.startsWith("http")
                          ? window.open(method.action, "_blank")
                          : (window.location.href = method.action)
                      }
                    >
                      <div className="w-10 h-10 shrink-0 rounded-full border border-border bg-background flex items-center justify-center">
                        <method.icon className="w-5 h-5 text-foreground" />
                      </div>

                      <div>
                        <h3 className="text-base font-semibold text-foreground">
                          {method.label}
                        </h3>
                        <p className="text-sm font-medium text-primary mt-1">
                          {method.value}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {method.description}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              {/* LOCATION MAP */}
              <section>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6">
                  Our Location
                </h2>
                <Card className="overflow-hidden border border-border shadow-sm rounded-xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.553086135261!2d88.3482356!3d22.619495000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89d65da7b3775%3A0x30915f7e98f1b0d5!2sMCKV%20Institute%20of%20Engineering!5e1!3m2!1sen!2sin!4v1773599411319!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MCKVIE Location Map"
                  ></iframe>
                </Card>
              </section>
            </div>

            {/* RIGHT SECTION */}
            <div className="space-y-8">
              {/* Direct Contact */}
              <section>
                <h2 className="text-xl font-bold tracking-tight mb-6">
                  Direct Contact
                </h2>
                <Card className="p-6 border border-border shadow-sm rounded-xl space-y-2">
                  {spcontact.map((sp) => (
                    <div
                      key={sp.phone}
                      className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg border border-transparent hover:border-border transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {sp.name}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3 text-muted-foreground">
                        <button
                          onClick={() =>
                            window.open(
                              `https://wa.me/${sp.phone.replace("+", "")}`,
                              "_blank"
                            )
                          }
                          className="hover:text-primary transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <a
                          href={`tel:${sp.phone}`}
                          className="hover:text-primary transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </Card>
              </section>

              {/* Availability */}
              <section>
                <h2 className="text-xl font-bold tracking-tight mb-6">
                  Availability
                </h2>
                <Card className="p-6 border border-border shadow-sm rounded-xl space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full border border-border bg-background flex items-center justify-center">
                      <Clock className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        Response Time
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full border border-border bg-background flex items-center justify-center">
                      <Users className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        Support Hours
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        9 AM - 6 PM IST
                      </p>
                    </div>
                  </div>
                </Card>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;