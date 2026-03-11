import { Card } from "@/components/ui/card";
import {
  Mail,
  Instagram,
  Clock,
  Users,
  Globe,
  Phone,
  MessageCircle,
} from "lucide-react";

const Architects = () => {
  const spcontact = [
    {
      name: "Mr. Debayan Ghosh",
      phone: "+916291873010",
    },
    {
      name: "Mr. Indrajit Biswas",
      phone: "+918617204007",
    },
    {
      name: "Mr. Kevin Steve Domingo",
      phone: "+919088998444",
    },
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
      description:
        "Follow the Utopia channel on WhatsApp to be updated about all the latest news.",
      action: "https://whatsapp.com/channel/0029Vb1611T8fewpIkWGQs0Z",
    },
    {
      icon: Globe,
      label: "Institute Website",
      value: "www.mckvie.edu.in",
      description:
        "Visit our official institute website for more details about our college.",
      action: "https://www.mckvie.edu.in",
    },
  ];

  const faqs = [
    {
      question: "How can I register for MCKVIE Hackathon 2K25?",
      answer: "You can register through the official event portal.",
    },
    {
      question: "Can I participate across different departments and years?",
      answer: "Yes, participation across departments and years is allowed.",
    },
    {
      question: "Can I participate across different colleges?",
      answer: "Yes, participation from different colleges is permitted.",
    },
    {
      question: "What is the registration fee for the hackathon?",
      answer:
        "There is a registration fee. You can view the details on the registration page.",
    },
    {
      question: "What is the last day to register?",
      answer: "The last date for registration is October 9th, 2025.",
    },
    {
      question: "What should I bring to the hackathon?",
      answer:
        "Bring your laptop, charger, government-issued ID, and enthusiasm. We'll provide meals and snacks.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto py-16">
        <div className="text-center mb-16">
          <h1 className="text-[10vw] md:text-[4vw] font-serif font-black leading-tight tracking-[-0.04em]">
            Contact Us
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have questions about Utopia or the hackathon? Reach out to us
            through any of the channels below and our team will get back to you
            as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl md:text-2xl font-serif tracking-tight">
              Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <Card
                  key={index}
                  className="bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg cursor-pointer"
                  onClick={() =>
                    method.action.startsWith("http")
                      ? window.open(method.action, "_blank")
                      : (window.location.href = method.action)
                  }
                >
                  <div className="flex items-start space-x-4 p-5">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
                        <method.icon className="w-5 h-5 text-foreground" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-medium">{method.label}</h3>
                      {method.value && (
                        <p className="text-sm text-primary font-medium mt-1">
                          {method.value}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="col-span-1 md:col-span-2 space-y-4">
                <h2 className="text-xl md:text-2xl font-serif tracking-tight">
                  Our Location
                </h2>
                <Card className="bg-card border border-border overflow-hidden">
                  <div className="relative">
                    <iframe
                      title="MCKVIE Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1179.9289977725145!2d88.34797474294864!3d22.61976036850415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89d65da7b3775%3A0x30915f7e98f1b0d5!2sMCKV%20Institute%20of%20Engineering!5e0!3m2!1sen!2sin!4v1756609585992!5m2!1sen!2sin"
                      width="100%"
                      height="360"
                      className="border-0 w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    ></iframe>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-card border border-border p-6">
              <h3 className="text-lg md:text-xl font-serif mb-4">Call Us</h3>
              <div className="space-y-3">
                {spcontact.map((sp) => (
                  <div
                    key={sp.name}
                    className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-muted/60 transition-colors"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {sp.name}
                    </span>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() =>
                          window.open(`https://wa.me/${sp.phone}`, "_blank")
                        }
                        aria-label={`Chat with ${sp.phone} on WhatsApp`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <a
                        href={`tel:${sp.phone}`}
                        aria-label={`Call ${sp.name}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-card border border-border p-6 text-center space-y-4">
              <h3 className="text-lg md:text-xl font-serif">Quick Info</h3>
              <div className="space-y-4 text-sm text-foreground">
                <div className="flex items-center justify-center space-x-3">
                  <Clock className="w-4 h-4" />
                  <div className="text-left">
                    <p className="font-medium">Response Time</p>
                    <p className="text-muted-foreground text-xs">
                      Within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Users className="w-4 h-4" />
                  <div className="text-left">
                    <p className="font-medium">Support Available</p>
                    <p className="text-muted-foreground text-xs">
                      9 AM - 6 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-card border border-border p-6">
              <h3 className="text-lg md:text-xl font-serif mb-4">Quick FAQs</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architects;