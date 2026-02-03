import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  Sparkles, 
  Crown, 
  Star, 
  Calendar, 
  Clock, 
  Phone, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  MessageSquare,
  MapPin
} from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  {
    id: "quick",
    name: "Quick Bubble",
    price: 80,
    duration: "15 min",
    icon: Car,
    features: ["Exterior wash", "Quick dry"],
    color: "bg-blue-500",
  },
  {
    id: "full",
    name: "Full Service",
    price: 120,
    duration: "30 min",
    icon: Sparkles,
    features: ["Exterior wash", "Interior vacuum", "Dashboard wipe"],
    color: "bg-cyan-500",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Detail",
    price: 250,
    duration: "60 min",
    icon: Star,
    features: ["Full service", "Wax polish", "Tire shine", "Air freshener"],
    color: "bg-purple-500",
  },
  {
    id: "royal",
    name: "Royal Treatment",
    price: 450,
    duration: "90 min",
    icon: Crown,
    features: ["Premium detail", "Engine bay clean", "Leather conditioning", "Ceramic coating"],
    color: "bg-amber-500",
  },
];

const timeSlots = [
  { id: "morning", label: "Morning", time: "9:00 AM - 11:00 AM", icon: "🌅" },
  { id: "midday", label: "Midday", time: "11:00 AM - 1:00 PM", icon: "☀️" },
  { id: "afternoon", label: "Afternoon", time: "1:00 PM - 3:00 PM", icon: "🌤️" },
  { id: "late", label: "Late Afternoon", time: "3:00 PM - 5:00 PM", icon: "🌇" },
];

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [carReg, setCarReg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const service = services.find(s => s.id === selectedService);
  const timeSlot = timeSlots.find(t => t.id === selectedTime);

  const generateBookingRef = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let ref = "MB-";
    for (let i = 0; i < 6; i++) {
      ref += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return ref;
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-ZA', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const ref = generateBookingRef();
    setBookingRef(ref);
    setIsSubmitting(false);
    setStep(4);
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate("");
    setSelectedTime(null);
    setName("");
    setPhone("");
    setCarReg("");
    setBookingRef("");
    onClose();
  };

  const canProceedStep1 = selectedService !== null;
  const canProceedStep2 = selectedDate !== "" && selectedTime !== null;
  const canProceedStep3 = name.trim() !== "" && phone.trim().length >= 10 && carReg.trim() !== "";

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Book Your Car Wash
          </DialogTitle>
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    step >= s 
                      ? "bg-primary text-white" 
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {s < 4 && (
                  <div className={`w-12 h-1 mx-1 rounded ${step > s ? "bg-primary" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Service</span>
            <span>Date & Time</span>
            <span>Details</span>
            <span>Confirm</span>
          </div>
        </DialogHeader>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="font-semibold text-lg">Choose Your Service</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((svc) => (
                    <Card
                      key={svc.id}
                      className={`p-4 cursor-pointer transition-all hover-elevate ${
                        selectedService === svc.id 
                          ? "ring-2 ring-primary bg-primary/5" 
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedService(svc.id)}
                      data-testid={`service-${svc.id}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className={`p-2 rounded-lg ${svc.color} text-white`}>
                          <svc.icon className="w-5 h-5" />
                        </div>
                        {svc.popular && (
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        )}
                      </div>
                      <h4 className="font-bold text-base">{svc.name}</h4>
                      <p className="text-2xl font-bold text-primary mt-1">R{svc.price}</p>
                      <p className="text-xs text-muted-foreground mb-2">{svc.duration}</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {svc.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={() => setStep(2)} 
                    disabled={!canProceedStep1}
                    className="gap-2"
                    data-testid="button-next-step1"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    Select Date
                  </h3>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={getMinDate()}
                    max={getMaxDate()}
                    className="max-w-xs"
                    data-testid="input-date"
                  />
                  {selectedDate && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {formatDate(selectedDate)}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-primary" />
                    Select Time Window
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <Card
                        key={slot.id}
                        className={`p-4 cursor-pointer transition-all hover-elevate ${
                          selectedTime === slot.id 
                            ? "ring-2 ring-primary bg-primary/5" 
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedTime(slot.id)}
                        data-testid={`time-${slot.id}`}
                      >
                        <div className="text-2xl mb-1">{slot.icon}</div>
                        <h4 className="font-semibold">{slot.label}</h4>
                        <p className="text-sm text-muted-foreground">{slot.time}</p>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)} 
                    disabled={!canProceedStep2}
                    className="gap-2"
                    data-testid="button-next-step2"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="font-semibold text-lg">Your Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4" /> Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      data-testid="input-name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4" /> Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="082 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      data-testid="input-phone"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      SMS confirmation will be sent to this number
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="carReg" className="flex items-center gap-2 mb-2">
                      <Car className="w-4 h-4" /> Vehicle Registration
                    </Label>
                    <Input
                      id="carReg"
                      placeholder="ABC 123 GP"
                      value={carReg}
                      onChange={(e) => setCarReg(e.target.value.toUpperCase())}
                      className="uppercase"
                      data-testid="input-car-reg"
                    />
                  </div>
                </div>

                <Card className="p-4 bg-muted/50">
                  <h4 className="font-semibold mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service:</span>
                      <span className="font-medium">{service?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">{selectedDate ? formatDate(selectedDate) : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">{timeSlot?.time}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-primary text-lg">R{service?.price}</span>
                    </div>
                  </div>
                </Card>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!canProceedStep3 || isSubmitting}
                    className="gap-2"
                    data-testid="button-confirm"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-4 h-4" />
                        </motion.div>
                        Processing...
                      </>
                    ) : (
                      <>Confirm Booking <CheckCircle2 className="w-4 h-4" /></>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h3>
                <p className="text-muted-foreground mb-6">
                  Your car wash has been scheduled successfully
                </p>

                <Card className="p-6 bg-primary/5 border-primary/20 text-left mb-6">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground">Booking Reference</p>
                    <p className="text-3xl font-bold text-primary tracking-wider">{bookingRef}</p>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">{service?.name}</p>
                        <p className="text-muted-foreground">R{service?.price} - {service?.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">{selectedDate ? formatDate(selectedDate) : ''}</p>
                        <p className="text-muted-foreground">{timeSlot?.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Boksburg Center</p>
                        <p className="text-muted-foreground">Gauteng, South Africa</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Car className="w-5 h-5 text-primary" />
                      <p className="font-medium">{carReg}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-blue-50 border-blue-200 mb-6">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-left">
                      <p className="font-medium text-blue-900">SMS Confirmation Sent</p>
                      <p className="text-sm text-blue-700">
                        A confirmation SMS has been sent to {phone}. You'll receive a reminder 1 hour before your appointment.
                      </p>
                    </div>
                  </div>
                </Card>

                <p className="text-sm text-muted-foreground mb-4">
                  Payment will be collected at the venue after service completion
                </p>

                <Button onClick={resetAndClose} className="w-full" data-testid="button-done">
                  Done
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
