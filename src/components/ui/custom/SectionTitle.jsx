export const SectionTitle = ({ title, subtitle }) => {
  return (
    <section>
      <span className="text-[1.4375rem]">
        {title}
        <span className="ml-2 text-base text-[#6C6C6C]">{subtitle}</span>
      </span>
    </section>
  );
};
