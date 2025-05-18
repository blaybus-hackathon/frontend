import PropTypes from 'prop-types';

/**
 * 범용 문자열 포맷팅 컴포넌트
 *
 * @param {string} text            original string to format
 * @param {number} threshold       if text.length >= threshold apply split
 * @param {number} splitIndex      index to insert line break
 * @param {string} className       additional common css
 * @param {string} longClass       css when text.length >= threshold
 * @param {string} shortClass      css when text.length < threshold
 * @param {(text: string) => React.ReactNode} formatter
 *                                  optional custom formatter function
 *                                  if provided, it overrides default formatting behavior
 */
export default function FormattedText({
  text,
  threshold,
  splitIndex,
  className = '',
  longClass,
  shortClass,
  formatter,
}) {
  if (typeof text !== 'string') {
    return <span className={className}>{text}</span>;
  }

  // if custom format exists, override
  if (typeof formatter === 'function') {
    return <span className={`pointer-events-none ${className} ${text.length >= threshold ? longClass : shortClass}`}>{formatter(text)}</span>;
  }
  
  const formatted = text.length >= threshold
    ? (
      <>
        {text.slice(0, splitIndex)}
        <br />
        {text.slice(splitIndex)}
      </>
    )
    : text;

  return (
    <span
    className={`pointer-events-none ${className} ${text.length>=threshold? longClass:shortClass}`}
  >
      {formatted}
    </span>
  );
}

FormattedText.propTypes = {
  text: PropTypes.string.isRequired,
  threshold: PropTypes.number,
  splitIndex: PropTypes.number,
  className: PropTypes.string,
  longClass: PropTypes.string,
  shortClass: PropTypes.string,
  formatter: PropTypes.func,
};
