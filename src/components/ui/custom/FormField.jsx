/**
 * FormField component
 *
 * - label (required): title
 * - required (optional): if true, show '필수'
 * - isMultiple (optional): if true, show '(복수선택가능)' else '(단일선택)'
 * - children (required): form field component
 *
 * @param {string} label
 * @param {boolean} required
 * @param {React.ReactNode} children
 * @param {boolean} isMultiple
 * @returns
 */

export function FormField({ label, required, isMultiple, children }) {
  return (
    <section className='mb-8'>
      <div className='flex items-center mb-4'>
        <span className='text-xl lg:text-[1.4375rem] font-semibold text-[var(--text)]'>
          {label}
        </span>
        {typeof isMultiple === 'boolean' && (
          <span className='text-base lg:text-[1.06rem] text-[var(--placeholder-gray)] font-normal ml-[0.56rem]'>
            {isMultiple ? '(복수선택가능)' : '(단일선택)'}
          </span>
        )}
        {required && (
          <span className='text-base lg:text-[1.06rem] text-[var(--required-red)] font-normal ml-[0.56rem]'>
            필수
          </span>
        )}
      </div>
      {children}
    </section>
  );
}
