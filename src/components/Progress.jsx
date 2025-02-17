export default function Progress({ currentPage, TotalPages }) {
  return (
    <p className='text-xl font-semibold text-[var(--company-primary)]'>
      {currentPage}/{TotalPages}
    </p>
  );
}
