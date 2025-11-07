export default function Section({ title, children, right }) {
  return (
    <section className="py-6 md:py-8">
      <div className="mb-3 flex items-end justify-between gap-3 md:mb-4">
        <h2 className="text-lg font-semibold tracking-tight md:text-2xl">
          {title}
        </h2>
        {right}
      </div>
      {children}
    </section>
  );
}
