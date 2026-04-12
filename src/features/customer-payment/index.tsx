import LeftForm from "./components/left-form";
import PaymentSummary from "./components/payment-summary";

export default function CustomerPaymentData() {
  return (
    <section className="w-full bg-slate-50 py-12 dark:bg-background md:py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Checkout Journey
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Finalize Your Service
          </h2>
          <p className="mt-3 text-muted-foreground">
            Complete your payment via bank transfer to confirm your expert
            technical concierge booking.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <LeftForm />
          <PaymentSummary />
        </div>
      </div>
    </section>
  );
}
